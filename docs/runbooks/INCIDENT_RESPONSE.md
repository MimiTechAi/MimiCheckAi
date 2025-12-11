# Incident Response Runbook

**Last Updated:** 2025-12-11  
**Version:** 1.0  
**Owner:** Engineering Team

## 🚨 Emergency Contacts

| Role | Contact | Escalation Time |
|------|---------|-----------------|
| **On-Call Engineer** | TBD | Immediate |
| **Engineering Lead** | TBD | < 15 minutes |
| **Product Owner** | TBD | < 30 minutes |
| **DevOps Lead** | TBD | < 15 minutes |
| **Security Officer** | TBD | < 30 minutes (security incidents) |

### External Support
- **Supabase Support:** https://supabase.com/support
- **Stripe Support:** https://support.stripe.com (dashboard)
- **Vercel Support:** https://vercel.com/support

---

## 📊 Incident Severity Levels

| Severity | Description | Response Time | Examples |
|----------|-------------|---------------|----------|
| **P0 - Critical** | Complete service outage | < 5 minutes | Database down, auth broken, payment processing halted |
| **P1 - High** | Major functionality degraded | < 15 minutes | Slow performance, partial feature failure |
| **P2 - Medium** | Minor functionality impaired | < 1 hour | Non-critical feature broken, UI issues |
| **P3 - Low** | Cosmetic or minor issues | < 4 hours | Typos, styling issues |

---

## 🎯 General Incident Response Process

### 1. Detection & Acknowledgment (0-5 minutes)
- [ ] Acknowledge the incident in monitoring system
- [ ] Create incident channel: `#incident-YYYY-MM-DD-<description>`
- [ ] Post initial status update in incident channel
- [ ] Assign incident commander

### 2. Initial Assessment (5-10 minutes)
- [ ] Determine severity level (P0-P3)
- [ ] Identify affected services/users
- [ ] Check status pages:
  - Supabase: https://status.supabase.com
  - Stripe: https://status.stripe.com
  - Vercel: https://www.vercel-status.com
- [ ] Review recent deployments (last 24 hours)

### 3. Communication (Immediate)
- [ ] Post status update to incident channel
- [ ] For P0/P1: Notify leadership
- [ ] For P0: Consider user-facing status page update

### 4. Mitigation & Resolution
- [ ] Follow service-specific runbook (see below)
- [ ] Document all actions taken
- [ ] Update incident channel regularly (every 15-30 minutes)

### 5. Post-Incident (After resolution)
- [ ] Verify full service restoration
- [ ] Post all-clear message
- [ ] Schedule post-mortem (within 48 hours for P0/P1)
- [ ] Document lessons learned

---

## 🗄️ Supabase Outage Response

### Detection Signals

**Automated Alerts:**
- Database connection timeouts
- Edge function failures (>50% error rate)
- Authentication failures spike

**User Reports:**
- "Can't log in"
- "App won't load my data"
- "Upload failed"

**Manual Checks:**
```bash
# Check Supabase health
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/

# Check auth endpoint
curl https://YOUR_PROJECT_REF.supabase.co/auth/v1/health

# Check edge functions
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/health
```

### Immediate Triage Steps

#### Step 1: Verify Supabase Status (< 2 minutes)
```bash
# Check official status
open https://status.supabase.com

# Check dashboard access
open https://supabase.com/dashboard/project/YOUR_PROJECT_REF
```

#### Step 2: Identify Failure Scope (< 5 minutes)
- [ ] Database queries failing?
- [ ] Authentication broken?
- [ ] Storage uploads/downloads failing?
- [ ] Edge functions timing out?

#### Step 3: Check Recent Changes (< 3 minutes)
```bash
# Check recent deployments
git log --oneline --since="24 hours ago"

# Check recent Supabase migrations
cd supabase
npx supabase db remote changes

# Check recent edge function deployments
npx supabase functions list
```

### Mitigation Actions

#### A. Database Connection Issues

**Symptoms:** Queries timeout, "connection refused" errors

**Quick Actions:**
```bash
# 1. Check connection pooling
# Navigate to Supabase Dashboard → Settings → Database
# Verify: Pool Mode = Transaction, Connection Pooling Enabled

# 2. Check for long-running queries
# In Supabase Dashboard → Database → Query Performance
# Kill long-running queries if necessary

# 3. Verify environment variables
cd /home/engine/project
grep SUPABASE .env
# Ensure URLs and keys are correct
```

**Rollback if necessary:**
```bash
# Rollback database migration
cd supabase
npx supabase db reset --linked
npx supabase db push --dry-run
# Review changes, then:
npx supabase db push
```

#### B. Authentication Failures

**Symptoms:** Users can't log in, "Invalid JWT" errors, session expired immediately

**Quick Actions:**
```bash
# 1. Verify auth configuration
# Supabase Dashboard → Authentication → Settings
# Check: Email confirmations, redirects, JWT expiry

# 2. Check CORS configuration
# Supabase Dashboard → Settings → API
# Verify: App URL is in allowed origins

# 3. Test auth flow manually
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/auth/v1/token \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'
```

**Environment Variable Fix:**
```bash
# Verify frontend environment variables
cd /home/engine/project
cat .env | grep -E "SUPABASE|AUTH"

# For production (Vercel)
# Go to: Vercel Dashboard → Project → Settings → Environment Variables
# Verify: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```

#### C. Edge Function Failures

**Symptoms:** 500 errors from edge functions, timeouts, "function not found"

**Quick Actions:**
```bash
# 1. Check function logs
cd supabase
npx supabase functions logs <function-name> --tail

# 2. List deployed functions
npx supabase functions list

# 3. Redeploy specific function
npx supabase functions deploy <function-name> --no-verify-jwt

# Common functions to check:
# - analyze-nebenkosten
# - chat-assistant
# - create-stripe-checkout
# - stripe-webhook
# - extract-document
```

**Secrets Verification:**
```bash
# List secrets (masked)
npx supabase secrets list

# Re-set critical secrets if needed
npx supabase secrets set OPENAI_API_KEY=<key>
npx supabase secrets set ANTHROPIC_API_KEY=<key>
npx supabase secrets set STRIPE_SECRET_KEY=<key>
npx supabase secrets set STRIPE_WEBHOOK_SECRET=<key>
```

#### D. Storage Bucket Issues

**Symptoms:** File uploads fail, "bucket not found", permission denied

**Quick Actions:**
```bash
# 1. Verify bucket existence
# Supabase Dashboard → Storage
# Expected buckets: abrechnungen, antraege, nachweise, avatars

# 2. Check bucket policies
# In Dashboard → Storage → Policies
# Ensure authenticated users have upload permissions

# 3. Test upload via CLI
npx supabase storage create-bucket test-bucket --public
# If successful, buckets are working
npx supabase storage delete-bucket test-bucket
```

### Communication Template

**Initial Alert:**
```
🚨 INCIDENT: Supabase Service Degradation - P0
Time: [TIMESTAMP]
Status: Investigating

Impact:
- [X] Authentication affected
- [X] Database queries failing
- [ ] Storage uploads working
- [X] Edge functions timing out

Affected Users: ~[ESTIMATED %]

Actions Taken:
1. Verified Supabase status page - [Platform issue / No platform issue]
2. Checking recent deployments
3. Investigating connection pooling

Next Update: [TIME]
```

**Resolution Message:**
```
✅ RESOLVED: Supabase Service Degradation
Duration: [START] - [END] ([DURATION])

Root Cause: [Brief explanation]

Resolution:
- [Action 1]
- [Action 2]

Affected Users: ~[ESTIMATED %]
User Action Required: None / Please refresh browser

Post-Mortem: Scheduled for [DATE]
```

### Owner Contacts

| Component | Primary Owner | Backup |
|-----------|---------------|--------|
| Supabase Database | DevOps Lead | Backend Lead |
| Supabase Auth | Backend Lead | Full-Stack Engineer |
| Edge Functions | Backend Lead | DevOps Lead |
| Storage Buckets | Full-Stack Engineer | Backend Lead |

---

## 💳 Stripe Payment Failure Response

### Detection Signals

**Automated Alerts:**
- Webhook delivery failures (Stripe dashboard)
- Checkout session creation errors
- Subscription status mismatches

**User Reports:**
- "Payment didn't go through"
- "Subscription not activated"
- "Charged but no access"

**Manual Checks:**
```bash
# Check webhook endpoint health
curl -X POST https://YOUR_APP_URL/api/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"ping"}'

# Check Stripe dashboard
open https://dashboard.stripe.com/webhooks
open https://dashboard.stripe.com/payments
```

### Immediate Triage Steps

#### Step 1: Verify Stripe Service Status (< 2 minutes)
```bash
# Check Stripe status
open https://status.stripe.com

# Check webhook delivery status
# Stripe Dashboard → Developers → Webhooks → [Your endpoint]
# Look for failed deliveries in last hour
```

#### Step 2: Identify Failure Type (< 5 minutes)
- [ ] Webhook delivery failing?
- [ ] Checkout creation failing?
- [ ] Subscription updates not processing?
- [ ] Payment intent creation errors?

#### Step 3: Check Edge Function Logs (< 3 minutes)
```bash
# Check Stripe webhook function logs
cd supabase
npx supabase functions logs stripe-webhook --tail

# Check checkout creation function logs
npx supabase functions logs create-stripe-checkout --tail

# Check portal session logs
npx supabase functions logs create-portal-session --tail
```

### Mitigation Actions

#### A. Webhook Delivery Failures

**Symptoms:** Payments succeed but subscriptions not activated, "webhook signature invalid"

**Quick Actions:**
```bash
# 1. Verify webhook secret
npx supabase secrets list
# Look for STRIPE_WEBHOOK_SECRET

# 2. Get webhook signing secret from Stripe
# Stripe Dashboard → Developers → Webhooks → [Your endpoint]
# Copy "Signing secret"

# 3. Update secret if needed
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...

# 4. Redeploy webhook function
cd supabase
npx supabase functions deploy stripe-webhook

# 5. Test webhook delivery
# In Stripe Dashboard → Developers → Webhooks
# Click "Send test webhook" → customer.subscription.created
```

**Manual Webhook Replay:**
```bash
# If webhooks failed during outage
# Stripe Dashboard → Developers → Webhooks → [Endpoint]
# Filter by "Failed" status
# Select events → "Resend"
```

#### B. Checkout Session Creation Failures

**Symptoms:** Users can't initiate payment, "price not found", "invalid request"

**Quick Actions:**
```bash
# 1. Verify Stripe API keys
npx supabase secrets list
# Ensure STRIPE_SECRET_KEY is set

# 2. Check price IDs in code
cd /home/engine/project
grep -r "price_" supabase/functions/create-stripe-checkout/

# 3. Verify prices exist in Stripe
# Stripe Dashboard → Products → [Your product] → Pricing
# Copy price ID (starts with price_...)

# 4. Update price IDs if needed
# Edit supabase/functions/create-stripe-checkout/index.ts
# Then redeploy:
cd supabase
npx supabase functions deploy create-stripe-checkout

# 5. Test checkout creation
# Navigate to app → Click upgrade button
# Check browser console for errors
```

#### C. Subscription Status Mismatches

**Symptoms:** User paid but shows as "free tier", "subscription active" but access denied

**Quick Actions:**
```bash
# 1. Verify user's subscription in Stripe
# Stripe Dashboard → Customers → Search by email
# Check subscription status

# 2. Check database subscription status
# Supabase Dashboard → Table Editor → users table
# Find user by email, check: stripe_subscription_id, subscription_status

# 3. Manual sync if needed (Supabase SQL Editor):
```

```sql
-- Get user's current DB status
SELECT id, email, stripe_customer_id, stripe_subscription_id, subscription_status
FROM public.users
WHERE email = 'user@example.com';

-- Update subscription status (if verified in Stripe)
UPDATE public.users
SET 
  subscription_status = 'active',
  stripe_subscription_id = 'sub_...',
  updated_at = NOW()
WHERE email = 'user@example.com';
```

**Webhook Event Replay:**
```bash
# Find missed webhook events
# Stripe Dashboard → Developers → Events
# Filter: subscription.updated, invoice.paid
# Copy event ID (starts with evt_...)

# Manually trigger webhook function
# Use Stripe CLI or Dashboard "Resend" button
```

### Rollback Commands

```bash
# Rollback Stripe edge functions
cd supabase

# Rollback to previous version
git log supabase/functions/stripe-webhook/ --oneline
# Find last good commit hash

git show <commit-hash>:supabase/functions/stripe-webhook/index.ts > /tmp/backup.ts
cp /tmp/backup.ts supabase/functions/stripe-webhook/index.ts

# Redeploy
npx supabase functions deploy stripe-webhook

# Same for checkout function
git show <commit-hash>:supabase/functions/create-stripe-checkout/index.ts > /tmp/checkout-backup.ts
cp /tmp/checkout-backup.ts supabase/functions/create-stripe-checkout/index.ts
npx supabase functions deploy create-stripe-checkout
```

### Communication Template

**Initial Alert:**
```
🚨 INCIDENT: Stripe Payment Processing Issues - P0
Time: [TIMESTAMP]
Status: Investigating

Impact:
- [X] New subscriptions: Cannot upgrade
- [ ] Existing subscriptions: Still active
- [X] Webhooks: Delivery failing

Affected Users: New sign-ups only

Actions Taken:
1. Verified Stripe status - operational
2. Checking webhook delivery logs
3. Investigating edge function errors

Workaround: Manual subscription activation available

Next Update: [TIME]
```

**Resolution Message:**
```
✅ RESOLVED: Stripe Payment Processing
Duration: [START] - [END] ([DURATION])

Root Cause: Webhook signature verification failing due to [reason]

Resolution:
- Updated STRIPE_WEBHOOK_SECRET
- Redeployed stripe-webhook function
- Replayed failed webhook events

Affected Users: [X] customers (all subscriptions now active)
User Action Required: None (subscriptions automatically activated)

Post-Mortem: Scheduled for [DATE]
```

### Owner Contacts

| Component | Primary Owner | Backup |
|-----------|---------------|--------|
| Stripe Integration | Backend Lead | Full-Stack Engineer |
| Webhook Processing | Backend Lead | DevOps Lead |
| Payment UI | Frontend Lead | Full-Stack Engineer |
| Customer Support | Product Owner | Customer Success |

---

## 🔐 Authentication Regression Response

### Detection Signals

**Automated Alerts:**
- Auth endpoint returning 500 errors
- JWT validation failures spike
- Session refresh failures

**User Reports:**
- "Can't log in" (new and existing users)
- "Logged out unexpectedly"
- "Session expired immediately"
- "Infinite login loop"

**Manual Checks:**
```bash
# Test login flow
# Open app → Click "Login" → Check for:
# - Redirect to correct URL
# - Email confirmation required?
# - Session persists on refresh?

# Check auth logs
cd supabase
npx supabase logs --db-logs --limit 50
```

### Immediate Triage Steps

#### Step 1: Categorize Auth Issue (< 3 minutes)
- [ ] **Cannot log in at all** → P0 (Critical)
- [ ] **Login works but session doesn't persist** → P0 (Critical)
- [ ] **Email confirmation broken** → P1 (High)
- [ ] **Password reset broken** → P1 (High)
- [ ] **Social auth broken** → P2 (Medium)

#### Step 2: Check Recent Auth Changes (< 5 minutes)
```bash
# Check recent changes to auth-related code
cd /home/engine/project
git log --oneline --since="48 hours ago" -- \
  src/api/supabaseClient.ts \
  src/contexts/AuthContext.jsx \
  src/pages/Login.jsx \
  src/pages/Signup.jsx

# Check recent Supabase config changes
cd supabase
git log --oneline --since="48 hours ago" -- migrations/
```

#### Step 3: Verify Environment Configuration (< 5 minutes)
```bash
# Check local environment
cd /home/engine/project
cat .env | grep -E "SUPABASE_URL|SUPABASE_ANON_KEY|APP_URL|LANDING_URL"

# Check production environment (Vercel)
# Vercel Dashboard → Project → Settings → Environment Variables
# Verify all VITE_SUPABASE_* variables are set correctly
```

### Mitigation Actions

#### A. Complete Login Failure

**Symptoms:** Login button does nothing, errors in console, 401/403 responses

**Quick Actions:**
```bash
# 1. Verify Supabase auth is enabled
# Supabase Dashboard → Authentication → Settings
# Ensure: Enable email provider is ON

# 2. Check redirect URLs
# Supabase Dashboard → Authentication → URL Configuration
# Add if missing:
# - http://localhost:8005/** (development)
# - https://app.mimicheck.de/** (production)
# - http://localhost:3000/** (landing page dev)
# - https://mimicheck.de/** (landing page prod)

# 3. Verify CORS settings
# Supabase Dashboard → Settings → API
# Allowed CORS origins should include app URLs

# 4. Test with curl
curl -X POST \
  "https://YOUR_PROJECT_REF.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Frontend Fix:**
```bash
# Check for auth client initialization errors
cd /home/engine/project
grep -A 10 "createClient" src/api/supabaseClient.ts

# Verify environment variables are loaded
npm run dev
# Open browser console → Application → Local Storage
# Check for supabase.auth.token
```

#### B. Session Persistence Issues

**Symptoms:** User logs in successfully but gets logged out on page refresh

**Quick Actions:**
```bash
# 1. Check storage type
# In src/api/supabaseClient.ts
# Ensure auth storage is set to localStorage (default)

# 2. Verify JWT expiry settings
# Supabase Dashboard → Settings → API → JWT Settings
# JWT expiry: 3600 (1 hour default)
# Refresh token expiry: 604800 (7 days default)

# 3. Check session refresh logic
cd /home/engine/project
grep -r "onAuthStateChange" src/

# 4. Clear browser storage and retry
# In browser DevTools:
# Application → Local Storage → Clear All
# Application → Session Storage → Clear All
# Cookies → Clear All
```

**Code Fix (if needed):**
```typescript
// Ensure proper session handling in src/api/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage // Ensure localStorage is used
  }
})
```

#### C. Email Confirmation Loop

**Symptoms:** Email verification required but link doesn't work, "Email not confirmed" error persists

**Quick Actions:**
```bash
# 1. Disable email confirmation temporarily (for critical incidents)
# Supabase Dashboard → Authentication → Settings
# Email Auth → Disable "Enable email confirmations"
# ⚠️ Only for emergency - re-enable ASAP

# 2. Check email template configuration
# Supabase Dashboard → Authentication → Email Templates
# Verify: Confirm signup template has correct redirect URL
# Should be: {{ .SiteURL }}/auth/callback?token={{ .Token }}&type=signup

# 3. Manually verify user (if needed)
# Supabase Dashboard → Authentication → Users
# Find user → Click "..." → "Verify Email"

# 4. Check email deliverability
# Supabase Dashboard → Logs
# Filter for email-related errors
```

**SQL Fix (manual verification):**
```sql
-- Manually verify a user (emergency only)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'user@example.com' 
  AND email_confirmed_at IS NULL;
```

#### D. OAuth/Social Auth Failures

**Symptoms:** Google/GitHub login broken, redirect errors, "OAuth error"

**Quick Actions:**
```bash
# 1. Check OAuth provider configuration
# Supabase Dashboard → Authentication → Providers
# Verify: Client ID and Client Secret are set correctly

# 2. Verify OAuth redirect URLs
# In OAuth provider settings (Google/GitHub/etc.)
# Callback URL should be:
# https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback

# 3. Check for provider-specific outages
# Google: https://www.google.com/appsstatus
# GitHub: https://www.githubstatus.com

# 4. Test OAuth flow manually
# Click social login button
# Check browser network tab for redirect chain
# Look for: authorize → callback → token
```

### Rollback Commands

```bash
# Rollback auth-related code changes
cd /home/engine/project

# View recent auth commits
git log --oneline -- src/api/supabaseClient.ts src/contexts/AuthContext.jsx

# Rollback to last known good commit
git show <commit-hash>:src/api/supabaseClient.ts > src/api/supabaseClient.ts
git show <commit-hash>:src/contexts/AuthContext.jsx > src/contexts/AuthContext.jsx

# If TypeScript, might need .ts extension
git show <commit-hash>:src/api/supabaseClient.ts > src/api/supabaseClient.ts

# Rebuild and deploy
npm run build

# For Vercel production (auto-deploys from git)
git add src/api/supabaseClient.ts src/contexts/AuthContext.jsx
git commit -m "fix: rollback auth changes to resolve incident"
git push origin main
```

**Vercel Instant Rollback:**
```bash
# Option 1: Via Vercel Dashboard
# Vercel Dashboard → Project → Deployments
# Find last working deployment → Click "..." → "Promote to Production"

# Option 2: Via Vercel CLI
npx vercel --prod
# Then in dashboard, promote the working deployment
```

### Communication Template

**Initial Alert:**
```
🚨 INCIDENT: Authentication System Failure - P0
Time: [TIMESTAMP]
Status: Investigating

Impact:
- [X] User login: Completely broken
- [X] Session persistence: Users logged out
- [ ] Signup: Working
- [X] Password reset: Timing out

Affected Users: ALL users attempting to access app

Actions Taken:
1. Verified Supabase auth service - operational
2. Checking recent auth code deployments
3. Reviewing Supabase auth configuration

Workaround: None available - incident resolution in progress

Next Update: [TIME] (every 15 minutes)
```

**Resolution Message:**
```
✅ RESOLVED: Authentication System Restored
Duration: [START] - [END] ([DURATION])

Root Cause: [e.g., Missing redirect URL in Supabase configuration after domain change]

Resolution:
- Added production domain to Supabase redirect URLs
- Cleared browser cache requirements for users
- Verified session persistence on all browsers

Affected Users: ALL users
User Action Required: Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

Preventive Measures:
- Added auth configuration to deployment checklist
- Implemented auth health check endpoint

Post-Mortem: Scheduled for [DATE]
```

### Owner Contacts

| Component | Primary Owner | Backup |
|-----------|---------------|--------|
| Supabase Auth Config | DevOps Lead | Backend Lead |
| Auth Frontend Flow | Frontend Lead | Full-Stack Engineer |
| User Session Management | Backend Lead | Full-Stack Engineer |
| OAuth Providers | Backend Lead | DevOps Lead |

---

## 🔧 General Rollback Procedures

### Frontend Rollback (Vercel)

#### Method 1: Dashboard Instant Rollback (Fastest - < 2 minutes)
```bash
# 1. Open Vercel Dashboard
open https://vercel.com/dashboard

# 2. Navigate to: Project → Deployments
# 3. Find the last working deployment (check timestamp)
# 4. Click "..." → "Promote to Production"
# 5. Verify rollback successful (check app)
```

#### Method 2: Git Rollback + Auto-Deploy (< 5 minutes)
```bash
cd /home/engine/project

# Find last good commit
git log --oneline --graph --all

# Create rollback commit (safer than force push)
git revert <bad-commit-hash>
git push origin main

# Vercel auto-deploys from main branch
# Monitor: Vercel Dashboard → Deployments
```

### Supabase Edge Functions Rollback

```bash
cd /home/engine/project/supabase

# Rollback specific function
git log --oneline -- functions/<function-name>/
git show <commit-hash>:functions/<function-name>/index.ts > functions/<function-name>/index.ts

# Redeploy
npx supabase functions deploy <function-name>

# Verify
npx supabase functions logs <function-name> --tail

# Common functions:
# - stripe-webhook
# - create-stripe-checkout  
# - analyze-nebenkosten
# - chat-assistant
```

### Database Migration Rollback

```bash
cd /home/engine/project/supabase

# List migrations
npx supabase migrations list

# Rollback last migration (careful!)
npx supabase db reset --linked

# Or manually: In Supabase SQL Editor
# Run the DOWN migration from migration file
```

### Environment Variables Rollback

```bash
# Vercel (via Dashboard)
# 1. Vercel Dashboard → Project → Settings → Environment Variables
# 2. Click variable → View history
# 3. Revert to previous value
# 4. Redeploy: Deployments → Redeploy

# Supabase Secrets
npx supabase secrets set KEY_NAME=previous_value
# Then redeploy affected functions
```

---

## 📱 Escalation Paths

### P0 - Critical Incident Escalation
```
0-5 min:  On-call engineer acknowledges
5-15 min: Engineering Lead notified
15-30 min: Product Owner + CTO notified
30-60 min: Consider external support (Supabase/Stripe)
```

### P1 - High Priority Escalation
```
0-15 min: On-call engineer acknowledges
15-30 min: Engineering Lead notified
1-2 hrs:  Product Owner notified (if unresolved)
```

### When to Escalate to External Support

**Supabase:**
- Platform-wide outage confirmed (status page)
- Database corruption suspected
- Performance degradation beyond config tuning
- Support: https://supabase.com/dashboard/support

**Stripe:**
- Webhook endpoint receiving invalid payloads
- Payment processing anomalies (fraud, holds)
- API quota issues
- Support: https://dashboard.stripe.com/support

---

## 🧪 Testing After Resolution

### Post-Incident Verification Checklist

#### Core User Flows (All Incidents)
- [ ] User can sign up with email
- [ ] User can log in with email
- [ ] Session persists after page refresh
- [ ] User can log out
- [ ] User can upload document
- [ ] User can view analysis results
- [ ] User can access settings

#### Payment Flows (Stripe Incidents)
- [ ] User can click "Upgrade" button
- [ ] Checkout session opens correctly
- [ ] Test payment completes (use Stripe test card)
- [ ] User's subscription status updates
- [ ] Webhook received and processed
- [ ] User gains access to premium features

#### Database Flows (Supabase Incidents)
- [ ] Create operation works (new user, new document)
- [ ] Read operation works (fetch existing data)
- [ ] Update operation works (user profile)
- [ ] Delete operation works (document deletion)
- [ ] Real-time updates working (if applicable)

### Automated Health Checks

```bash
# Run automated test suite
npm run test:run

# Check build
npm run build

# Lighthouse CI (performance)
npm run lighthouse

# Security audit
npm run audit
```

---

## 📝 Post-Incident Template

### Post-Mortem Document Structure

```markdown
# Post-Mortem: [Incident Title]

**Date:** YYYY-MM-DD
**Duration:** [START] - [END] ([DURATION])
**Severity:** P0/P1/P2/P3
**Incident Commander:** [Name]

## Summary
[1-2 sentence description]

## Impact
- Users affected: [number or percentage]
- Services affected: [list]
- Revenue impact: [if applicable]
- Data loss: None / [description]

## Timeline (All times in UTC)
- HH:MM - Incident begins (first alert/user report)
- HH:MM - Incident acknowledged
- HH:MM - [Key action]
- HH:MM - [Key action]
- HH:MM - Service restored
- HH:MM - All clear

## Root Cause
[Detailed technical explanation]

## Resolution
[What was done to fix it]

## What Went Well
- [Positive point 1]
- [Positive point 2]

## What Went Wrong
- [Problem 1]
- [Problem 2]

## Action Items
- [ ] [Action 1] - Owner: [Name] - Due: [Date]
- [ ] [Action 2] - Owner: [Name] - Due: [Date]

## Lessons Learned
[Key takeaways for future incidents]
```

---

## 📚 Related Documentation

- [Deployment Checklist](../../DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification
- [Architecture Audit](../reports/FORTUNE500_AUDIT.md) - System architecture overview
- [Supabase Setup](../reports/SUPABASE-SETUP.md) - Supabase configuration details
- [Security Guidelines](../../SECURITY.md) - Security best practices
- [Testing Documentation](../reports/TESTING_*.md) - Test coverage and procedures

---

## 🔄 Runbook Maintenance

**Review Frequency:** Monthly  
**Last Reviewed:** 2025-12-11  
**Next Review:** 2026-01-11

### Update Triggers
- After every P0/P1 incident
- After significant architecture changes
- After adding new external dependencies
- After team member changes (contact updates)

### Maintainers
- DevOps Lead (primary)
- Engineering Lead (backup)

---

*This runbook is a living document. Please update it based on actual incident learnings and team feedback.*
