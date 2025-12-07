# Deployment Guide - Phase 1 Dashboard

## 🚀 Status: Ready for Staging Deployment

**Branch**: `staging/phase-1-dashboard`  
**GitHub**: https://github.com/MimiTechAi/MimiCheckAi/pull/new/staging/phase-1-dashboard  
**Date**: December 7, 2025

---

## ✅ Pre-Deployment Checklist

- [x] Code committed to staging branch
- [x] ESLint errors fixed
- [x] All tests passing locally
- [x] Feature flag system implemented
- [x] Production .env with flags OFF
- [x] Documentation complete
- [ ] Create Pull Request on GitHub
- [ ] Deploy to Vercel staging
- [ ] Test on staging for 48+ hours
- [ ] Get team approval
- [ ] Merge to main with flags OFF

---

## 📋 Deployment Steps

### Step 1: Create Pull Request

1. Go to: https://github.com/MimiTechAi/MimiCheckAi/pull/new/staging/phase-1-dashboard
2. Title: `feat: Phase 1 - Personalized Dashboard (behind feature flag)`
3. Description:
```markdown
## 🎯 What's New

This PR introduces a personalized home dashboard for the core app, safely behind a feature flag.

### ✨ Features
- Personalized greeting with time-based messages (Guten Morgen/Tag/Abend)
- User statistics cards (documents, savings, analyses, tasks)
- Quick action cards for common workflows
- Recent activity timeline
- Onboarding tips for new users

### 🏗️ Infrastructure
- React Query for data fetching & caching
- Feature flag system for safe rollout
- Toast notification infrastructure
- Custom hooks for auth and stats

### 🔒 Production Safety
- Feature flag: `VITE_FEATURE_NEW_HOME` (OFF in production)
- Old Home.jsx preserved (zero modifications)
- Conditional routing based on flag
- No breaking changes

### 📦 Dependencies Added
- `@tanstack/react-query@5.90.12`
- `react-dropzone@14.3.8` (for Phase 1.4)

### 🧪 Testing
- Complete testing guide in `.kiro/specs/phase-1-ux-improvements/TESTING_GUIDE.md`
- Test scenarios for new users, existing users, loading states, errors
- Responsive design tested (mobile, tablet, desktop)

### 📝 Documentation
- Requirements: `.kiro/specs/phase-1-ux-improvements/requirements.md`
- Design: `.kiro/specs/phase-1-ux-improvements/design.md`
- Tasks: `.kiro/specs/phase-1-ux-improvements/tasks.md`
- Implementation Status: `.kiro/specs/phase-1-ux-improvements/IMPLEMENTATION_STATUS.md`
- Production Safety: `.kiro/specs/phase-1-ux-improvements/PRODUCTION_SAFETY.md`

### 🎯 Next Steps
1. Deploy to Vercel staging
2. Test for 48+ hours
3. Get team approval
4. Merge to main with feature flag OFF
5. Gradual rollout: 10% → 50% → 100%
```

4. Assign reviewers
5. Add labels: `enhancement`, `feature-flag`, `phase-1`

---

### Step 2: Deploy to Vercel Staging

#### Option A: Automatic Deployment (Recommended)
Vercel will automatically create a preview deployment when you push to the branch.

1. Check Vercel dashboard for preview URL
2. URL format: `https://mimicheck-[hash]-mimitech.vercel.app`
3. Wait for deployment to complete (~2-3 minutes)

#### Option B: Manual Deployment
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to staging
vercel --prod=false

# Follow prompts:
# - Link to existing project: Yes
# - Project name: mimicheck
# - Deploy to production: No
```

---

### Step 3: Configure Environment Variables on Vercel

**CRITICAL**: Set environment variables on Vercel before testing!

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add for **Preview** environment:
   ```
   VITE_FEATURE_NEW_HOME=true
   VITE_FEATURE_ENHANCED_UPLOAD=false
   VITE_FEATURE_ANALYTICS=false
   ```
3. Add for **Production** environment:
   ```
   VITE_FEATURE_NEW_HOME=false
   VITE_FEATURE_ENHANCED_UPLOAD=false
   VITE_FEATURE_ANALYTICS=false
   ```
4. Redeploy after adding variables

---

### Step 4: Test on Staging

Use the testing guide: `.kiro/specs/phase-1-ux-improvements/TESTING_GUIDE.md`

**Test Scenarios**:
1. ✅ New user (0 documents) - see onboarding tips
2. ✅ Existing user - see real stats
3. ✅ Mobile responsive (< 768px)
4. ✅ Tablet responsive (768px - 1024px)
5. ✅ Desktop responsive (> 1024px)
6. ✅ All navigation links work
7. ✅ Data loads from Supabase
8. ✅ Loading states show correctly
9. ✅ Error states handled gracefully
10. ✅ Feature flag toggle works

**Browsers to Test**:
- Chrome (Desktop + Mobile)
- Safari (Desktop + iOS)
- Firefox (Desktop)
- Edge (Desktop)

**Test Duration**: Minimum 48 hours

---

### Step 5: Monitor Metrics

Track these metrics during staging:

**Performance**:
- Page load time (target: < 3s)
- Time to Interactive (target: < 3.5s)
- Cumulative Layout Shift (target: < 0.1)
- Lighthouse score (target: > 90)

**Functionality**:
- Stats loading success rate
- Navigation click-through rate
- Error rate
- User engagement

**Tools**:
- Vercel Analytics
- Supabase Dashboard (query performance)
- Browser DevTools (Network, Performance)
- Lighthouse CI

---

### Step 6: Get Team Approval

**Approval Checklist**:
- [ ] All test scenarios pass
- [ ] No console errors
- [ ] Performance metrics meet targets
- [ ] Responsive design works on all devices
- [ ] Team members have tested
- [ ] Product owner approves
- [ ] No critical bugs found

**Approval Process**:
1. Share staging URL with team
2. Collect feedback in GitHub PR
3. Fix any issues found
4. Re-test after fixes
5. Get final approval from product owner

---

### Step 7: Merge to Main

**IMPORTANT**: Merge with feature flag OFF!

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge staging branch
git merge staging/phase-1-dashboard

# Verify .env.production has flags OFF
cat .env.production
# Should show: VITE_FEATURE_NEW_HOME=false

# Push to main
git push origin main
```

**Vercel will automatically deploy to production.**

---

### Step 8: Verify Production Deployment

1. Go to https://app.mimicheck.ai
2. Verify OLD Home.jsx is showing (dark theme with hero)
3. Check console for errors (should be none)
4. Verify no breaking changes
5. Test critical user flows:
   - Login
   - Upload document
   - View documents
   - View reports

**Expected Behavior**:
- Old Home page shows for all users
- New HomeV2 is deployed but not active
- Feature flag is OFF
- Zero user impact

---

### Step 9: Gradual Rollout

**Day 1: 10% Rollout**

1. Update Vercel environment variable:
   ```
   VITE_FEATURE_NEW_HOME=true
   ```
   But only for 10% of users (use Vercel's percentage rollout or custom logic)

2. Monitor metrics:
   - Error rate
   - Page load time
   - User engagement
   - Support tickets

3. If issues: Rollback immediately (set flag to false)

**Day 3: 50% Rollout** (if Day 1 successful)

1. Increase to 50% of users
2. Continue monitoring
3. Collect user feedback

**Day 7: 100% Rollout** (if Day 3 successful)

1. Enable for all users:
   ```
   VITE_FEATURE_NEW_HOME=true
   ```
2. Monitor for 24 hours
3. If stable: Consider removing feature flag in future release

---

## 🚨 Rollback Plan

If issues are found at any stage:

### Immediate Rollback (< 5 minutes)

**Option 1: Feature Flag (Fastest)**
```bash
# On Vercel Dashboard:
# Environment Variables → Production
# Set: VITE_FEATURE_NEW_HOME=false
# Redeploy (takes ~2 minutes)
```

**Option 2: Git Revert**
```bash
# Find the merge commit
git log --oneline

# Revert the merge
git revert -m 1 <merge-commit-hash>

# Push to main
git push origin main

# Vercel auto-deploys (takes ~3 minutes)
```

**Option 3: Vercel Instant Rollback**
```bash
# On Vercel Dashboard:
# Deployments → Find previous stable deployment
# Click "..." → "Promote to Production"
# Takes ~1 minute
```

---

## 📊 Success Criteria

### Must Have (Blocking)
- ✅ Zero console errors
- ✅ All navigation works
- ✅ Data loads from Supabase
- ✅ Responsive on all devices
- ✅ Feature flag works correctly
- ✅ No breaking changes to existing features

### Should Have (Important)
- ✅ Lighthouse score > 90
- ✅ Page load < 3 seconds
- ✅ Smooth animations (60fps)
- ✅ Accessible (WCAG AA)
- ✅ User feedback positive

### Nice to Have (Optional)
- ✅ Perfect Lighthouse score (100)
- ✅ Sub-second load time
- ✅ Zero layout shift
- ✅ Advanced analytics tracking

---

## 📝 Post-Deployment Tasks

After successful 100% rollout:

1. **Update Documentation**
   - Mark Phase 1.1 & 1.2 as complete
   - Document lessons learned
   - Update user guides

2. **Clean Up**
   - Remove old Home.jsx (after 2 weeks of stability)
   - Remove feature flag code (after 1 month)
   - Archive staging branch

3. **Plan Next Phase**
   - Phase 1.3: Toast notifications integration
   - Phase 1.4: Enhanced upload experience
   - Phase 1.5: Analytics integration

4. **Celebrate! 🎉**
   - Share success with team
   - Collect user testimonials
   - Plan improvements based on feedback

---

## 🔗 Useful Links

- **GitHub PR**: https://github.com/MimiTechAi/MimiCheckAi/pull/new/staging/phase-1-dashboard
- **Vercel Dashboard**: https://vercel.com/mimitech/mimicheck
- **Production Site**: https://app.mimicheck.ai
- **Staging Branch**: `staging/phase-1-dashboard`
- **Spec Directory**: `.kiro/specs/phase-1-ux-improvements/`

---

## 📞 Support

If you encounter issues during deployment:

1. Check `.kiro/specs/phase-1-ux-improvements/PRODUCTION_SAFETY.md`
2. Review `.kiro/specs/phase-1-ux-improvements/TESTING_GUIDE.md`
3. Check Vercel deployment logs
4. Check Supabase logs
5. Contact team lead

---

**Deployment prepared by**: Kiro AI  
**Date**: December 7, 2025  
**Status**: ✅ Ready for staging deployment

**Next Action**: Create Pull Request on GitHub 🚀
