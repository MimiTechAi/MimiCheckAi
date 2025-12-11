# Security Hardening Suite Implementation Guide

**Date:** 2024  
**Version:** 1.0  
**Owner:** Security Team

## Overview

This document describes the complete enterprise-grade security hardening suite implemented for MimiCheck, including:

1. **Content Security Policy (CSP)** - Strict nonce-based CSP without unsafe-inline
2. **Role-Based Access Control (RBAC)** - Fine-grained permission system
3. **Audit Logging** - Comprehensive audit trail for all sensitive operations
4. **Secret Management** - Encrypted secret rotation with age encryption
5. **Vulnerability Scanning** - Multi-layer security scanning in CI/CD
6. **Security Documentation** - Runbooks and incident response procedures

---

## 1. Content Security Policy (CSP)

### Implementation Details

**Vite Plugin:** `src/lib/csp-nonce-plugin.js`
- Generates random 128-bit nonce at build time
- Injects nonce into all `<script>` and `<style>` tags
- Exposes nonce via `window.__CSP_NONCE__`
- Writes nonce to `.csp-nonce` file for deployment platforms

**Deployment Headers:**
- `vercel.json` - Main app on Vercel
- `netlify.toml` - Main app fallback on Netlify  
- `mimicheck-landing/vercel.json` - Landing page on Vercel

### CSP Policy

```
default-src 'self'
script-src 'self' https://js.stripe.com https://cdn.anthropic.com
style-src 'self' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: https: blob:
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://api.anthropic.com https://api.openai.com
frame-src https://js.stripe.com https://hooks.stripe.com
frame-ancestors 'none'
upgrade-insecure-requests
object-src 'none'
base-uri 'none'
```

### Verification

```bash
# Check CSP headers locally
curl -I http://localhost:8005 | grep Content-Security-Policy

# Check production deployment
curl -I https://mimicheck.ai | grep Content-Security-Policy

# Verify nonce is injected
curl http://localhost:8005 | grep "__CSP_NONCE__"
```

### Nonce Usage in Application

In React components, access the nonce:

```javascript
const nonce = window.__CSP_NONCE__;

// Use in inline script
<script nonce={nonce}>
  // Inline JavaScript
</script>

// Use in style tag
<style nonce={nonce}>
  /* Inline CSS */
</style>
```

---

## 2. Role-Based Access Control (RBAC)

### Database Schema

**Location:** `supabase/migrations/006_rbac.sql`

#### Tables

**roles**
```sql
id: UUID PRIMARY KEY
name: TEXT UNIQUE (admin, moderator, user, viewer)
description: TEXT
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**permissions**
```sql
id: UUID PRIMARY KEY
name: TEXT UNIQUE
description: TEXT
resource: TEXT (users, abrechnungen, audit_logs, etc.)
action: TEXT (read, write, delete, etc.)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

**role_permissions**
```sql
id: UUID PRIMARY KEY
role_id: UUID (FK to roles)
permission_id: UUID (FK to permissions)
created_at: TIMESTAMP
UNIQUE(role_id, permission_id)
```

**user_roles**
```sql
id: UUID PRIMARY KEY
user_id: UUID (FK to users)
role_id: UUID (FK to roles)
assigned_at: TIMESTAMP
UNIQUE(user_id, role_id)
```

#### Helper Functions

**has_permission(user_id UUID, required_resource TEXT, required_action TEXT) -> BOOLEAN**
```sql
-- Check if user has permission for a resource action
SELECT public.has_permission(auth.uid(), 'admin', 'read');
```

**get_user_roles(user_id UUID) -> TABLE**
```sql
-- Get all roles for a user
SELECT * FROM public.get_user_roles(auth.uid());
```

### Frontend Integration

**UserProfileContext Extensions**

```javascript
const { user, userRoles, hasPermission, hasRole } = useUserProfile();

// Check if user is admin
if (user.hasRole('admin')) {
  // Show admin features
}

// Check specific permission
if (hasPermission('audit_logs', 'read')) {
  // Show audit logs
}
```

**useAuthorization Hook**

```javascript
import { useAuthorization } from '@/hooks/useAuthorization';

function AdminPanel() {
  const {
    isAdmin,
    canAccessSecurityDashboard,
    canManageUsers,
    canViewAuditLogs
  } = useAuthorization();

  if (!isAdmin()) return <AccessDenied />;

  return <SecurityDashboard />;
}
```

**Protected Routes**

```javascript
import { AdminOnlyRoute, ProtectedRoute } from '@/components/ProtectedRoute';

// Admin-only route
<AdminOnlyRoute fallback="/dashboard">
  <SecurityDashboard />
</AdminOnlyRoute>

// Custom permission check
<ProtectedRoute 
  requiredPermission={() => canManageUsers()}
  fallback="/dashboard"
>
  <UserManagement />
</ProtectedRoute>

// Conditional rendering
<ConditionalRender
  check={() => canViewAuditLogs()}
  fallback={<p>Unauthorized</p>}
>
  <AuditLogViewer />
</ConditionalRender>
```

### Default Roles & Permissions

**Admin Role**
- All permissions granted
- Can manage users, roles, settings, secrets
- Full audit log access
- Security dashboard access

**Moderator Role**
- View users
- View abrechnungen
- View audit logs
- Moderate content

**User Role**
- View own users
- View own abrechnungen

**Viewer Role**
- Read-only audit logs
- Read-only user info
- Read-only abrechnungen

### Database-Level RLS

All RBAC tables have Row-Level Security policies:
- Users can only view their own roles
- Admins can manage all roles and permissions
- Audit logs only visible to admins and viewers

---

## 3. Audit Logging

### Database Schema

**Location:** `supabase/migrations/007_audit_logs.sql`

#### audit_logs Table

```sql
id: UUID PRIMARY KEY
user_id: UUID (FK to users, nullable)
actor_role: TEXT (stored role at time of action)
action: TEXT (user_created, role_assigned, document_uploaded, etc.)
resource_type: TEXT (users, abrechnungen, audit_logs, etc.)
resource_id: UUID (ID of affected resource, nullable)
changes: JSONB (old/new values for updates)
metadata: JSONB (additional context)
ip_address: INET (client IP)
user_agent: TEXT (browser info)
status: TEXT (success, failure)
error_message: TEXT (for failures)
created_at: TIMESTAMP
```

#### Indexes

For optimal query performance:
- `idx_audit_logs_user_id`
- `idx_audit_logs_resource_type`
- `idx_audit_logs_resource_id`
- `idx_audit_logs_action`
- `idx_audit_logs_created_at`
- `idx_audit_logs_status`

### Automatic Logging via Triggers

**User Operations**
```sql
-- Automatically logged on INSERT/UPDATE/DELETE
CREATE TRIGGER user_creation_audit AFTER INSERT ON public.users
CREATE TRIGGER user_update_audit AFTER UPDATE ON public.users
```

**Role Assignments**
```sql
-- Automatically logged on role assignment
CREATE TRIGGER role_assignment_audit AFTER INSERT ON public.user_roles
CREATE TRIGGER role_removal_audit AFTER DELETE ON public.user_roles
```

### Edge Function: audit-log

**Location:** `supabase/functions/audit-log/index.ts`

HTTP API for logging structured events:

**Request:**
```json
POST /functions/v1/audit-log

{
  "user_id": "uuid",
  "action": "document_uploaded",
  "resource_type": "abrechnungen",
  "resource_id": "uuid",
  "changes": {
    "filename": "nebenkostenabrechnung.pdf",
    "file_size": 1024000
  },
  "metadata": {
    "upload_method": "drag_and_drop",
    "file_type": "application/pdf"
  },
  "user_agent": "Mozilla/5.0...",
  "status": "success"
}
```

**Response:**
```json
{
  "success": true,
  "log_id": "uuid"
}
```

**Error Response:**
```json
{
  "error": "Missing required fields: user_id, action, resource_type",
  "details": "..."
}
```

### Querying Audit Logs

**View recent user activity:**
```sql
SELECT created_at, action, resource_type, status
FROM audit_logs
WHERE user_id = '<user_id>'
AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

**Find failed actions:**
```sql
SELECT created_at, action, error_message, user_id
FROM audit_logs
WHERE status = 'failure'
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

**Track role changes:**
```sql
SELECT created_at, user_id, action, metadata
FROM audit_logs
WHERE action LIKE 'role_%'
AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

**Find suspicious activity:**
```sql
SELECT created_at, action, resource_type, user_id, ip_address
FROM audit_logs
WHERE status = 'failure'
AND action LIKE '%unauthorized%'
AND created_at > NOW() - INTERVAL '24 hours';
```

---

## 4. Secret Management

### Overview

Secrets are encrypted using age (encryption algorithm) and managed through a TypeScript CLI.

### Configuration

**Location:** `scripts/secrets/secrets-config.ts`

**Supported Targets:**
- **SUPABASE**: Edge function secrets → `supabase/.encrypted-secrets.json.age`
- **VERCEL**: Environment variables → `.env.encrypted.age`
- **EDGE_FUNCTIONS**: Edge function env → `supabase/functions/.env.encrypted.age`

**Schema Validation:**

All secrets are validated against zod schemas:
```typescript
SupabaseSecretsSchema: {
  SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_JWT_SECRET, SUPABASE_STRIPE_WEBHOOK_SECRET
}

VercelSecretsSchema: {
  VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY,
  VITE_STRIPE_PUBLIC_KEY, VITE_ANTHROPIC_API_KEY
}

EdgeFunctionSecretsSchema: {
  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
  ANTHROPIC_API_KEY, STRIPE_SECRET_KEY, OPENAI_API_KEY
}
```

### CLI Commands

**Encrypt secrets:**
```bash
npm run secrets:encrypt -- --target supabase --file .env.supabase
npm run secrets:encrypt -- --target vercel --file .env.vercel
npm run secrets:encrypt -- --target edge_functions --file supabase/functions/.env
```

**Decrypt secrets:**
```bash
npm run secrets:decrypt -- --target supabase
npm run secrets:decrypt -- --target vercel

# Output: JSON printed to stdout
# Example: { "SUPABASE_URL": "...", ... }
```

**Sync to platform:**
```bash
# Decrypt and push to Supabase
npm run secrets:sync -- --target supabase

# Decrypt and push to Vercel
npm run secrets:sync -- --target vercel

# Decrypt and push to edge functions
npm run secrets:sync -- --target edge_functions
```

**Rotate all secrets:**
```bash
# Requires AGE_KEY environment variable and proper CI/CD setup
npm run secrets:rotate
```

### Setting Up Encryption

**Step 1: Generate age key (one-time)**
```bash
# Install age: https://github.com/FiloSottile/age
age-keygen -o ~/key.txt
cat ~/key.txt
```

**Step 2: Set AGE_KEY environment variable**
```bash
# Local development
export AGE_KEY=$(cat ~/.config/age/key.txt)

# GitHub Actions - Add to repository secrets
# GitHub Settings → Secrets and variables → Actions → New repository secret
# Name: AGE_KEY
# Value: (paste private key from age-keygen)
```

**Step 3: Encrypt secrets**
```bash
# Create unencrypted secrets file
echo '{
  "SUPABASE_URL": "...",
  "SUPABASE_ANON_KEY": "...",
  ...
}' > .env.supabase.json

# Encrypt it
AGE_KEY=$(cat ~/.config/age/key.txt) npm run secrets:encrypt -- --target supabase --file .env.supabase.json

# Verify encryption
cat supabase/.encrypted-secrets.json.age
# Should see binary/encrypted data
```

**Step 4: Store encrypted file in git**
```bash
git add supabase/.encrypted-secrets.json.age
git commit -m "chore: add encrypted supabase secrets"
git push
```

### Secret Rotation Procedure

**Manual rotation (recommended for initial setup):**
```bash
# 1. Update secrets locally
# Edit .env.supabase.json with new values

# 2. Re-encrypt
AGE_KEY=$(cat ~/.config/age/key.txt) npm run secrets:encrypt -- --target supabase --file .env.supabase.json

# 3. Verify
npm run secrets:decrypt -- --target supabase | jq '.'

# 4. Sync to platform
AGE_KEY=$(cat ~/.config/age/key.txt) npm run secrets:sync -- --target supabase

# 5. Commit changes
git add supabase/.encrypted-secrets.json.age
git commit -m "chore: rotate supabase secrets"
git push
```

**Automated rotation (via CI/CD):**
1. Go to GitHub Actions
2. Click "Security Audit" workflow
3. Click "Run workflow"
4. Select "Rotate secrets after audit" = true
5. Click "Run workflow"

The workflow will:
- Decrypt secrets using AGE_KEY from repository secrets
- Sync to Supabase and Vercel
- Log the rotation in audit_logs

---

## 5. Vulnerability Scanning

### Workflow: security-audit.yml

**Location:** `.github/workflows/security-audit.yml`

### Triggers

- **Push:** main, develop branches
- **Pull Request:** main, develop branches
- **Scheduled:** Weekly (Monday 9 AM UTC)
- **Manual:** Via `workflow_dispatch` with optional secret rotation

### Jobs

#### 1. Core App Security Audit

**Tools:**
- `npm audit` (all dependencies)
- `npm audit --production` (production only)
- `npm audit --omit=dev` (exclude dev deps)
- **Trivy** (file system scanning)
- **Semgrep** (static analysis with OWASP Top 10)

**Outputs:**
- SARIF file for GitHub Code Scanning
- Failed build on high/critical vulnerabilities

#### 2. Landing Page Security Audit

**Tools:**
- `pnpm audit` (all dependencies)
- `pnpm audit --prod` (production only)
- **Trivy** (file system scanning)

**Outputs:**
- SARIF file for GitHub Code Scanning

#### 3. Dependency Review

**Runs on:** Pull requests only
**Tool:** GitHub's Dependency Review action
**Policies:**
- Fails on moderate severity changes
- Denies GPL-3.0 and AGPL-3.0 licenses

#### 4. Secret Rotation (Optional)

**Triggers on:** Manual workflow_dispatch with `rotate_secrets=true`
**Steps:**
1. Obtain AGE_KEY from GitHub OIDC
2. Run `npm run secrets:rotate`
3. Verify and log rotation

### Accessing Scan Results

**GitHub Code Scanning:**
1. Go to repository → Security tab
2. Click "Code scanning alerts"
3. Filter by severity (Critical, High, Medium, Low)
4. Review each finding with details and remediation

**Local Scanning:**

```bash
# Run all security scans locally
npm run audit

# For landing page
cd mimicheck-landing
pnpm run audit
```

### Failure Criteria

The workflow fails if:
- Production dependencies have high/critical CVEs
- Semgrep finds critical OWASP violations
- Trivy detects critical file system vulnerabilities
- Dependency review detects problematic changes in PR

---

## 6. Security Documentation

### SECURITY.md

Comprehensive security policy covering:
- Vulnerability reporting
- CSP implementation and verification
- RBAC model and usage
- Audit logging and querying
- Secret management procedures
- Vulnerability scanning setup
- Security headers
- Authentication and authorization
- Input validation
- Dependency management

**Location:** `/SECURITY.md`

### INCIDENT_RESPONSE.md

Detailed incident response procedures including:
- Incident severity levels (P0-P3)
- General incident response process
- Service-specific runbooks (Supabase, Stripe, Vercel)
- **NEW: Security incident response** with investigation templates
- Post-incident procedures and post-mortems

**Location:** `/docs/runbooks/INCIDENT_RESPONSE.md`

### FORTUNE500_AUDIT.md

Enterprise architecture audit including new section:
- Current security posture (CSP, RBAC, audit logging, secrets, scanning)
- Implementation status for each security component
- Remaining gaps and remediation plans

**Location:** `/docs/reports/FORTUNE500_AUDIT.md`

---

## Implementation Checklist

### Phase 1: CSP & Documentation
- [x] Create Vite CSP plugin
- [x] Update vercel.json, netlify.toml with strict CSP
- [x] Update SECURITY.md documentation
- [x] Verify CSP headers in production

### Phase 2: RBAC
- [x] Create 006_rbac.sql migration
- [x] Extend UserProfileContext with roles
- [x] Create useAuthorization hook
- [x] Create ProtectedRoute components
- [x] Gate admin-only features

### Phase 3: Audit Logging
- [x] Create 007_audit_logs.sql migration
- [x] Create audit-log edge function
- [x] Add automatic triggers for key operations
- [x] Document audit log queries

### Phase 4: Secret Management
- [x] Create secrets CLI (scripts/secrets/)
- [x] Implement encryption/decryption
- [x] Add CLI commands to package.json
- [x] Document secret rotation procedure
- [x] Add .age files to .gitignore

### Phase 5: Vulnerability Scanning
- [x] Expand security-audit.yml workflow
- [x] Add Trivy scanning
- [x] Add Semgrep scanning
- [x] Add SARIF upload to code scanning
- [x] Add secret rotation job

### Phase 6: Documentation
- [x] Update SECURITY.md
- [x] Add security section to INCIDENT_RESPONSE.md
- [x] Add security section to FORTUNE500_AUDIT.md
- [x] Create this SECURITY_HARDENING.md guide

---

## Testing & Validation

### CSP Testing
```bash
# Verify nonce is present
curl http://localhost:8005 | grep -o '__CSP_NONCE__'

# Check headers
curl -I http://localhost:8005 | grep -i content-security-policy

# Test with Playwright
npm run test -- csp.test.ts
```

### RBAC Testing
```bash
# Create test user
npx supabase functions invoke create-admin-user -- \
  --email test@example.com

# Check roles
supabase sql query "SELECT * FROM get_user_roles('...')"

# Test protected route
# Navigate to admin panel, should see permission check
```

### Audit Log Testing
```bash
# Check recent logs
supabase sql query "SELECT * FROM audit_logs LIMIT 10"

# Verify trigger works
# Create a user, check audit_logs automatically
```

### Secret Management Testing
```bash
# Test encryption
npm run secrets:encrypt -- --target supabase --file test.json

# Test decryption
npm run secrets:decrypt -- --target supabase

# Verify .gitignore
git check-ignore .env.encrypted.age  # Should return path
```

### Vulnerability Scanning Testing
```bash
# Run locally
npm run audit

# Check workflow run
# GitHub → Actions → Security Audit → Latest run
```

---

## Maintenance & Updates

### Monthly Tasks
- [ ] Review audit logs for anomalies
- [ ] Check for security advisories in dependencies
- [ ] Verify CSP headers on staging
- [ ] Test incident response procedures

### Quarterly Tasks
- [ ] Rotate secrets (RECOMMENDED)
- [ ] Update RBAC policies based on new features
- [ ] Review and update security documentation
- [ ] Security team meeting & feedback

### Annual Tasks
- [ ] Full security audit
- [ ] Penetration testing
- [ ] Update incident response playbook
- [ ] Review and renew certifications

---

## Support & Questions

For questions about the security implementation:
1. Check SECURITY.md and INCIDENT_RESPONSE.md
2. Review code in `src/lib/`, `src/hooks/`, `scripts/secrets/`
3. Contact security team at security@mimitech.ai
4. Check GitHub discussions or issues tagged `security`

---

*Last updated: 2024*  
*Next review: 2025-Q2*
