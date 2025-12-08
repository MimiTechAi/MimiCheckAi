# TypeScript Migration Priority List
**Generated:** 2025-12-08
**Task:** 10.2 Prioritize files for TypeScript migration

## Migration Strategy

Files are prioritized based on:
1. **Impact:** How critical is type safety for this file?
2. **Dependencies:** How many other files depend on this?
3. **Complexity:** How difficult is the migration?
4. **Risk:** What's the risk of runtime errors without types?

## Priority Levels

### 🔴 CRITICAL PRIORITY (Phase 1)
**Goal:** Prevent runtime errors in core infrastructure
**Estimated Time:** 16-20 hours

#### 1. API Clients (10 files)
These are the foundation - all data flows through here.

**Order:**
1. `src/api/supabaseClient.js` ⭐ **START HERE**
   - Core database client
   - Used by everything
   - Environment variable validation
   - Auth configuration

2. `src/api/entities.js`
   - Entity exports
   - Type definitions for all data models
   - Simple re-exports

3. `src/api/supabaseEntities.js`
   - Supabase table operations
   - CRUD operations
   - Query builders

4. `src/api/mimitechClient.js`
   - Main API client
   - Integrates all entities
   - Function invocations

5. `src/api/functions.js`
   - Edge function calls
   - API endpoints

6. `src/api/integrations.js`
   - External integrations
   - File uploads
   - Document extraction

7. `src/api/localClient.js`
   - Local development client
   - Fallback logic

8. `src/api/base44Client.js`
   - Base44 integration
   - External API

9. `src/api/pdfFillService.js`
   - PDF generation
   - Form filling

10. `src/api/contact.js`
    - Contact form API
    - Email sending

**Why Critical:**
- All data flows through these files
- Type errors here cause runtime crashes
- Supabase can generate types from database schema
- Prevents "undefined is not a function" errors

#### 2. Core Utilities (6 files)
Used throughout the entire application.

**Order:**
1. `src/utils/errorHandler.js` ⭐
   - Error handling logic
   - Used everywhere
   - Type safety prevents silent failures

2. `src/utils/apiClient.js`
   - HTTP client wrapper
   - Request/response types

3. `src/utils/logger.js`
   - Logging utility
   - Type-safe log levels

4. `src/utils/index.js`
   - Utility exports
   - Helper functions

5. `src/utils/accessibility.js`
   - A11y helpers
   - ARIA utilities

6. `src/utils/aiProfileHelper.js`
   - AI profile logic
   - Data transformations

**Why Critical:**
- Used in 50+ files
- Bugs here affect entire app
- Type safety prevents cascading errors

### 🟡 HIGH PRIORITY (Phase 2)
**Goal:** Type safety for business logic
**Estimated Time:** 12-16 hours

#### 3. Services (4 files)
Business logic layer - critical for data integrity.

**Order:**
1. `src/services/AntragsService.js` ⭐
   - Application logic
   - Core business rules
   - Data validation

2. `src/services/PdfFillService.js`
   - PDF generation
   - Form data mapping

3. `src/services/PdfParserService.js`
   - PDF parsing
   - Data extraction

4. `src/services/sota-scanner.js`
   - Document scanning
   - OCR integration

**Why High Priority:**
- Business logic errors are expensive
- Data integrity is critical
- Complex data transformations

#### 4. Library Files (4 files)
Shared utilities and configurations.

**Order:**
1. `src/lib/utils.js` ⭐
   - Already has validation.ts
   - Core utility functions
   - Used everywhere

2. `src/lib/queryClient.js`
   - React Query config
   - Cache management

3. `src/lib/abrechnungenUtils.js`
   - Billing utilities
   - Calculations

4. `src/lib/__tests__/abrechnungenUtils.test.js`
   - Test file (migrate with main file)

**Why High Priority:**
- Used across many components
- Utility functions need type safety
- Prevents prop drilling errors

### 🟢 MEDIUM PRIORITY (Phase 3)
**Goal:** Type safety for React infrastructure
**Estimated Time:** 8-12 hours

#### 5. Hooks (6 files)
Custom React hooks - improve DX significantly.

**Order:**
1. `src/hooks/useAuth.js` ⭐
   - Authentication hook
   - User state management
   - Most critical hook

2. `src/hooks/useToast.js`
   - Toast notifications
   - UI feedback

3. `src/hooks/useUserStats.js`
   - User statistics
   - Data fetching

4. `src/hooks/useFeatureFlag.js`
   - Feature flags
   - A/B testing

5. `src/hooks/useMediaQuery.js`
   - Responsive design
   - Breakpoint detection

6. `src/hooks/use-mobile.jsx`
   - Mobile detection
   - Device-specific logic

**Why Medium Priority:**
- Improves developer experience
- Type-safe hooks prevent prop errors
- IntelliSense for hook returns

#### 6. Routes (1 file)
Route configuration and protection.

**Order:**
1. `src/routes/ProtectedRoute.jsx` ⭐
   - Auth guard
   - Route protection
   - Session validation

**Why Medium Priority:**
- Security-critical
- Type safety for route params
- Prevents auth bypass bugs

### 🔵 LOWER PRIORITY (Phase 4+)
**Goal:** Complete type coverage
**Estimated Time:** 80-100 hours

#### 7. Components (172 files)
UI components - migrate incrementally.

**Strategy:**
- Start with shared/core components
- Then feature-specific components
- Finally page-specific components

**Suggested Order:**
1. `src/components/ui/*` - shadcn/ui components (already well-typed)
2. `src/components/core/*` - Core reusable components
3. `src/components/dashboard/*` - Dashboard components
4. `src/components/forms/*` - Form components
5. `src/components/[feature]/*` - Feature components

**Why Lower Priority:**
- Large effort (172 files)
- Less critical than data layer
- Can be done incrementally
- Props are often self-documenting

#### 8. Pages (50 files)
Page-level components - migrate last.

**Strategy:**
- Migrate after components are typed
- Start with most-used pages
- Then admin/settings pages

**Suggested Order:**
1. `src/pages/Dashboard.jsx` - Most used
2. `src/pages/Auth.jsx` - Critical for auth
3. `src/pages/Profile.jsx` - User management
4. Other pages as needed

**Why Lower Priority:**
- Depends on components being typed first
- Less complex than business logic
- Can work with typed components

## Migration Phases Summary

| Phase | Focus | Files | Hours | Priority |
|-------|-------|-------|-------|----------|
| 1 | API + Utils | 16 | 16-20h | 🔴 Critical |
| 2 | Services + Lib | 8 | 12-16h | 🟡 High |
| 3 | Hooks + Routes | 7 | 8-12h | 🟢 Medium |
| 4 | Components | 172 | 60-80h | 🔵 Lower |
| 5 | Pages | 50 | 20-30h | 🔵 Lower |
| **Total** | | **253** | **116-158h** | |

## Quick Wins (First Week)

Focus on these for maximum impact with minimal effort:

1. ✅ `src/api/supabaseClient.js` (2h)
2. ✅ `src/api/entities.js` (1h)
3. ✅ `src/api/supabaseEntities.js` (3h)
4. ✅ `src/utils/errorHandler.js` (2h)
5. ✅ `src/utils/apiClient.js` (2h)
6. ✅ `src/hooks/useAuth.js` (2h)
7. ✅ `src/services/AntragsService.js` (3h)

**Total: ~15 hours = 80% of the benefit**

## Supabase Type Generation

Before starting, generate types from Supabase:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Generate types
supabase gen types typescript --project-id yjjauvmjyhlxcoumwqlj > src/types/supabase.ts
```

This gives you:
- All table types
- All column types
- All relationship types
- All enum types

## Migration Checklist per File

- [ ] Rename `.js` → `.ts` or `.jsx` → `.tsx`
- [ ] Add type imports
- [ ] Type function parameters
- [ ] Type function returns
- [ ] Type React props (if component)
- [ ] Replace `any` with proper types
- [ ] Add JSDoc comments for complex types
- [ ] Run `npm run build` to check for errors
- [ ] Run tests if they exist
- [ ] Update imports in dependent files

## Next Steps

1. ✅ Complete this priority list (Task 10.2)
2. ⏳ Start with Phase 1: API Clients (Task 10.3, 10.5)
3. ⏳ Continue with Phase 2: Services (Task 10.3)
4. ⏳ Move to Phase 3: Hooks (Task 10.3)
5. ⏳ Finally Phase 4+: Components & Pages (Task 10.6, 10.7)

## Notes

- TypeScript strict mode is already enabled
- Vitest is configured for TypeScript
- Path aliases (`@/`) work with TypeScript
- ESLint is configured for TypeScript
- All infrastructure is ready - just need to migrate files
