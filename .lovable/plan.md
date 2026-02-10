

# Branding Verification Audit: Unbound - Gaming

## Audit Summary

After a thorough review of every file in the project, here is the complete status of the rebrand and favicon.

---

## Favicon Status: KEEP AS-IS

The current `public/favicon.svg` uses the original `< >` angular bracket design -- which you want to keep. It renders correctly:

```svg
<!-- Two angular brackets + vertical bar in brand orange #fc7e30 -->
<path d="M20 4 L8 4 L3 16" />   <!-- Top-left bracket arm -->
<path d="M3 16 L8 28 L20 28" /> <!-- Bottom-left bracket arm -->
<path d="M26 10 L26 22" />      <!-- Right vertical bar -->
```

The `index.html` correctly references it as `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`. No old `favicon.ico` file remains. No changes needed.

---

## Branding Verification: What's Correct

| Location | Status | Details |
|----------|--------|---------|
| **Browser tab title** | Correct | "Unbound - Gaming | Gaming PC Subscription | Always-Current Performance" |
| **Meta author** | Correct | "Unbound - Gaming" |
| **OG title** | Correct | "Unbound - Gaming | Gaming PC Subscription" |
| **Twitter title** | Correct | "Unbound - Gaming | Gaming PC Subscription" |
| **Nav bar (desktop)** | Correct | UnboundLogo + "Unbound . Gaming" with proper typography |
| **Nav bar (mobile menu)** | Correct | UnboundLogo + "Unbound . Gaming" |
| **Sticky desktop CTA** | Correct | UnboundLogo + "Unbound . Gaming" |
| **Waitlist footer** | Correct | "(c) 2026 Unbound - Gaming. All rights reserved." |
| **How It Works JSON-LD** | Correct | "How It Works -- Unbound - Gaming" |
| **How It Works OG title** | Correct | "How It Works -- Unbound - Gaming" |
| **UnboundLogo component** | Correct | Reusable SVG with currentColor |

---

## Issues Found: 2 Minor Remnants

### Issue 1: SEOHead.tsx still references "EventHub"

**File:** `src/components/SEOHead.tsx` (line 18)

```typescript
const fullTitle = `${title} | EventHub`;  // <-- Should be "Unbound - Gaming"
```

This component is used by `NotFound.tsx`, meaning the 404 page displays "404 - Page Not Found | EventHub" instead of "404 - Page Not Found | Unbound - Gaming".

**Fix:** Change `EventHub` to `Unbound - Gaming`.

### Issue 2: NotFound.tsx description references "events"

**File:** `src/pages/NotFound.tsx` (line 16)

```typescript
description="The page you're looking for doesn't exist. Return to discover events and community calendars."
```

This copy references "events and community calendars" -- leftover from a different project template.

**Fix:** Update to something like: "The page you're looking for doesn't exist. Return to the Unbound - Gaming homepage."

---

## Additional Observation: StickyDesktopCTA Not Currently Used

The `StickyDesktopCTA` component has correct Unbound branding but is not imported or rendered anywhere in the current `Waitlist.tsx` page. This is not a branding issue -- just noting it exists as an unused component with correct branding in case you want to re-enable it later.

---

## Plan: Fix the 2 Remaining Issues

### Step 1: Update `src/components/SEOHead.tsx`

Change line 18 from:
```typescript
const fullTitle = `${title} | EventHub`;
```
To:
```typescript
const fullTitle = `${title} | Unbound - Gaming`;
```

### Step 2: Update `src/pages/NotFound.tsx`

Change the description and also update the styling to match the dark theme used across the rest of the site (currently it uses gray-100 background and blue links, which are inconsistent with the premium dark aesthetic).

Update:
- Description text to reference Unbound - Gaming instead of "events and community calendars"
- Background from `bg-gray-100` to `bg-background`
- Text colors to use theme tokens (`text-foreground`, `text-muted-foreground`)
- Link color from `text-blue-500` to `text-primary`

---

## Technical Summary

| Action | File | Change |
|--------|------|--------|
| Modify | `src/components/SEOHead.tsx` | Replace "EventHub" with "Unbound - Gaming" |
| Modify | `src/pages/NotFound.tsx` | Update description copy and match dark theme styling |

Everything else -- nav, sticky bar, footer, favicon, meta tags, JSON-LD -- is confirmed correct with "Unbound - Gaming" branding and the `< >` bracket favicon.

