# Testing Guide - Phase 1 Home Dashboard

## Quick Start

```bash
# 1. Start the development server
npm run dev

# 2. Open browser
# http://localhost:8005

# 3. Login with your test account
```

---

## Test Checklist

### ✅ Visual Tests

#### 1. Personalized Welcome
- [ ] Greeting shows correct time-based message (Guten Morgen/Tag/Abend)
- [ ] User's first name displays correctly
- [ ] Subtitle "Hier ist deine Übersicht für heute" visible

#### 2. Stats Cards (4 cards)
- [ ] **Dokumente** card shows correct count
- [ ] **Einsparpotential** card shows total savings in €
- [ ] **Analysen** card shows completed analyses count
- [ ] **Offene Aufgaben** card shows pending tasks count
- [ ] All cards have icons (FileText, Euro, CheckCircle, Clock)
- [ ] Trend indicators show appropriate text
- [ ] Cards have hover animation (scale + lift)

#### 3. Quick Actions (3 cards)
- [ ] **Neues Dokument** card visible with Upload icon
- [ ] **Meine Dokumente** card visible with FileSearch icon
- [ ] **Berichte** card visible with BarChart3 icon
- [ ] All cards have gradient backgrounds
- [ ] Hover animation works (scale + lift)
- [ ] Arrow icon animates on hover (slides right)

#### 4. Recent Activity Feed
- [ ] Shows last 5 activities (if user has activities)
- [ ] Each activity has icon, title, description, timestamp
- [ ] Timestamps show relative time in German (e.g., "vor 2 Stunden")
- [ ] Empty state shows if no activities ("Noch keine Aktivitäten")

#### 5. Onboarding Tips (New Users Only)
- [ ] Shows only when user has 0 documents
- [ ] Displays 3 tips with icons
- [ ] "Jetzt starten" button navigates to /upload
- [ ] Can be dismissed with X button
- [ ] Doesn't show again after dismissal (session-based)

---

### ✅ Responsive Tests

#### Mobile (< 768px)
- [ ] Stats cards stack vertically (1 column)
- [ ] Quick action cards stack vertically
- [ ] All text is readable without zooming
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scrolling

#### Tablet (768px - 1024px)
- [ ] Stats cards display in 2x2 grid
- [ ] Quick action cards display in 1 column or 2 columns
- [ ] Layout looks balanced

#### Desktop (> 1024px)
- [ ] Stats cards display in 1x4 row
- [ ] Quick action cards display in 1x3 row
- [ ] Maximum width container (max-w-7xl)
- [ ] Proper spacing and padding

---

### ✅ Functional Tests

#### 1. Data Fetching
- [ ] Stats load correctly from Supabase
- [ ] Loading skeletons show while fetching
- [ ] Error state shows if fetch fails
- [ ] Data updates when navigating away and back

#### 2. Navigation
- [ ] Quick action cards navigate to correct pages:
  - Neues Dokument → `/upload`
  - Meine Dokumente → `/abrechnungen`
  - Berichte → `/bericht`
- [ ] Onboarding "Jetzt starten" button → `/upload`

#### 3. Feature Flag
- [ ] With `VITE_FEATURE_NEW_HOME=true`: HomeV2 renders
- [ ] With `VITE_FEATURE_NEW_HOME=false`: Old Home renders
- [ ] No errors in console when switching

#### 4. Authentication
- [ ] Redirects to login if not authenticated
- [ ] Shows correct user data when authenticated
- [ ] Handles missing user data gracefully

---

### ✅ Performance Tests

#### 1. Load Time
- [ ] Page loads in < 3 seconds
- [ ] No layout shift (CLS)
- [ ] Smooth animations (60fps)

#### 2. Caching
- [ ] Stats data cached for 5 minutes
- [ ] No unnecessary refetches
- [ ] Background refetch works

#### 3. Bundle Size
- [ ] No significant increase in bundle size
- [ ] Code splitting works (lazy loading)

---

### ✅ Accessibility Tests

#### 1. Keyboard Navigation
- [ ] All interactive elements focusable with Tab
- [ ] Focus indicators visible (ring)
- [ ] Logical tab order

#### 2. Screen Reader
- [ ] All images have alt text
- [ ] All buttons have descriptive labels
- [ ] ARIA labels on stat cards
- [ ] Semantic HTML structure

#### 3. Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Icons have sufficient contrast
- [ ] Focus indicators visible

---

## Test Scenarios

### Scenario 1: New User (First Login)
**Setup**: User with 0 documents, 0 analyses

**Expected**:
1. Welcome message with user name
2. OnboardingTips component visible
3. Stats cards all show 0
4. Quick actions visible
5. No recent activity section
6. "Jetzt starten" button prominent

**Test**:
```bash
# Create test user or use existing user with no data
# Login and navigate to /
```

---

### Scenario 2: Active User
**Setup**: User with 5+ documents, 2+ analyses, €127.50 savings

**Expected**:
1. Welcome message with user name
2. No onboarding tips
3. Stats cards show real data:
   - Dokumente: 5
   - Einsparpotential: 127.5€
   - Analysen: 2
   - Offene Aufgaben: 1
4. Quick actions visible
5. Recent activity shows last 5 activities

**Test**:
```bash
# Use existing user with data
# Login and navigate to /
```

---

### Scenario 3: Loading State
**Setup**: Slow network or large dataset

**Expected**:
1. Welcome message shows immediately
2. Skeleton loaders for stats cards
3. Skeleton loaders for activity feed
4. No layout shift when data loads

**Test**:
```bash
# Throttle network in DevTools (Slow 3G)
# Refresh page
```

---

### Scenario 4: Error State
**Setup**: Supabase connection error

**Expected**:
1. Welcome message shows
2. Error message for stats: "Statistiken konnten nicht geladen werden"
3. Error message for activity: "Aktivitäten konnten nicht geladen werden"
4. No app crash

**Test**:
```bash
# Temporarily break Supabase connection
# Or use invalid Supabase URL in .env
```

---

### Scenario 5: Feature Flag Toggle
**Setup**: Toggle feature flag

**Expected**:
1. With flag ON: HomeV2 renders
2. With flag OFF: Old Home renders
3. No errors in console
4. Smooth transition

**Test**:
```bash
# 1. Set VITE_FEATURE_NEW_HOME=true
# 2. npm run dev
# 3. Verify HomeV2 renders
# 4. Stop server
# 5. Set VITE_FEATURE_NEW_HOME=false
# 6. npm run dev
# 7. Verify old Home renders
```

---

## Browser Compatibility

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)

---

## Console Checks

### No Errors
- [ ] No React errors
- [ ] No Supabase errors
- [ ] No routing errors
- [ ] No missing dependency warnings

### Expected Warnings (OK)
- React Query devtools messages (development only)
- Framer Motion warnings (if any)

---

## Lighthouse Audit

Run Lighthouse in Chrome DevTools:

```bash
# Target scores:
Performance: > 90
Accessibility: > 95
Best Practices: > 90
SEO: > 90
```

### Key Metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

---

## Database Verification

### Check Data in Supabase

```sql
-- 1. Verify user exists
SELECT * FROM users WHERE id = 'YOUR_USER_ID';

-- 2. Check documents count
SELECT COUNT(*) FROM documents WHERE user_id = 'YOUR_USER_ID';

-- 3. Check applications (analyses)
SELECT * FROM applications WHERE user_id = 'YOUR_USER_ID';

-- 4. Verify savings calculation
SELECT 
  SUM(rueckforderung_potential) as total_savings,
  COUNT(*) FILTER (WHERE status IN ('abgeschlossen', 'approved')) as analyses_count,
  COUNT(*) FILTER (WHERE status IN ('draft', 'in_bearbeitung', 'processing')) as pending_tasks
FROM applications 
WHERE user_id = 'YOUR_USER_ID';
```

---

## Common Issues & Solutions

### Issue 1: Stats not loading
**Symptom**: Skeleton loaders forever  
**Solution**: Check Supabase connection, verify user_id

### Issue 2: Feature flag not working
**Symptom**: Old Home still shows  
**Solution**: Restart dev server after changing .env

### Issue 3: Animations laggy
**Symptom**: Choppy hover effects  
**Solution**: Check GPU acceleration, reduce motion in browser settings

### Issue 4: Onboarding tips not showing
**Symptom**: Tips don't appear for new user  
**Solution**: Verify documents_count === 0, clear session storage

---

## Success Criteria

### Must Pass
- ✅ All visual elements render correctly
- ✅ All navigation works
- ✅ Data loads from Supabase
- ✅ Responsive on all screen sizes
- ✅ No console errors
- ✅ Feature flag works

### Should Pass
- ✅ Lighthouse score > 90
- ✅ Smooth animations (60fps)
- ✅ Accessible (WCAG AA)
- ✅ Fast load time (< 3s)

### Nice to Have
- ✅ Perfect Lighthouse score (100)
- ✅ Sub-second load time
- ✅ Zero layout shift

---

## Reporting Issues

If you find issues, report them with:

1. **Description**: What's wrong?
2. **Steps to reproduce**: How to trigger the issue?
3. **Expected behavior**: What should happen?
4. **Actual behavior**: What actually happens?
5. **Screenshots**: Visual proof
6. **Browser/Device**: Where did it happen?
7. **Console errors**: Any error messages?

---

## Next Steps After Testing

1. ✅ Fix any issues found
2. ✅ Get user feedback
3. ✅ Iterate on design
4. ✅ Prepare for staging deployment
5. ✅ Plan Phase 1.3 (Notifications)

---

**Happy Testing! 🧪**
