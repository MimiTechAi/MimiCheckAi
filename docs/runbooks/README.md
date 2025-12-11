# Operational Runbooks

Quick-access documentation for on-call engineers during incidents and operational tasks.

## 🚨 Emergency Runbooks

### [INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md)
**Primary incident response guide** for critical production issues.

#### Quick Links by Incident Type:

| Incident Type | Section | Severity | Response Time |
|---------------|---------|----------|---------------|
| 🗄️ **Supabase Outage** | [Supabase Response](#supabase-outage) | P0 | < 5 min |
| 💳 **Stripe Payment Failure** | [Stripe Response](#stripe-payment-failure) | P0 | < 5 min |
| 🔐 **Auth Regression** | [Auth Response](#authentication-regression) | P0 | < 5 min |
| 🌐 **Complete Service Down** | [General Response](#general-incident-process) | P0 | < 2 min |
| 🐌 **Performance Degradation** | [Performance Response](#performance-issues) | P1 | < 15 min |

---

## 📋 Quick Access by Symptom

### Users Can't Access the App

**Symptoms:**
- "App won't load"
- "Page is blank"
- "Connection timeout"

**Go to:** [Supabase Outage Response](./INCIDENT_RESPONSE.md#-supabase-outage-response)

**Quick Check:**
```bash
# Check Supabase status
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/

# Check Vercel deployment
curl https://app.mimicheck.de
```

---

### Users Can't Log In

**Symptoms:**
- "Login button doesn't work"
- "Session expired immediately"
- "Infinite login loop"

**Go to:** [Authentication Regression Response](./INCIDENT_RESPONSE.md#-authentication-regression-response)

**Quick Check:**
```bash
# Test auth endpoint
curl -X POST \
  https://YOUR_PROJECT_REF.supabase.co/auth/v1/token \
  -H "apikey: YOUR_ANON_KEY"

# Check recent auth deployments
cd /home/engine/project
git log --oneline --since="24 hours ago" -- src/api/supabaseClient.ts
```

---

### Payments Are Failing

**Symptoms:**
- "Payment didn't go through"
- "Subscription not activated"
- "Webhooks failing"

**Go to:** [Stripe Payment Failure Response](./INCIDENT_RESPONSE.md#-stripe-payment-failure-response)

**Quick Check:**
```bash
# Check Stripe status
open https://status.stripe.com

# Check webhook logs
cd /home/engine/project/supabase
npx supabase functions logs stripe-webhook --tail

# Check failed webhooks in Stripe Dashboard
open https://dashboard.stripe.com/webhooks
```

---

### App is Slow

**Symptoms:**
- "Pages loading slowly"
- "Database queries timing out"
- "Edge functions slow"

**Quick Check:**
```bash
# Check database performance
# Supabase Dashboard → Database → Query Performance

# Check edge function logs for timeouts
cd /home/engine/project/supabase
npx supabase functions logs --tail

# Check Vercel deployment logs
# Vercel Dashboard → Project → Functions
```

---

## 🔧 Common Operations

### Rollback Deployment

**Frontend (Vercel) - Fastest Method:**
```bash
# Via Dashboard (< 2 minutes):
# 1. Vercel Dashboard → Project → Deployments
# 2. Find last working deployment
# 3. Click "..." → "Promote to Production"
```

**Supabase Edge Function:**
```bash
cd /home/engine/project/supabase

# Rollback specific function
git log --oneline -- functions/<function-name>/
git show <commit-hash>:functions/<function-name>/index.ts > functions/<function-name>/index.ts
npx supabase functions deploy <function-name>
```

**See full guide:** [Rollback Procedures](./INCIDENT_RESPONSE.md#-general-rollback-procedures)

---

### Update Secrets

**Supabase Secrets:**
```bash
cd /home/engine/project/supabase

# List current secrets (values masked)
npx supabase secrets list

# Update a secret
npx supabase secrets set SECRET_NAME=new_value

# Redeploy affected functions
npx supabase functions deploy <function-name>
```

**Common Secrets:**
- `OPENAI_API_KEY` - Used by: chat-assistant, analyze-nebenkosten
- `ANTHROPIC_API_KEY` - Used by: analyze-pdf-claude
- `STRIPE_SECRET_KEY` - Used by: create-stripe-checkout, stripe-webhook
- `STRIPE_WEBHOOK_SECRET` - Used by: stripe-webhook

**Vercel Environment Variables:**
```bash
# Via Dashboard:
# Vercel Dashboard → Project → Settings → Environment Variables
# Update variable → Save → Redeploy
```

---

### Deploy Edge Function

```bash
cd /home/engine/project/supabase

# Deploy single function
npx supabase functions deploy <function-name>

# Deploy all functions
npx supabase functions deploy

# Common functions:
# - stripe-webhook
# - create-stripe-checkout
# - analyze-nebenkosten
# - chat-assistant
# - extract-document
```

---

### Check Service Health

```bash
# Supabase health checks
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/
curl https://YOUR_PROJECT_REF.supabase.co/auth/v1/health

# Check specific edge function
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/health

# Check frontend
curl https://app.mimicheck.de

# Check landing page
curl https://mimicheck.de

# Status pages
open https://status.supabase.com
open https://status.stripe.com
open https://www.vercel-status.com
```

---

## 📞 Emergency Contacts

| Role | Contact | When to Escalate |
|------|---------|------------------|
| **On-Call Engineer** | TBD | Immediate (incident detected) |
| **Engineering Lead** | TBD | P0: < 15 min, P1: < 30 min |
| **DevOps Lead** | TBD | Infrastructure issues |
| **Product Owner** | TBD | P0: < 30 min, user communication |
| **Security Officer** | TBD | Security incidents only |

### External Support

| Service | Support URL | When to Contact |
|---------|-------------|-----------------|
| **Supabase** | https://supabase.com/support | Platform outage, DB corruption |
| **Stripe** | https://support.stripe.com | Payment processing issues, fraud |
| **Vercel** | https://vercel.com/support | Deployment issues, CDN problems |

---

## 🎯 Incident Severity Levels

| Severity | Response Time | Description | Examples |
|----------|---------------|-------------|----------|
| **P0** | < 5 min | Complete outage | Database down, auth broken, payments halted |
| **P1** | < 15 min | Major degradation | Slow performance, partial feature failure |
| **P2** | < 1 hour | Minor impairment | Non-critical feature broken |
| **P3** | < 4 hours | Cosmetic issues | UI bugs, styling issues |

---

## 📚 Related Documentation

### Production Operations
- [DEPLOYMENT_CHECKLIST.md](../../DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification
- [SECURITY.md](../../SECURITY.md) - Security guidelines and policies

### Technical Documentation
- [README.md](../../README.md) - Project overview and setup
- [FORTUNE500_AUDIT.md](../reports/FORTUNE500_AUDIT.md) - Architecture overview
- [AUTH-FLOW-VERIFICATION.md](../AUTH-FLOW-VERIFICATION.md) - Authentication flow details

### Development
- [TYPESCRIPT_MIGRATION_STRATEGY.md](../../TYPESCRIPT_MIGRATION_STRATEGY.md) - Code structure
- [PERFORMANCE_IMPROVEMENTS.md](../../PERFORMANCE_IMPROVEMENTS.md) - Performance optimization

---

## 🔄 Using This Documentation

### During an Active Incident

1. **Don't panic** - Follow the runbook step by step
2. **Communicate early** - Post in incident channel immediately
3. **Document actions** - Log everything you do
4. **Follow escalation paths** - Don't wait too long to escalate
5. **Update regularly** - Keep stakeholders informed

### General Workflow

```
Incident Detected
    ↓
[INCIDENT_RESPONSE.md] → Identify incident type
    ↓
Follow specific section:
    - Supabase Outage
    - Stripe Failure
    - Auth Regression
    ↓
Execute mitigation steps
    ↓
Verify resolution
    ↓
Post-mortem (P0/P1 only)
    ↓
Update runbook with learnings
```

---

## ⚡ Critical Commands Reference

### Database

```bash
# Check Supabase connection
curl https://YOUR_PROJECT_REF.supabase.co/rest/v1/

# View recent migrations
cd /home/engine/project/supabase
npx supabase migrations list

# Check database logs
npx supabase logs --db-logs
```

### Authentication

```bash
# Test auth endpoint
curl -X POST \
  "https://YOUR_PROJECT_REF.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Payments

```bash
# Check Stripe webhook logs
cd /home/engine/project/supabase
npx supabase functions logs stripe-webhook --tail

# List Supabase secrets
npx supabase secrets list
```

### Deployments

```bash
# View recent commits
cd /home/engine/project
git log --oneline --since="24 hours ago"

# Check build
npm run build

# Deploy edge function
cd supabase
npx supabase functions deploy <function-name>
```

---

## 📝 Runbook Maintenance

**Review Schedule:** Monthly  
**Last Updated:** 2025-12-11  
**Next Review:** 2026-01-11

### How to Update

1. After every P0/P1 incident → Update relevant section
2. After architecture changes → Update affected commands
3. When contacts change → Update emergency contacts
4. When adding new services → Add new runbook section

### Owners

- **Primary:** DevOps Lead
- **Backup:** Engineering Lead
- **Reviewers:** All senior engineers

---

## 🆘 Need Help?

**Can't find what you need?**
1. Check the [full incident response guide](./INCIDENT_RESPONSE.md)
2. Review [architecture documentation](../reports/FORTUNE500_AUDIT.md)
3. Escalate to Engineering Lead
4. Contact external support (Supabase/Stripe/Vercel)

**Found an issue with this runbook?**
1. Create an issue or PR
2. Update after post-mortem
3. Notify DevOps Lead

---

*These runbooks are living documents. Keep them updated with real-world learnings from incidents.*
