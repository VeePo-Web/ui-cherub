

# Navigation Enhancement Plan — Hide at Top, Reveal on Scroll

---

## Overview

This plan removes the secondary sticky CTA bar and transforms the main navigation to be completely invisible at the top of the page, smoothly animating in when the user scrolls down. This creates a cleaner hero experience while maintaining persistent navigation access after initial engagement.

---

## Summary of Changes

### Remove
- `StickyDesktopCTA` component usage from `Waitlist.tsx` (lines 102-106)
- The component file can remain but won't be rendered

### Modify
- `HowItWorksNav.tsx` — Change from "transparent at top, solid on scroll" to "hidden at top, animate in on scroll"

---

## Current vs. Desired Behavior

### Current Navigation Behavior

```text
At scroll Y = 0:
┌─────────────────────────────────────────────────────────────┐
│ 🎮 Connor Computer   Home  How It Works    [Join Waitlist] │ <-- VISIBLE (60% opacity)
└─────────────────────────────────────────────────────────────┘

At scroll Y > 50px:
┌─────────────────────────────────────────────────────────────┐
│ 🎮 Connor Computer   Home  How It Works    [Join Waitlist] │ <-- VISIBLE (95% opacity + shadow)
└─────────────────────────────────────────────────────────────┘
```

### Desired Navigation Behavior

```text
At scroll Y = 0:
(Hero section - NO NAVIGATION BAR VISIBLE)
The hero has full visual impact without any overlay

At scroll Y > 100px (adjustable threshold):
┌─────────────────────────────────────────────────────────────┐
│ 🎮 Connor Computer   Home  How It Works    [Join Waitlist] │ <-- Slides in from top
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### File 1: `src/pages/Waitlist.tsx`

**Change:** Remove `StickyDesktopCTA` import and usage

**Lines to remove:**
- Line 8: Import statement
- Lines 102-106: Component usage

```text
Lines to Delete:

Line 8:
import { StickyDesktopCTA } from "@/components/waitlist/StickyDesktopCTA";

Lines 102-106:
{/* Sticky desktop CTA */}
<StickyDesktopCTA 
  spotsRemaining={spotsRemaining} 
  onCtaClick={scrollToForm} 
/>
```

---

### File 2: `src/components/howitworks/HowItWorksNav.tsx`

**Change:** Transform from always-visible (with transparency changes) to hidden-at-top with slide-in animation

**Current Implementation (lines 50-58):**
```tsx
<nav
  className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isScrolled
      ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/5"
      : "bg-background/60 backdrop-blur-sm border-b border-transparent"
  )}
>
```

**New Implementation:**
```tsx
<AnimatePresence>
  {isScrolled && (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/5"
    >
      {/* ... nav content remains the same ... */}
    </motion.nav>
  )}
</AnimatePresence>
```

**Scroll Threshold Change:**
- Current: `window.scrollY > 50` (line 21)
- New: `window.scrollY > 100` (slightly further down for cleaner hero experience)

---

## Animation Specification

### Entry Animation
```text
Initial state:
  - y: -100 (above viewport)
  - opacity: 0

Animate to:
  - y: 0 (fixed at top)
  - opacity: 1

Transition:
  - type: spring
  - damping: 25 (slightly bouncy feel)
  - stiffness: 300 (responsive but not jarring)
```

### Exit Animation
```text
Animate to:
  - y: -100 (slides up and out)
  - opacity: 0

Transition:
  - Same spring config for consistency
```

---

## Component Structure Update

### Before (Current Structure):
```tsx
return (
  <>
    <nav className={cn("fixed ...", isScrolled ? "solid styles" : "transparent styles")}>
      {/* nav content */}
    </nav>

    {/* Mobile menu overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        {/* mobile menu content */}
      )}
    </AnimatePresence>
  </>
);
```

### After (New Structure):
```tsx
return (
  <>
    {/* Main nav - only renders when scrolled */}
    <AnimatePresence>
      {isScrolled && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/5"
        >
          {/* nav content unchanged */}
        </motion.nav>
      )}
    </AnimatePresence>

    {/* Mobile menu overlay - unchanged */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        {/* mobile menu content */}
      )}
    </AnimatePresence>
  </>
);
```

---

## Edge Cases Handled

### Mobile Menu Access
**Issue:** If nav is hidden at top, how do users access mobile menu?

**Solution:** Add a floating mobile menu button that's always visible on mobile when nav is hidden

```tsx
{/* Mobile-only floating menu button when nav is hidden */}
{!isScrolled && (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsMobileMenuOpen(true)}
    className="md:hidden fixed top-4 right-4 z-50 p-3 bg-background/80 backdrop-blur-sm rounded-full shadow-lg border border-border/50"
    aria-label="Open menu"
  >
    <Menu className="w-6 h-6 text-foreground" />
  </motion.button>
)}
```

### Quick Scroll Up
**Issue:** When user scrolls up quickly, nav should hide smoothly

**Solution:** The exit animation handles this naturally with `AnimatePresence`

### Reduced Motion
**Issue:** Some users prefer no animations

**Solution:** The existing `motion.nav` respects `prefers-reduced-motion` via Framer Motion defaults, but we can add explicit fallback:

```tsx
// Add at component top
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In animation props
transition={prefersReducedMotion 
  ? { duration: 0 } 
  : { type: "spring", damping: 25, stiffness: 300 }
}
```

---

## Files to Modify

| File | Action | Details |
|------|--------|---------|
| `src/pages/Waitlist.tsx` | Remove | Delete StickyDesktopCTA import and usage |
| `src/components/howitworks/HowItWorksNav.tsx` | Modify | Wrap nav in AnimatePresence, conditional render on isScrolled, add floating mobile button |

---

## Visual Flow

### Desktop Experience

```text
SCROLL Y = 0 (Top of page):
┌───────────────────────────────────────────────┐
│                                               │
│                                               │
│        HERO SECTION - FULL IMPACT             │
│          No navigation overlay                │
│                                               │
│                                               │
└───────────────────────────────────────────────┘

SCROLL Y > 100px (After scroll):
┌───────────────────────────────────────────────┐
│ 🎮 Connor Computer   Home   [Join Waitlist]  │  <-- Slides in
├───────────────────────────────────────────────┤
│                                               │
│        Content continues...                   │
│                                               │
└───────────────────────────────────────────────┘
```

### Mobile Experience

```text
SCROLL Y = 0 (Top of page):
┌───────────────────────────────────────────────┐
│                                          [☰] │  <-- Floating menu button
│                                               │
│        HERO SECTION - FULL IMPACT             │
│          No navigation overlay                │
│                                               │
└───────────────────────────────────────────────┘

SCROLL Y > 100px (After scroll):
┌───────────────────────────────────────────────┐
│ 🎮 Connor Computer                       [☰] │  <-- Full nav slides in
├───────────────────────────────────────────────┤
│                                               │
│        Content continues...                   │
│                                               │
└───────────────────────────────────────────────┘
```

---

## Implementation Order

1. Remove `StickyDesktopCTA` from `Waitlist.tsx`
2. Update scroll threshold to 100px in `HowItWorksNav.tsx`
3. Wrap nav in `AnimatePresence` with conditional rendering
4. Add entry/exit animations to nav
5. Add floating mobile menu button for when nav is hidden
6. Test on desktop and mobile
7. Verify reduced motion preferences are respected

---

## Success Criteria

1. Hero section has no navigation overlay at top of page
2. Navigation slides in smoothly when scrolling past 100px
3. Navigation slides out when scrolling back to top
4. Mobile users can still access menu via floating button at top
5. All navigation links and CTA continue to work
6. Animations are smooth (60fps target)
7. Reduced motion users see instant show/hide (no animation)
8. No StickyDesktopCTA bar appears anywhere on the page

