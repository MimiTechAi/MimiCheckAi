-- ============================================
-- RBAC (Role-Based Access Control) SCHEMA
-- ============================================
-- Datum: 2024
-- Version: 1.0
-- Beschreibung: Role-based access control for enterprise security
-- ============================================

-- Create roles table
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL CHECK (length(name) > 0),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL CHECK (length(name) > 0),
  description TEXT,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);

-- Create user_roles table (replaces simple role column)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Create a helper function to check if user has permission
CREATE OR REPLACE FUNCTION public.has_permission(
  user_id UUID,
  required_resource TEXT,
  required_action TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = user_id
      AND p.resource = required_resource
      AND p.action = required_action
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Create a helper function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(user_id UUID)
RETURNS TABLE(role_id UUID, role_name TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.role_id, r.name
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = user_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- Insert default roles
INSERT INTO public.roles (name, description) VALUES
  ('admin', 'Administrator with full access'),
  ('moderator', 'Moderator with moderate access'),
  ('user', 'Regular user with limited access'),
  ('viewer', 'Read-only access')
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO public.permissions (name, description, resource, action) VALUES
  ('view_users', 'View user information', 'users', 'read'),
  ('manage_users', 'Create, update, delete users', 'users', 'write'),
  ('view_abrechnungen', 'View abrechnungen', 'abrechnungen', 'read'),
  ('manage_abrechnungen', 'Create, update, delete abrechnungen', 'abrechnungen', 'write'),
  ('view_audit_logs', 'View audit logs', 'audit_logs', 'read'),
  ('access_admin_dashboard', 'Access admin dashboard', 'admin', 'read'),
  ('manage_roles', 'Create, update, delete roles and permissions', 'roles', 'write'),
  ('manage_settings', 'Manage application settings', 'settings', 'write'),
  ('access_security_dashboard', 'Access security dashboards', 'security', 'read'),
  ('rotate_secrets', 'Rotate application secrets', 'secrets', 'write')
ON CONFLICT (name) DO NOTHING;

-- Assign default permissions to roles
DO $$
DECLARE
  admin_role_id UUID;
  user_role_id UUID;
  viewer_role_id UUID;
BEGIN
  -- Get role IDs
  SELECT id INTO admin_role_id FROM public.roles WHERE name = 'admin';
  SELECT id INTO user_role_id FROM public.roles WHERE name = 'user';
  SELECT id INTO viewer_role_id FROM public.roles WHERE name = 'viewer';

  -- Admin gets all permissions
  INSERT INTO public.role_permissions (role_id, permission_id)
  SELECT admin_role_id, id FROM public.permissions
  ON CONFLICT DO NOTHING;

  -- User gets basic read access
  INSERT INTO public.role_permissions (role_id, permission_id)
  SELECT user_role_id, id FROM public.permissions
  WHERE name IN ('view_users', 'view_abrechnungen')
  ON CONFLICT DO NOTHING;

  -- Viewer gets read-only access
  INSERT INTO public.role_permissions (role_id, permission_id)
  SELECT viewer_role_id, id FROM public.permissions
  WHERE name IN ('view_users', 'view_abrechnungen', 'view_audit_logs')
  ON CONFLICT DO NOTHING;
END $$;

-- Enable RLS on RBAC tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roles
CREATE POLICY "admins_can_view_all_roles"
  ON public.roles FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

CREATE POLICY "admins_can_manage_roles"
  ON public.roles FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

-- RLS Policies for permissions
CREATE POLICY "admins_can_view_all_permissions"
  ON public.permissions FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

-- RLS Policies for role_permissions
CREATE POLICY "admins_can_view_all_role_permissions"
  ON public.role_permissions FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

-- RLS Policies for user_roles
CREATE POLICY "users_can_view_own_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "admins_can_view_all_user_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

CREATE POLICY "admins_can_manage_user_roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT ur.user_id FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE r.name = 'admin'
  ));

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON public.role_permissions(permission_id);
