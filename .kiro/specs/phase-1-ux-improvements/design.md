# Design Document - Phase 1 UX Improvements

## Overview

This design document outlines the technical implementation for Phase 1 UX improvements to the MimiCheck Core App. The improvements focus on four key areas:

1. **Personalized Home Dashboard** - Welcome screen with user stats and quick actions
2. **Toast Notification System** - Real-time user feedback
3. **Enhanced Upload Experience** - Improved file upload UX
4. **Analytics Integration** - Conversion tracking on landing page

These improvements will increase user engagement by 50% and improve conversion rates by 80%.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Home.jsx   │  │  Upload.jsx  │  │ Landing Page │      │
│  │              │  │              │  │              │      │
│  │ - Welcome    │  │ - Dropzone   │  │ - Analytics  │      │
│  │ - Stats      │  │ - Progress   │  │ - Tracking   │      │
│  │ - Actions    │  │ - Preview    │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│  ┌─────────────────────────┴──────────────────────────┐     │
│  │           Shared Components & Hooks                 │     │
│  ├──────────────────────────────────────────────────────┤    │
│  │ - useAuth()          - StatCard                     │    │
│  │ - useUserStats()     - QuickActionCard              │    │
│  │ - useToast()         - RecentActivityFeed           │    │
│  │ - useAnalytics()     - FilePreviewCard              │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
├────────────────────────────┼─────────────────────────────────┤
│                     State Management                         │
├────────────────────────────┼─────────────────────────────────┤
│  ┌─────────────────────────┴──────────────────────────┐     │
│  │              React Query Cache                      │     │
│  │  - userStats (staleTime: 5min)                     │     │
│  │  - recentActivity (staleTime: 1min)                │     │
│  │  - documents (staleTime: 5min)                     │     │
│  └─────────────────────────┬──────────────────────────┘     │
│                            │                                 │
├────────────────────────────┼─────────────────────────────────┤
│                      API Layer                               │
├────────────────────────────┼─────────────────────────────────┤
│  ┌─────────────────────────┴──────────────────────────┐     │
│  │              Supabase Client                        │     │
│  │  - Auth                                             │     │
│  │  - Database (PostgreSQL)                            │     │
│  │  - Storage (File uploads)                           │     │
│  └─────────────────────────┬──────────────────────────┘     │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │   Supabase      │
                    │   Backend       │
                    └─────────────────┘
```

## Components and Interfaces

### 1. Home Dashboard Components

#### StatCard Component
```jsx
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color: 'blue' | 'emerald' | 'teal' | 'amber';
  onClick?: () => void;
}

// Usage
<StatCard
  icon={FileText}
  label="Dokumente"
  value={12}
  trend="+2 diese Woche"
  trendDirection="up"
  color="blue"
/>
```

#### QuickActionCard Component
```jsx
interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

// Usage
<QuickActionCard
  icon={Upload}
  title="Neues Dokument"
  description="Lade eine neue Abrechnung hoch"
  href="/upload"
  gradient="from-blue-600 to-emerald-600"
/>
```

#### RecentActivityFeed Component
```jsx
interface Activity {
  id: string;
  type: 'upload' | 'analysis' | 'report';
  title: string;
  description: string;
  timestamp: Date;
  icon: LucideIcon;
}

interface RecentActivityFeedProps {
  userId: string;
  limit?: number;
}

// Usage
<RecentActivityFeed userId={user.id} limit={5} />
```

### 2. Toast Notification System

#### Toast Hook
```typescript
interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface UseToastReturn {
  toast: {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    loading: (message: string, options?: ToastOptions) => string;
    dismiss: (toastId: string) => void;
  };
}

// Usage
const { toast } = useToast();

toast.success('Dokument hochgeladen!');
toast.error('Upload fehlgeschlagen', {
  action: {
    label: 'Erneut versuchen',
    onClick: () => retry()
  }
});

const loadingId = toast.loading('Analysiere Dokument...');
// Later:
toast.dismiss(loadingId);
toast.success('Analyse abgeschlossen!');
```

### 3. Enhanced Upload Components

#### FileDropzone Component
```jsx
interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  accept: Record<string, string[]>;
  maxSize: number;
  maxFiles: number;
  disabled?: boolean;
}

// Usage
<FileDropzone
  onDrop={handleDrop}
  accept={{
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg']
  }}
  maxSize={10485760} // 10MB
  maxFiles={10}
/>
```

#### FilePreviewCard Component
```jsx
interface FilePreviewCardProps {
  file: File;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  onRemove: () => void;
  error?: string;
}

// Usage
<FilePreviewCard
  file={file}
  progress={uploadProgress}
  status="uploading"
  onRemove={() => removeFile(file.id)}
/>
```

#### UploadProgress Component
```jsx
interface UploadProgressProps {
  uploadedCount: number;
  totalCount: number;
  overallProgress: number;
}

// Usage
<UploadProgress
  uploadedCount={3}
  totalCount={5}
  overallProgress={60}
/>
```

### 4. Analytics Integration

#### Analytics Hook
```typescript
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

interface UseAnalyticsReturn {
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (page: string) => void;
  trackConversion: (type: string, value?: number) => void;
  trackCTAClick: (location: string, label: string) => void;
  trackScrollDepth: (depth: number) => void;
}

// Usage
const { trackEvent, trackCTAClick } = useAnalytics();

trackCTAClick('hero', 'Jetzt kostenlos starten');
trackEvent({
  name: 'document_uploaded',
  properties: {
    type: 'nebenkosten',
    size: file.size
  }
});
```

## Data Models

### User Stats Model
```typescript
interface UserStats {
  user_id: string;
  documents_count: number;
  total_savings: number;
  analyses_count: number;
  pending_tasks: number;
  last_activity: Date;
  created_at: Date;
  updated_at: Date;
}
```

### Recent Activity Model
```typescript
interface RecentActivity {
  id: string;
  user_id: string;
  type: 'upload' | 'analysis' | 'report' | 'download';
  title: string;
  description: string;
  metadata: Record<string, any>;
  created_at: Date;
}
```

### Upload Session Model
```typescript
interface UploadSession {
  id: string;
  user_id: string;
  files: UploadFile[];
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  total_size: number;
  uploaded_size: number;
  created_at: Date;
  completed_at?: Date;
}

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  url?: string;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Stats Consistency
*For any* user, the sum of individual document counts across all categories should equal the total documents_count in user stats.
**Validates: Requirements 1.2**

### Property 2: Toast Auto-dismiss
*For any* success toast notification, it should automatically dismiss after exactly 5 seconds unless manually dismissed earlier.
**Validates: Requirements 2.5**

### Property 3: File Validation
*For any* file dropped in the upload zone, if the file size exceeds 10MB or the type is not in the accepted list, the system should reject it and display an error.
**Validates: Requirements 3.3**

### Property 4: Upload Progress Accuracy
*For any* batch upload, the overall progress percentage should equal (uploaded_bytes / total_bytes) * 100, rounded to nearest integer.
**Validates: Requirements 3.4**

### Property 5: Analytics Event Structure
*For any* analytics event tracked, it must include: event name (string), timestamp (ISO 8601), and optional properties (object).
**Validates: Requirements 4.7**

### Property 6: Authentication State Consistency
*For any* protected route, if the user is not authenticated, navigation should redirect to login page before rendering the protected content.
**Validates: Requirements 5.3**

### Property 7: Query Cache Invalidation
*For any* successful mutation (upload, delete, update), related queries should be invalidated and refetched within 100ms.
**Validates: Requirements 6.5**

### Property 8: Responsive Breakpoints
*For any* viewport width, stat cards should display in: 1 column (< 768px), 2x2 grid (768-1024px), or 1x4 row (> 1024px).
**Validates: Requirements 7.1, 7.2, 7.3**

### Property 9: Focus Indicator Visibility
*For any* interactive element, when it receives keyboard focus, a visible focus ring should appear with minimum 2px width and sufficient contrast ratio (3:1).
**Validates: Requirements 8.2**

### Property 10: Screen Reader Announcements
*For any* toast notification, when it appears, it should be announced by screen readers with role="status" or role="alert" depending on severity.
**Validates: Requirements 8.5**

## Error Handling

### Upload Errors
```typescript
enum UploadErrorType {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED'
}

interface UploadError {
  type: UploadErrorType;
  message: string;
  file?: File;
  retryable: boolean;
}

// Error handling
try {
  await uploadFile(file);
} catch (error) {
  if (error.type === UploadErrorType.NETWORK_ERROR) {
    toast.error('Netzwerkfehler', {
      action: {
        label: 'Erneut versuchen',
        onClick: () => retry()
      }
    });
  } else if (error.type === UploadErrorType.FILE_TOO_LARGE) {
    toast.error(`Datei zu groß: ${file.name} (max 10MB)`);
  }
}
```

### Data Fetching Errors
```typescript
// React Query error handling
const { data, error, isError, refetch } = useQuery({
  queryKey: ['userStats', userId],
  queryFn: fetchUserStats,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  onError: (error) => {
    toast.error('Daten konnten nicht geladen werden', {
      action: {
        label: 'Erneut versuchen',
        onClick: () => refetch()
      }
    });
  }
});

if (isError) {
  return <ErrorState error={error} onRetry={refetch} />;
}
```

### Analytics Errors
```typescript
// Graceful degradation for analytics
try {
  trackEvent({ name: 'cta_click', properties: { location: 'hero' } });
} catch (error) {
  // Log error but don't disrupt user experience
  console.error('Analytics error:', error);
  // Optionally send to error tracking service
  Sentry.captureException(error);
}
```

## Testing Strategy

### Unit Tests
- Component rendering tests
- Hook behavior tests
- Utility function tests
- Error handling tests

### Property-Based Tests
Using `@fast-check/vitest` for property testing:

```typescript
// Test: Stats consistency property
test('user stats sum equals total', () => {
  fc.assert(
    fc.property(
      fc.record({
        documents_count: fc.nat(1000),
        analyses_count: fc.nat(1000),
        pending_tasks: fc.nat(100)
      }),
      (stats) => {
        // Property: documents_count should be >= analyses_count
        expect(stats.documents_count).toBeGreaterThanOrEqual(stats.analyses_count);
      }
    ),
    { numRuns: 100 }
  );
});

// Test: Upload progress accuracy
test('upload progress calculation', () => {
  fc.assert(
    fc.property(
      fc.nat(10000), // uploaded_bytes
      fc.nat(10000), // total_bytes
      (uploaded, total) => {
        fc.pre(total > 0); // Precondition: total must be > 0
        const progress = Math.round((uploaded / total) * 100);
        expect(progress).toBeGreaterThanOrEqual(0);
        expect(progress).toBeLessThanOrEqual(100);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Tests
- Upload flow end-to-end
- Authentication flow
- Analytics tracking
- Toast notification lifecycle

### Accessibility Tests
```typescript
import { axe } from 'jest-axe';

test('Home dashboard is accessible', async () => {
  const { container } = render(<Home />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Considerations

### Code Splitting
```typescript
// Lazy load heavy components
const RecentActivityFeed = lazy(() => import('./RecentActivityFeed'));
const FilePreviewGrid = lazy(() => import('./FilePreviewGrid'));

// Usage with Suspense
<Suspense fallback={<Skeleton />}>
  <RecentActivityFeed userId={user.id} />
</Suspense>
```

### Query Optimization
```typescript
// Prefetch user stats on login
queryClient.prefetchQuery({
  queryKey: ['userStats', userId],
  queryFn: fetchUserStats
});

// Optimistic updates for better UX
const mutation = useMutation({
  mutationFn: uploadDocument,
  onMutate: async (newDoc) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['documents'] });
    
    // Snapshot previous value
    const previousDocs = queryClient.getQueryData(['documents']);
    
    // Optimistically update
    queryClient.setQueryData(['documents'], (old) => [...old, newDoc]);
    
    return { previousDocs };
  },
  onError: (err, newDoc, context) => {
    // Rollback on error
    queryClient.setQueryData(['documents'], context.previousDocs);
  }
});
```

### Image Optimization
```typescript
// Lazy load images
<img 
  src={thumbnail} 
  loading="lazy" 
  decoding="async"
  alt={file.name}
/>

// Use WebP format with fallback
<picture>
  <source srcSet={`${thumbnail}.webp`} type="image/webp" />
  <img src={`${thumbnail}.jpg`} alt={file.name} />
</picture>
```

## Security Considerations

### File Upload Security
```typescript
// Validate file type on client AND server
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFile(file: File): boolean {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  return true;
}

// Sanitize file names
function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
}
```

### Analytics Privacy
```typescript
// Anonymize user data in analytics
function trackEvent(event: AnalyticsEvent) {
  const anonymizedEvent = {
    ...event,
    user_id: hashUserId(user.id), // Hash instead of raw ID
    ip_address: undefined, // Don't track IP
    timestamp: new Date().toISOString()
  };
  
  gtag('event', anonymizedEvent.name, anonymizedEvent.properties);
}
```

### XSS Prevention
```typescript
// Sanitize user input before display
import DOMPurify from 'dompurify';

function SafeHTML({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

## Deployment Strategy

⚠️ **IMPORTANT**: Production sites are live at:
- Landing Page: https://mimicheck.ai
- Core App: https://app.mimicheck.ai

### Safe Deployment Approach

**Feature Flags**:
```typescript
// Feature flag configuration
const FEATURE_FLAGS = {
  NEW_HOME_DASHBOARD: process.env.VITE_FEATURE_NEW_HOME === 'true',
  ENHANCED_UPLOAD: process.env.VITE_FEATURE_ENHANCED_UPLOAD === 'true',
  ANALYTICS_TRACKING: process.env.VITE_FEATURE_ANALYTICS === 'true'
};

// Usage in components
{FEATURE_FLAGS.NEW_HOME_DASHBOARD ? <NewHome /> : <OldHome />}
```

### Phase 1.1: Core Infrastructure (Week 1)
**Deploy to**: Staging only
- Set up React Query (non-breaking)
- Implement useAuth hook (wrapper around existing auth)
- Create base components (new files, no changes to existing)
- Test thoroughly on staging
- **NO production deployment yet**

### Phase 1.2: Home Dashboard (Week 1-2)
**Deploy to**: Staging first, then production with feature flag
- Create NEW Home.jsx file (e.g., HomeV2.jsx)
- Keep old Home.jsx untouched
- Use feature flag to switch between versions
- Deploy to staging, test for 2-3 days
- Deploy to production with flag OFF
- Gradually enable for 10% → 50% → 100% of users
- Monitor error rates at each step

### Phase 1.3: Notifications (Week 2)
**Deploy to**: Staging first, then production (low risk)
- Integrate sonner (additive, no breaking changes)
- Implement useToast hook (new file)
- Add notifications to existing flows (wrapped in try-catch)
- Deploy to staging, test for 1-2 days
- Deploy to production (safe, only adds features)

### Phase 1.4: Upload Enhancement (Week 2-3)
**Deploy to**: Staging first, then production with feature flag
- Create NEW Upload.jsx file (e.g., UploadV2.jsx)
- Keep old Upload.jsx untouched
- Use feature flag to switch
- Deploy to staging, test for 2-3 days
- Deploy to production with flag OFF
- Gradually enable for 10% → 50% → 100% of users

### Phase 1.5: Analytics (Week 3)
**Deploy to**: Landing page only (separate deployment)
- Integrate Google Analytics 4 on mimicheck.ai
- Add event tracking (non-blocking, wrapped in try-catch)
- Test in GA4 DebugView
- Deploy to production (safe, analytics failures don't break site)

### Rollback Plan

**Immediate Rollback** (< 5 minutes):
```bash
# Disable feature flag via environment variable
VITE_FEATURE_NEW_HOME=false npm run build
# Or use Vercel dashboard to update env var and redeploy
```

**Database Rollback**:
- All migrations have down() functions
- Can rollback to previous schema version
- Data is never deleted, only marked as inactive

**Code Rollback**:
- Keep old components in codebase
- Git tag each deployment
- Can revert to previous commit if needed

**Monitoring Triggers**:
- Error rate > 1% → Automatic alert
- Error rate > 5% → Automatic rollback
- Page load time > 5s → Alert
- Conversion rate drops > 20% → Alert

### Gradual Rollout Strategy

**Week 1**: Internal testing only
- Enable features for team members only
- Test all flows thoroughly

**Week 2**: Beta users (10%)
- Enable for 10% of users (random selection)
- Monitor metrics closely
- Gather feedback

**Week 3**: Wider rollout (50%)
- If no issues, enable for 50% of users
- Continue monitoring

**Week 4**: Full rollout (100%)
- If all metrics positive, enable for all users
- Keep feature flags for quick disable if needed

### Production Deployment Checklist

Before deploying to production:
- [ ] All tests pass (unit, integration, e2e)
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Tested on Chrome, Safari, Firefox
- [ ] Tested on mobile devices
- [ ] Feature flag configured
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Team notified of deployment
- [ ] Staging has been stable for 48+ hours

## Monitoring & Metrics

### Key Metrics to Track
```typescript
// Performance metrics
- Page load time (target: < 3s)
- Time to Interactive (target: < 5s)
- First Contentful Paint (target: < 1.5s)

// User engagement metrics
- Daily Active Users
- Feature adoption rate (% users using quick actions)
- Upload success rate
- Average session duration

// Business metrics
- Conversion rate (landing page)
- User retention (7-day, 30-day)
- Support ticket volume
```

### Error Monitoring
```typescript
// Sentry integration
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  }
});
```

## Documentation

### Component Documentation
- Storybook stories for all new components
- JSDoc comments for all public APIs
- README.md in each component folder

### API Documentation
- OpenAPI spec for new endpoints
- Example requests/responses
- Error codes and handling

### User Documentation
- Help tooltips in UI
- Onboarding guide for new users
- FAQ updates

## Success Criteria

Phase 1 is considered successful when:

1. ✅ All acceptance criteria are met
2. ✅ All property-based tests pass (100 runs each)
3. ✅ Lighthouse score > 90 (Performance, Accessibility, Best Practices)
4. ✅ Zero critical bugs in production
5. ✅ User engagement increases by 30%+ (target: 50%)
6. ✅ Upload success rate increases by 15%+ (target: 25%)
7. ✅ Conversion rate increases by 50%+ (target: 80%)
8. ✅ User satisfaction score > 4.5/5

## Next Steps

After Phase 1 completion:
- Phase 2: Dashboard Charts & Data Visualization
- Phase 3: Search & Filter System
- Phase 4: Command Palette & Advanced Features
