# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to security@mimitech.ai. All security vulnerabilities will be promptly addressed.

Please include the following information:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Measures

### Content Security Policy (CSP)

Our application implements a strict Content Security Policy without `unsafe-inline` or `unsafe-eval`:

```
default-src 'self';
script-src 'self' https://js.stripe.com https://cdn.anthropic.com;
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://api.anthropic.com https://api.openai.com;
frame-src https://js.stripe.com https://hooks.stripe.com;
frame-ancestors 'none';
upgrade-insecure-requests;
object-src 'none';
base-uri 'none';
```

**Key Features:**
- Nonce-based script injection (generated at build time via Vite plugin)
- No inline scripts or styles allowed
- External scripts limited to trusted CDNs only
- Frame embedding disabled (`frame-ancestors 'none'`)
- Automatic HTTPS upgrade for insecure requests

**Verification:**
To verify CSP headers are properly set:
```bash
# Check Vercel deployment
curl -I https://mimicheck.ai | grep Content-Security-Policy

# Check local development
curl -I http://localhost:8005 | grep Content-Security-Policy
```

### Role-Based Access Control (RBAC)

The application implements enterprise-grade RBAC:

**Database Schema:**
- `roles` table: Define roles (admin, moderator, user, viewer)
- `permissions` table: Define permissions (resource + action)
- `role_permissions` junction table: Map permissions to roles
- `user_roles` junction table: Assign roles to users

**Default Roles:**
- **Admin**: Full system access, all permissions
- **Moderator**: Moderate user content, view audit logs
- **User**: Basic access to own resources
- **Viewer**: Read-only access to non-sensitive data

**Implementation:**

Frontend authorization checks:
```javascript
import { useAuthorization } from '@/hooks/useAuthorization';

function AdminComponent() {
  const { isAdmin, canAccessSecurityDashboard } = useAuthorization();
  
  if (!isAdmin()) return <AccessDenied />;
  if (!canAccessSecurityDashboard()) return <NotAuthorized />;
  
  return <AdminDashboard />;
}
```

Protected routes:
```javascript
import { AdminOnlyRoute } from '@/components/ProtectedRoute';

<AdminOnlyRoute fallback="/dashboard">
  <SecurityDashboard />
</AdminOnlyRoute>
```

**Database-level RBAC:**
- RLS (Row Level Security) policies enforce access control at the database level
- Helper function `has_permission()` checks permissions in queries
- Audit triggers automatically log all RBAC changes

### Audit Logging

All sensitive operations are logged to the `audit_logs` table:

**Logged Operations:**
- User creation and modifications
- Role assignments and removals
- Document uploads and deletions
- Stripe session creation
- AI invocation (with API calls capped)
- Admin dashboard access
- Secret rotation events

**Audit Log Structure:**
```sql
{
  user_id: UUID,
  actor_role: TEXT,
  action: TEXT,
  resource_type: TEXT,
  resource_id: UUID,
  changes: JSONB,
  metadata: JSONB,
  ip_address: INET,
  user_agent: TEXT,
  status: 'success' | 'failure',
  error_message: TEXT,
  created_at: TIMESTAMP
}
```

**Viewing Audit Logs:**

Via SQL:
```sql
SELECT * FROM audit_logs 
WHERE resource_type = 'users' 
  AND action = 'user_updated'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

Via Admin UI:
Navigate to Admin Dashboard → Audit Logs (requires `audit_logs.read` permission)

**Log Retention:**
- Default: 90 days
- Production: 1 year
- Archived automatically to cold storage after 90 days

### Automated Security Scanning

Security audits run automatically on every push and pull request:

**Tools & Checks:**
- **npm audit**: Node.js dependency vulnerabilities
- **pnpm audit**: Landing page dependency vulnerabilities
- **Trivy**: File system and container image scanning
- **Semgrep**: Static analysis for code patterns and vulnerabilities
- **Dependency Review**: Automated review of dependency changes in PRs

**SARIF Upload:**
All vulnerability scan results are uploaded to GitHub's code scanning feature, visible in:
- Security tab → Code scanning alerts
- PR annotations and checks

**Failure Criteria:**
- High or critical vulnerabilities in production dependencies fail the build
- Dependency review blocks PRs with problematic changes
- Manual review required for security exceptions

**Running Locally:**
```bash
# Core app
npm run audit
npm run audit:fix

# Landing page
cd mimicheck-landing
pnpm run audit
pnpm run audit:fix
```

### Secret Management

Secrets are encrypted using age and managed via a TypeScript CLI:

**Encryption:**
- Secrets stored in encrypted `.age` files
- Encryption key stored in CI environment variables
- Age algorithm: ChaCha20-Poly1305

**Supported Targets:**
- Supabase Functions: `supabase/.encrypted-secrets.json.age`
- Vercel Environment: `.env.encrypted.age`
- Edge Functions: `supabase/functions/.env.encrypted.age`

**CLI Commands:**

Encrypt secrets:
```bash
npm run secrets:encrypt -- --target supabase --file .env.supabase
```

Decrypt secrets:
```bash
npm run secrets:decrypt -- --target supabase
```

Sync to platform:
```bash
npm run secrets:sync -- --target vercel
```

Rotate all secrets (requires GitHub workflow_dispatch):
```bash
npm run secrets:rotate
```

**Secret Rotation Cadence:**
- **Default**: Every 90 days
- **After breach**: Immediate (within 1 hour)
- **CI/CD**: Via `workflow_dispatch` manual trigger
- **Automated**: Scheduled monthly in production

**GitHub OIDC Integration:**
```yaml
permissions:
  id-token: write

steps:
  - name: Get OIDC token
    uses: actions/github-script@v6
    id: get_token
    with:
      script: |
        return await core.getIDToken('sts.amazonaws.com')
```

### Automated Security Scanning (CI/CD)

The `.github/workflows/security-audit.yml` workflow runs comprehensive scans:

**Triggers:**
- On every push to main/develop
- On every pull request
- Weekly scheduled audit (Monday 9 AM UTC)
- Manual trigger with secret rotation option

**Jobs:**
1. **Core App Security Audit**
   - npm audit (all & production-only)
   - Trivy file system scan
   - Semgrep static analysis
   - Dependency outdated check
   - Fails on high/critical vulnerabilities

2. **Landing Page Security Audit**
   - pnpm audit
   - Trivy scan
   - Dependency checks

3. **Dependency Review**
   - Runs on PRs only
   - Blocks problematic dependencies
   - Denies GPL-3.0 and AGPL-3.0 licenses

4. **Secret Rotation**
   - Manual trigger only
   - Decrypts secrets using AGE_KEY
   - Syncs to Supabase and Vercel
   - Logs all rotations to audit_logs

### Security Headers

All responses include security headers:

```
X-Frame-Options: DENY                                    # Disable framing
X-Content-Type-Options: nosniff                          # Prevent MIME sniffing
X-XSS-Protection: 1; mode=block                          # Browser XSS filter
Referrer-Policy: strict-origin-when-cross-origin         # Referrer restrictions
Permissions-Policy: camera=(), microphone=(), geolocation=()  # Disable dangerous APIs
Content-Security-Policy: [see above]                     # Strict CSP
```

### Authentication & Authorization

- **Auth Provider**: Supabase Auth (PostgreSQL-backed)
- **JWT Tokens**: Short-lived access tokens (1 hour)
- **Refresh Tokens**: Long-lived refresh tokens (7 days)
- **MFA**: Supported via TOTP
- **Session Management**: Server-side session validation

### HTTPS & Transport Security

- **HTTPS**: Enforced on all production deployments
- **HSTS**: Enabled with 1-year max-age
- **TLS 1.2+**: Minimum version enforced
- **Certificate Pinning**: Not used (relies on system CA trust)

### Input Validation & Sanitization

- **Server-side**: Zod schema validation on all inputs
- **Database**: Parameterized queries prevent SQL injection
- **XSS Prevention**: React's built-in escaping + DOMPurify for user HTML
- **CSRF**: SameSite cookies enabled

### Dependency Management

- **Lockfiles**: Committed and enforced
- **Updates**: Monthly security dependency updates
- **Audit**: Weekly automated audits
- **License Review**: GPL/AGPL licenses blocked

### Running Security Audits Locally

#### Core App
```bash
npm run audit
npm run audit:fix  # Automatically fix vulnerabilities
```

#### Landing Page
```bash
cd mimicheck-landing
pnpm run audit
pnpm run audit:fix  # Automatically fix vulnerabilities
```

#### Full Security Audit
```bash
npm run audit && cd mimicheck-landing && pnpm run audit
```

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. Updates are announced via:

- GitHub Security Advisories
- Release notes
- Email notifications to maintainers

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new security fix versions as soon as possible
5. Log the incident in our audit trail

## Incident Response

See [`docs/runbooks/INCIDENT_RESPONSE.md`](docs/runbooks/INCIDENT_RESPONSE.md) for detailed incident response procedures.

## Security Checklist for Deployments

Before each production deployment:

- [ ] All security tests pass in CI
- [ ] No open high/critical CVEs
- [ ] CSP headers verified on staging
- [ ] Audit logs enabled and monitored
- [ ] Secrets rotated within past 90 days
- [ ] RBAC policies tested for edge cases
- [ ] Rate limiting enabled on APIs
- [ ] DDoS mitigation active (Cloudflare or equivalent)
- [ ] Backup and recovery tested
- [ ] Security team notified of changes

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.
