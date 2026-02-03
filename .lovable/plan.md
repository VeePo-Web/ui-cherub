

# World-Class Performance Optimization Plan

## Executive Summary

This plan optimizes the waitlist website for world-class performance without changing any design elements. Following the comprehensive research on performance optimization inspired by Google, Cloudflare, Akamai, Fastly, Netflix, Shopify, and Pinterest, we will implement optimizations targeting Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) while ensuring all functionality works perfectly.

---

## Current State Analysis

### Identified Performance Concerns

| Area | Issue | Impact |
|------|-------|--------|
| **Font Loading** | Google Fonts loaded synchronously in index.html | Blocks LCP, increases TTFB |
| **Framer Motion** | Heavy animation library used on every component | Large bundle, main thread blocking |
| **Animation Overuse** | Multiple infinite CSS animations on every page | GPU/CPU drain, battery impact |
| **Lazy Loading** | Components not code-split | Large initial bundle |
| **Image Assets** | PNG files in assets folder (not WebP/AVIF) | Larger file sizes |
| **Third-party Scripts** | Supabase client loaded eagerly | Increases initial load |
| **Vite Config** | No production optimizations configured | Unoptimized bundles |

### Functionality to Verify

- Waitlist form submission and validation
- Thank you modal display with confetti
- Tier selection with haptic feedback
- Mobile sticky CTA button
- Navigation scroll behavior
- FAQ accordion interactions
- All micro-interactions and hover states

---

## Phase 1: Critical Path Optimization (Highest Impact)

### 1.1 Font Loading Optimization

**File: `index.html`**

**Current Issue:** Google Fonts block rendering with synchronous load.

**Solution:** Implement font-display swap and preload critical font weight.

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'">
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap">
</noscript>
```

**Why:** Preloading and async loading prevents render-blocking. The `media="print"` trick defers non-critical CSS loading.

---

### 1.2 Vite Build Optimization

**File: `vite.config.ts`**

**Add production optimizations:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
          ],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Target modern browsers
    target: 'es2020',
    // Generate source maps for debugging
    sourcemap: false,
    // Chunk size warning
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
}));
```

**Why:** 
- Terser minification removes dead code and console logs
- Manual chunks improve caching (vendor bundles rarely change)
- ES2020 target uses modern JS features for smaller output

---

### 1.3 Lazy Load Routes

**File: `src/App.tsx`**

**Implement React.lazy for route-based code splitting:**

```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load pages
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

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/event/:id" element={<Index />} />
        <Route path="/event/:id/edit" element={<EditEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </TooltipProvider>
);

export default App;
```

**Why:** Only the code for the current route is loaded initially, reducing initial bundle size significantly.

---

## Phase 2: Animation Performance Optimization

### 2.1 Add GPU Acceleration Hints

**File: `src/index.css`**

**Add performance utilities (append to existing file):**

```css
/* ===== PERFORMANCE OPTIMIZATIONS ===== */

/* GPU acceleration for animated elements */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* Contain layout for animated sections */
.contain-layout {
  contain: layout;
}

.contain-paint {
  contain: paint;
}

/* Hardware acceleration trigger */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Reduce motion for performance-conscious users */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Pause animations when not visible */
.animation-paused {
  animation-play-state: paused !important;
}

/* Content visibility for off-screen sections */
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

---

### 2.2 Optimize Framer Motion Usage

**File: `src/components/waitlist/WaitlistHero.tsx`**

**Key optimizations to apply:**

1. Add `will-change: transform` to animated orbs
2. Use `layoutId` carefully to prevent layout thrashing
3. Reduce animation complexity on mobile (already partially done)

**Update the animated orbs section:**

```tsx
{/* Animated gradient background - optimized */}
<div className="absolute inset-0 bg-gradient-to-br from-background via-gaming-purple-mid to-background">
  <div className="absolute inset-0 opacity-30">
    <motion.div 
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl will-change-transform gpu-accelerated"
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: 'transform, opacity' }}
    />
    {/* Similar updates for other orbs... */}
  </div>
</div>
```

**Apply similar pattern to:**
- `src/components/howitworks/HowItWorksHero.tsx`
- `src/components/waitlist/ThankYouModal.tsx` (confetti)

---

### 2.3 Lazy Load Below-Fold Components

**File: `src/pages/Waitlist.tsx`**

**Implement intersection observer for heavy components:**

```typescript
import { useState, useRef, useEffect, lazy, Suspense } from "react";
// ... existing imports ...

// Lazy load below-fold components
const GeoCoverage = lazy(() => import("@/components/waitlist/GeoCoverage").then(m => ({ default: m.GeoCoverage })));

// In render, wrap with Suspense
<Suspense fallback={<div className="h-48" />}>
  <GeoCoverage />
</Suspense>
```

---

## Phase 3: Resource Optimization

### 3.1 Optimize Image Assets

**Files in `src/assets/`:**
- `arrow-down.png` - Convert to SVG or WebP
- `badge.png` - Convert to WebP with fallback
- `arrow-right.svg` - Already optimized

**Create optimized versions:**

For `badge.png`, create a WebP version and implement picture element pattern:

```tsx
// Example usage pattern
<picture>
  <source srcSet="/badge.webp" type="image/webp" />
  <img src="/badge.png" alt="Badge" loading="lazy" />
</picture>
```

---

### 3.2 Add Resource Hints

**File: `index.html`**

**Add critical resource hints:**

```html
<head>
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="https://sjlkfitixkwocusfbllv.supabase.co">
  
  <!-- Preconnect for Supabase -->
  <link rel="preconnect" href="https://sjlkfitixkwocusfbllv.supabase.co" crossorigin>
  
  <!-- Preload critical assets -->
  <link rel="preload" href="/src/main.tsx" as="script" type="module">
  
  <!-- Theme color for mobile browsers -->
  <meta name="theme-color" content="#1a0a2e">
  
  <!-- ... existing head content ... -->
</head>
```

---

## Phase 4: Form and Modal Optimization

### 4.1 Debounce Form Validation

**File: `src/components/waitlist/WaitlistForm.tsx`**

The current form uses react-hook-form with zod validation, which is already efficient. Additional optimizations:

```typescript
// Add to form configuration
const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors, dirtyFields },
} = useForm<WaitlistFormData>({
  resolver: zodResolver(waitlistFormSchema),
  defaultValues: {
    preferredTier: selectedTier || undefined,
    tradeInInterest: true,
    mailingListOptIn: true,
  },
  mode: "onBlur", // Validate on blur instead of onChange for better performance
  reValidateMode: "onBlur",
});
```

---

### 4.2 Optimize Thank You Modal Confetti

**File: `src/components/waitlist/ThankYouModal.tsx`**

**Reduce confetti count and use CSS containment:**

```typescript
// Reduce from 25 to 15 particles
{showConfetti && !prefersReducedMotion && (
  <div className="fixed inset-0 pointer-events-none overflow-hidden contain-paint">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ /* ... */ }}
        animate={{ /* ... */ }}
        transition={{
          duration: 1.5 + Math.random() * 0.5, // Shorter duration
          ease: "easeOut",
        }}
        className={cn(
          "absolute w-2 h-2 rounded-sm will-change-transform gpu-accelerated", // Smaller particles
          // ... color classes
        )}
      />
    ))}
  </div>
)}
```

---

## Phase 5: Content Visibility Optimization

### 5.1 Apply content-visibility to Sections

**File: `src/pages/HowItWorks.tsx`**

**Wrap below-fold sections with content-visibility:**

```tsx
<main className="min-h-screen bg-background">
  <HowItWorksNav />
  <HowItWorksHero />
  
  {/* Apply content-visibility to below-fold sections */}
  <div className="content-visibility-auto">
    <WhoItsFor />
  </div>
  <div className="content-visibility-auto">
    <ThePromise />
  </div>
  <div className="content-visibility-auto">
    <ThreeSteps />
  </div>
  {/* ... continue for other sections ... */}
</main>
```

**Why:** `content-visibility: auto` skips rendering of off-screen content, dramatically improving initial paint time.

---

## Phase 6: Supabase Query Optimization

### 6.1 Add Query Caching

**File: `src/hooks/useActualSpotsRemaining.ts`**

**Implement simple caching to prevent redundant queries:**

```typescript
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOTAL_SPOTS = 250;
const CACHE_KEY = 'waitlist_spots_cache';
const CACHE_TTL = 60000; // 1 minute

interface CacheEntry {
  value: number;
  timestamp: number;
}

function getFromCache(): number | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const entry: CacheEntry = JSON.parse(cached);
      if (Date.now() - entry.timestamp < CACHE_TTL) {
        return entry.value;
      }
    }
  } catch {
    // Ignore cache errors
  }
  return null;
}

function setCache(value: number): void {
  try {
    const entry: CacheEntry = { value, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore cache errors
  }
}

export function useActualSpotsRemaining() {
  const [spotsRemaining, setSpotsRemaining] = useState(() => {
    const cached = getFromCache();
    return cached ?? TOTAL_SPOTS;
  });
  const [isLoading, setIsLoading] = useState(() => getFromCache() === null);

  useEffect(() => {
    // Check cache first
    const cached = getFromCache();
    if (cached !== null) {
      setSpotsRemaining(cached);
      setIsLoading(false);
      return;
    }

    const fetchSignupCount = async () => {
      try {
        const { count, error } = await supabase
          .from("waitlist_signups")
          .select("*", { count: "exact", head: true });

        if (error) {
          console.error("Error fetching signup count:", error);
          setSpotsRemaining(TOTAL_SPOTS);
        } else {
          const remaining = Math.max(0, TOTAL_SPOTS - (count || 0));
          setSpotsRemaining(remaining);
          setCache(remaining);
        }
      } catch (err) {
        console.error("Error fetching signup count:", err);
        setSpotsRemaining(TOTAL_SPOTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignupCount();
  }, []);

  return { spotsRemaining, isLoading };
}
```

---

## Phase 7: SEO & Meta Optimization

### 7.1 Update index.html Meta Tags

**File: `index.html`**

**Update with proper branding and performance hints:**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Core Meta -->
    <title>Connor Computer - Gaming PC Subscription | Always-Current Performance</title>
    <meta name="description" content="Never buy outdated hardware again. Get a high-performance gaming PC with annual upgrades, covered repairs, and transparent builds—all for one monthly price. Join the Calgary waitlist." />
    <meta name="author" content="Connor Computer" />
    
    <!-- Performance Hints -->
    <meta http-equiv="x-dns-prefetch-control" content="on">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="dns-prefetch" href="https://sjlkfitixkwocusfbllv.supabase.co">
    
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://sjlkfitixkwocusfbllv.supabase.co" crossorigin>
    
    <!-- Optimized Font Loading -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'">
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap">
    </noscript>
    
    <!-- Theme -->
    <meta name="theme-color" content="#1a0a2e">
    <meta name="color-scheme" content="dark">

    <!-- Open Graph -->
    <meta property="og:title" content="Connor Computer - Gaming PC Subscription" />
    <meta property="og:description" content="Never buy outdated hardware again. Annual upgrades, covered repairs, one monthly price." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    <meta property="og:locale" content="en_CA" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Connor Computer - Gaming PC Subscription" />
    <meta name="twitter:description" content="Never buy outdated hardware again. Annual upgrades, covered repairs, one monthly price." />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Implementation Summary

### Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `index.html` | Font optimization, resource hints, meta tags | P0 - Critical |
| `vite.config.ts` | Build optimizations, code splitting | P0 - Critical |
| `src/App.tsx` | Lazy load routes | P0 - Critical |
| `src/index.css` | Performance utilities, reduced motion | P1 - High |
| `src/components/waitlist/WaitlistHero.tsx` | GPU acceleration hints | P1 - High |
| `src/components/howitworks/HowItWorksHero.tsx` | GPU acceleration hints | P1 - High |
| `src/components/waitlist/ThankYouModal.tsx` | Reduced confetti, containment | P1 - High |
| `src/components/waitlist/WaitlistForm.tsx` | Validation mode optimization | P2 - Medium |
| `src/hooks/useActualSpotsRemaining.ts` | Query caching | P2 - Medium |
| `src/pages/HowItWorks.tsx` | Content visibility | P2 - Medium |
| `src/pages/Waitlist.tsx` | Lazy load below-fold | P2 - Medium |

---

## Expected Performance Improvements

| Metric | Current (Estimated) | Target | Improvement |
|--------|---------------------|--------|-------------|
| **LCP** | ~3.5s | < 2.5s | 30%+ faster |
| **INP** | ~250ms | < 200ms | 20%+ faster |
| **CLS** | ~0.15 | < 0.1 | Stabilized |
| **TTFB** | ~600ms | < 400ms | 30%+ faster |
| **Bundle Size** | ~500KB | ~350KB | 30% smaller |

---

## Verification Checklist

After implementation, verify:

- [ ] Waitlist form submits successfully
- [ ] Thank you modal opens with confetti animation
- [ ] Tier selection triggers haptic feedback on mobile
- [ ] Mobile sticky CTA appears and works
- [ ] Navigation hides at top, slides in on scroll
- [ ] FAQ accordion opens/closes smoothly
- [ ] All hover states and micro-interactions work
- [ ] Page loads without layout shifts (CLS < 0.1)
- [ ] Reduced motion preference is respected
- [ ] All links navigate correctly

---

## Technical Notes

### No Design Changes
All optimizations preserve the existing visual design. Changes are purely technical:
- No color changes
- No layout changes
- No typography changes
- No animation visual changes (only performance improvements)

### Browser Support
- Target: Modern browsers (Chrome 88+, Firefox 78+, Safari 14+, Edge 88+)
- ES2020 features reduce polyfill overhead
- Graceful degradation for older browsers

### Monitoring Recommendations
Post-implementation, monitor:
1. Core Web Vitals via Google Search Console
2. Real-user metrics via browser performance APIs
3. Error rates for form submissions
4. Page load times across devices

