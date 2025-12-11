-- ============================================
-- AUDIT LOGGING SCHEMA
-- ============================================
-- Datum: 2024
-- Version: 1.0
-- Beschreibung: Comprehensive audit logging for compliance and security
-- ============================================

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  actor_role TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  changes JSONB,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failure')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for audit logs for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON public.audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_id ON public.audit_logs(resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_status ON public.audit_logs(status);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only admins and viewers can read audit logs
CREATE POLICY "admins_can_view_all_audit_logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (
    public.has_permission(auth.uid(), 'audit_logs', 'read')
  );

-- Function to log audit events (called from edge functions or server)
CREATE OR REPLACE FUNCTION public.audit_log(
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID DEFAULT NULL,
  p_changes JSONB DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_status TEXT DEFAULT 'success'
) RETURNS UUID AS $$
DECLARE
  v_actor_role TEXT;
  v_log_id UUID;
BEGIN
  -- Get user's role
  SELECT array_to_string(array_agg(r.name), ',') INTO v_actor_role
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = p_user_id;

  -- Insert audit log
  INSERT INTO public.audit_logs (
    user_id,
    actor_role,
    action,
    resource_type,
    resource_id,
    changes,
    metadata,
    ip_address,
    user_agent,
    status
  ) VALUES (
    p_user_id,
    v_actor_role,
    p_action,
    p_resource_type,
    p_resource_id,
    p_changes,
    p_metadata,
    p_ip_address,
    p_user_agent,
    p_status
  ) RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- Function to log failed audit events
CREATE OR REPLACE FUNCTION public.audit_log_error(
  p_user_id UUID,
  p_action TEXT,
  p_resource_type TEXT,
  p_error_message TEXT,
  p_metadata JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
BEGIN
  RETURN public.audit_log(
    p_user_id,
    p_action,
    p_resource_type,
    NULL,
    NULL,
    p_metadata,
    p_ip_address,
    p_user_agent,
    'failure'
  );
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically log user creation
CREATE OR REPLACE FUNCTION public.log_user_creation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.audit_log(
    NEW.id,
    'user_created',
    'users',
    NEW.id,
    to_jsonb(NEW),
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_creation_audit
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.log_user_creation();

-- Trigger to automatically log user updates
CREATE OR REPLACE FUNCTION public.log_user_update()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.audit_log(
    NEW.id,
    'user_updated',
    'users',
    NEW.id,
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW)),
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_update_audit
AFTER UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.log_user_update();

-- Trigger to automatically log role assignment
CREATE OR REPLACE FUNCTION public.log_role_assignment()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
BEGIN
  SELECT email INTO v_username FROM public.users WHERE id = NEW.user_id;
  
  PERFORM public.audit_log(
    NEW.user_id,
    'role_assigned',
    'user_roles',
    NEW.id,
    jsonb_build_object('user_id', NEW.user_id, 'role_id', NEW.role_id),
    jsonb_build_object('username', v_username)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER role_assignment_audit
AFTER INSERT ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.log_role_assignment();

-- Trigger to automatically log role removal
CREATE OR REPLACE FUNCTION public.log_role_removal()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
BEGIN
  SELECT email INTO v_username FROM public.users WHERE id = OLD.user_id;
  
  PERFORM public.audit_log(
    OLD.user_id,
    'role_removed',
    'user_roles',
    OLD.id,
    jsonb_build_object('user_id', OLD.user_id, 'role_id', OLD.role_id),
    jsonb_build_object('username', v_username)
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER role_removal_audit
AFTER DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.log_role_removal();

-- Grant permissions to authenticated users for audit_log function
GRANT EXECUTE ON FUNCTION public.audit_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_log_error TO authenticated;
