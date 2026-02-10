

# Rebrand to "Unbound - Gaming" with Custom Logo

## Overview

Replace all "Connor Computer" branding with "Unbound - Gaming" across the entire codebase, create a new minimal geometric SVG logo and favicon, and update the nav/sticky bar brand marks.

---

## Logo Design Concept

The logo will be an ultra-minimal geometric mark that represents "breaking free" (unbound) with a tech/gaming edge. The design: an abstract open hexagon fragment -- three connected angular lines forming a partial hexagon shape that looks like it's breaking apart. This conveys:

- **Unbound** -- open, not closed, breaking free from constraints
- **Tech** -- geometric, precise, angular
- **Gaming** -- dynamic, forward-moving energy

```text
Logo mark (UnboundMark):

    ╱‾‾
   ╱
   ╲
    ╲__

Three strokes forming an open angular "U" shape,
like a hexagon with the right side removed.
```

The SVG will use brand orange (#fc7e30) strokes on transparent background, stroke-width 2.5, round caps/joins. Approximately 3 path elements.

### Favicon (32x32 viewBox)
Same mark scaled to fit the favicon grid -- compact, recognizable at 16px.

### Inline Logo Component
A reusable React component `UnboundLogo` that renders the SVG inline, accepting `size` and `className` props. This replaces the `Gamepad2` icon used as the brand mark in the nav.

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/brand/UnboundLogo.tsx` | Reusable inline SVG logo component |

### UnboundLogo Component

```tsx
// Accepts size prop (default 20), renders inline SVG
// Three angular strokes forming an open hexagonal "U" shape
// Uses currentColor so it inherits text color, or brand orange
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/favicon.svg` | Replace brackets with new unbound mark |
| `index.html` | Update all meta titles/descriptions from "Connor Computer" to "Unbound - Gaming" |
| `src/components/howitworks/HowItWorksNav.tsx` | Replace Gamepad2 icon with UnboundLogo, rename "Connor Computer" to "Unbound" with styled " - Gaming" suffix |
| `src/components/waitlist/StickyDesktopCTA.tsx` | Replace Gamepad2 icon with UnboundLogo, update brand text |
| `src/pages/HowItWorks.tsx` | Update JSON-LD schema and OG meta from "Connor Computer" to "Unbound - Gaming" |
| `src/pages/Waitlist.tsx` | Update footer copyright text |

---

## Detailed Changes

### 1. `public/favicon.svg`
Replace the current `< >` brackets with the new open-hex mark:
- Three path elements forming the partial hexagon/angular U shape
- 32x32 viewBox, orange stroke (#fc7e30), stroke-width 3

### 2. `index.html`
- Line 8: Title becomes `Unbound - Gaming | Gaming PC Subscription | Always-Current Performance`
- Line 10: Author becomes `Unbound - Gaming`
- Line 37: OG title becomes `Unbound - Gaming | Gaming PC Subscription`
- Line 44: Twitter title becomes `Unbound - Gaming | Gaming PC Subscription`

### 3. `HowItWorksNav.tsx`
- Import `UnboundLogo` instead of `Gamepad2` (keep Gamepad2 for other uses if needed, but the brand mark spots switch)
- Desktop nav logo: `<UnboundLogo className="w-5 h-5 text-primary" />` + "Unbound" in bold + " - Gaming" in lighter weight
- Mobile menu logo: Same treatment
- Floating mobile button stays the same (Menu icon)

### 4. `StickyDesktopCTA.tsx`
- Replace `Gamepad2` with `UnboundLogo`
- Update text from "Gaming PC Subscription" to "Unbound - Gaming"

### 5. `HowItWorks.tsx`
- JSON-LD schema name: "How It Works -- Unbound - Gaming"
- OG title: "How It Works -- Unbound - Gaming"

### 6. `Waitlist.tsx`
- Footer: Update copyright from "Gaming PC Subscription" to "Unbound - Gaming"

---

## Brand Typography Treatment

The wordmark in the nav will be styled as:

```text
[Logo Mark]  Unbound · Gaming
```

- "Unbound" in `font-bold text-foreground`
- The separator and "Gaming" in `font-normal text-muted-foreground` or `text-primary`
- This creates visual hierarchy and sophistication

---

## Files NOT Changed

- `TierCard.tsx`, `WaitlistForm.tsx`, `ThankYouModal.tsx` -- these use `Gamepad2` as tier icons (Pro tier), not as brand marks. They stay as-is since they represent the gaming category, not the company logo.

---

## Summary

| Action | Count |
|--------|-------|
| Create | 1 file (UnboundLogo component) |
| Modify | 6 files (favicon, index.html, nav, sticky CTA, HowItWorks, Waitlist footer) |
| Delete | 0 files |

The result: A cohesive rebrand with a minimal, geometric logo mark that feels premium, techy, and "unbound" -- consistent across favicon, nav, sticky bar, and all meta tags.

