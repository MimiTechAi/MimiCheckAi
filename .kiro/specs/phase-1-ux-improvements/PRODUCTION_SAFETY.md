# 🚨 Production Safety Guide - Phase 1

## Live Production Sites

- **Landing Page**: https://mimicheck.ai (Port 3000)
- **Core App**: https://app.mimicheck.ai (Port 8005)

## Critical Rules

### ✅ DO:
1. **Create new files** for new features (e.g., `HomeV2.jsx`, `UploadV2.jsx`)
2. **Use feature flags** to toggle between old and new versions
3. **Deploy to staging first** and test for 48+ hours
4. **Gradual rollout** (10% → 50% → 100% of users)
5. **Monitor metrics** at each rollout stage
6. **Keep rollback plan** ready and tested
7. **Wrap analytics** in try-catch (never break site for analytics)
8. **Add error boundaries** around new components
9. **Test on real devices** (mobile, tablet, desktop)
10. **Document all changes** in changelog

### ❌ DON'T:
1. **Never modify** existing production files directly
2. **Never delete** or rename production files
3. **Never deploy** directly to production without staging
4. **Never make** breaking changes to APIs
5. **Never remove** feature flags until 100% stable
6. **Never deploy** on Fridays or before holidays
7. **Never skip** the testing phase
8. **Never ignore** error rate increases
9. **Never deploy** without team notification
10. **Never assume** it works without testing

## Feature Flag Implementation

### Environment Variables
```bash
# .env.staging
VITE_FEATURE_NEW_HOME=true
VITE_FEATURE_ENHANCED_UPLOAD=true
VITE_FEATURE_ANALYTICS=true

# .env.production (initially)
VITE_FEATURE_NEW_HOME=false
VITE_FEATURE_ENHANCED_UPLOAD=false
VITE_FEATURE_ANALYTICS=false
```

### Feature Flag Hook
```typescript
// src/hooks/useFeatureFlag.ts
export function useFeatureFlag(flag: string): boolean {
  const flags = {
    NEW_HOME_DASHBOARD: import.meta.env.VITE_FEATURE_NEW_HOME === 'true',
    ENHANCED_UPLOAD: import.meta.env.VITE_FEATURE_ENHANCED_UPLOAD === 'true',
    ANALYTICS_TRACKING: import.meta.env.VITE_FEATURE_ANALYTICS === 'true'
  };
  
  return flags[flag] || false;
}
```

### Usage in Components
```jsx
// src/App.jsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import Home from '@/pages/Home'; // Old version
import HomeV2 from '@/pages/HomeV2'; // New version

function App() {
  const newHomeEnabled = useFeatureFlag('NEW_HOME_DASHBOARD');
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={newHomeEnabled ? <HomeV2 /> : <Home />} 
      />
    </Routes>
  );
}
```

## Deployment Workflow

### Step 1: Development
```bash
# Work on feature branch
git checkout -b feature/phase-1-home-dashboard

# Implement feature with feature flag
# Create NEW files (HomeV2.jsx, not modify Home.jsx)

# Test locally
npm run dev

# Commit changes
git add .
git commit -m "feat: add personalized home dashboard (behind feature flag)"
git push origin feature/phase-1-home-dashboard
```

### Step 2: Staging Deployment
```bash
# Merge to staging branch
git checkout staging
git merge feature/phase-1-home-dashboard

# Deploy to staging (Vercel/Netlify)
# Staging env vars have feature flags enabled

# Test on staging for 48+ hours
# - Manual testing
# - Automated tests
# - Performance testing
# - Mobile testing
```

### Step 3: Production Deployment (Gradual)
```bash
# Merge to main
git checkout main
git merge staging

# Tag release
git tag -a v1.1.0 -m "Phase 1: Home Dashboard"
git push origin v1.1.0

# Deploy to production
# Feature flags are OFF initially

# Enable for 10% of users
# Update env var: VITE_FEATURE_NEW_HOME=true
# Or use A/B testing tool (e.g., LaunchDarkly)

# Monitor for 24-48 hours
# - Error rates
# - Performance metrics
# - User feedback

# If stable, increase to 50%
# Monitor for 24-48 hours

# If stable, increase to 100%
# Monitor for 1 week

# If all good, remove feature flag in next release
```

## Rollback Procedures

### Immediate Rollback (< 5 minutes)
```bash
# Option 1: Disable feature flag
# Update env var in Vercel/Netlify dashboard
VITE_FEATURE_NEW_HOME=false

# Trigger redeploy
# Or use instant env var update if supported

# Option 2: Revert deployment
# Vercel: Click "Rollback" in dashboard
# Netlify: Deploy previous version

# Option 3: Git revert
git revert HEAD
git push origin main
# Trigger automatic deployment
```

### Database Rollback
```bash
# If database migrations were applied
npm run migrate:down

# Or manually run down migration
psql $DATABASE_URL -f migrations/down/001_add_user_stats.sql
```

## Monitoring & Alerts

### Key Metrics to Monitor
```typescript
// Error Rate
- Target: < 0.1%
- Alert: > 1%
- Rollback: > 5%

// Page Load Time
- Target: < 3s
- Alert: > 5s
- Rollback: > 10s

// Conversion Rate
- Baseline: 2.5%
- Alert: < 2.0% (20% drop)
- Rollback: < 1.5% (40% drop)

// User Engagement
- Baseline: 3.2/10
- Target: 5.0/10
- Alert: < 3.0/10
```

### Monitoring Tools
```typescript
// Sentry for errors
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Filter sensitive data
    return event;
  }
});

// Google Analytics for metrics
gtag('event', 'page_load_time', {
  value: loadTime,
  page: window.location.pathname
});

// Custom monitoring
fetch('/api/metrics', {
  method: 'POST',
  body: JSON.stringify({
    metric: 'feature_usage',
    feature: 'new_home_dashboard',
    value: 1
  })
});
```

## Testing Checklist

### Before Staging Deployment
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Property-based tests pass (100 runs)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Lighthouse score > 90
- [ ] Works on Chrome, Safari, Firefox
- [ ] Works on mobile (iOS, Android)
- [ ] Accessibility audit passes (axe)
- [ ] Feature flag works (on/off)

### Before Production Deployment
- [ ] Staging has been stable for 48+ hours
- [ ] No critical bugs reported
- [ ] Performance metrics are good
- [ ] User feedback is positive
- [ ] Rollback plan is documented
- [ ] Team is notified
- [ ] Monitoring alerts are configured
- [ ] Feature flag is configured
- [ ] Database migrations are tested
- [ ] Backup is created

### After Production Deployment
- [ ] Monitor error rates (first 1 hour)
- [ ] Monitor performance (first 1 hour)
- [ ] Check user feedback (first 24 hours)
- [ ] Verify analytics tracking (first 24 hours)
- [ ] Review metrics (after 1 week)
- [ ] Decide on full rollout or rollback

## Communication Plan

### Before Deployment
```
Team Slack/Email:
"🚀 Deploying Phase 1 - Home Dashboard to staging
- Feature: Personalized home dashboard
- Timeline: Testing for 48 hours
- Staging URL: https://staging.mimicheck.ai
- Please test and report any issues"
```

### During Gradual Rollout
```
Team Slack/Email:
"📊 Phase 1 - Home Dashboard rollout update
- Currently: 10% of users
- Error rate: 0.05% ✅
- Performance: 2.8s avg load time ✅
- User feedback: Positive ✅
- Next step: Increase to 50% in 24 hours"
```

### After Full Rollout
```
Team Slack/Email:
"✅ Phase 1 - Home Dashboard fully rolled out
- 100% of users now have new dashboard
- Error rate: 0.03% ✅
- User engagement: +45% ✅
- Conversion rate: +65% ✅
- Feature flag will be removed in next release"
```

## Emergency Contacts

### On-Call Rotation
- **Primary**: [Developer Name] - [Phone/Slack]
- **Secondary**: [Developer Name] - [Phone/Slack]
- **Manager**: [Manager Name] - [Phone/Slack]

### Escalation Path
1. Developer notices issue → Rollback immediately
2. Notify team in Slack #incidents channel
3. If rollback doesn't fix → Call on-call engineer
4. If critical → Escalate to manager
5. Post-mortem within 24 hours

## Post-Deployment Review

### After 1 Week
- [ ] Review all metrics
- [ ] Analyze user feedback
- [ ] Document lessons learned
- [ ] Update this guide with improvements
- [ ] Plan next phase

### Success Criteria
- ✅ Error rate < 0.1%
- ✅ User engagement +30%
- ✅ Conversion rate +50%
- ✅ User satisfaction > 4.5/5
- ✅ No critical bugs
- ✅ Performance maintained

## Lessons Learned Template

```markdown
# Post-Deployment Review - Phase 1

## What Went Well
- 

## What Could Be Improved
- 

## Action Items
- 

## Metrics
- Error rate: 
- Performance: 
- User engagement: 
- Conversion rate: 

## Next Steps
- 
```

---

**Remember**: When in doubt, DON'T deploy. It's better to delay than to break production! 🛡️
