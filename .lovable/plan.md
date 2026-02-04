

# Route Cleanup Plan - Keep Only Home & How It Works

## Overview

This plan removes all routes and associated components except for the home page (`/` - Waitlist) and the How It Works page (`/how-it-works`). This will significantly reduce bundle size and simplify the codebase.

---

## Current Routes to Remove

| Route | Page | Status |
|-------|------|--------|
| `/discover` | Discover.tsx | REMOVE |
| `/event/:id` | Index.tsx | REMOVE |
| `/event/:id/edit` | EditEvent.tsx | REMOVE |
| `/my-events` | MyEvents.tsx | REMOVE |
| `/create-event` | CreateEvent.tsx | REMOVE |
| `/auth` | Auth.tsx | REMOVE |
| `/admin` | Admin.tsx | REMOVE |

## Routes to Keep

| Route | Page | Status |
|-------|------|--------|
| `/` | Waitlist.tsx | KEEP |
| `/how-it-works` | HowItWorks.tsx | KEEP |
| `*` | NotFound.tsx | KEEP (for 404 handling) |

---

## Files to Delete

### Pages (7 files)
- `src/pages/Admin.tsx`
- `src/pages/Auth.tsx`
- `src/pages/CreateEvent.tsx`
- `src/pages/Discover.tsx`
- `src/pages/EditEvent.tsx`
- `src/pages/Index.tsx`
- `src/pages/MyEvents.tsx`

### Event-Related Components (9 files)
- `src/components/AuthSheet.tsx`
- `src/components/EventCountdown.tsx`
- `src/components/EventDescription.tsx`
- `src/components/EventDetailPage.tsx`
- `src/components/EventHeader.tsx`
- `src/components/EventLocation.tsx`
- `src/components/EventMeta.tsx`
- `src/components/EventRegistration.tsx`
- `src/components/EventsCarousel.tsx`
- `src/components/Navbar.tsx`
- `src/components/RotatingBadge.tsx`

### Assets (2 files)
- `src/assets/arrow-down.png`
- `src/assets/arrow-right.svg`

### Hooks (1 file)
- `src/hooks/useGooglePlacesAutocomplete.ts`

### Type Definitions (1 file)
- `src/types/google-maps.d.ts`

**Total files to delete: 20 files**

---

## Files to Modify

### 1. src/App.tsx

**Current:**
```typescript
import { Suspense, lazy } from "react";

const Waitlist = lazy(() => import("./pages/Waitlist"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const MyEvents = lazy(() => import("./pages/MyEvents"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const EditEvent = lazy(() => import("./pages/EditEvent"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Routes include all 10 routes
```

**After:**
```typescript
import { Suspense, lazy } from "react";

const Waitlist = lazy(() => import("./pages/Waitlist"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </TooltipProvider>
);
```

---

## Files to Keep (Verified)

### Pages
- `src/pages/Waitlist.tsx` - Home page
- `src/pages/HowItWorks.tsx` - How it works page
- `src/pages/NotFound.tsx` - 404 page

### Components used by Waitlist
- `src/components/waitlist/` - All waitlist components
- `src/components/howitworks/` - All how-it-works components
- `src/components/SEOHead.tsx` - Used by both pages
- `src/components/ui/` - UI primitives

### Hooks used by Waitlist
- `src/hooks/use-mobile.tsx`
- `src/hooks/use-toast.ts`
- `src/hooks/useActualSpotsRemaining.ts`
- `src/hooks/useWaitlistSubmit.ts`

### Other
- `src/integrations/supabase/` - Backend connection
- `src/lib/utils.ts` - Utilities
- `src/lib/waitlist-validation.ts` - Form validation

---

## Summary

| Category | Before | After | Removed |
|----------|--------|-------|---------|
| Routes | 10 | 3 | 7 |
| Pages | 10 | 3 | 7 |
| Event components | 11 | 0 | 11 |
| Assets | 3+ | 1 | 2 |
| Total files removed | - | - | ~20 |

This cleanup will:
1. Reduce initial bundle size significantly
2. Remove unused code paths
3. Simplify the application to just the waitlist funnel
4. Improve performance by eliminating dead code

