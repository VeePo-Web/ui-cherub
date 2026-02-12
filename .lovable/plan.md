

# Specs Image: Popup Modal Instead of New Tab

## Overview
Replace the "View full build" link behavior so it opens the specs image in a clean, borderless popup/modal overlay instead of navigating to a new browser tab. The modal will have a simple close button (X) and clicking the backdrop also dismisses it.

## Changes

### 1. Update `TierCard.tsx`
- Replace the `<a>` tag for "View full build" with a `<button>` that opens a local state-controlled Dialog modal
- Import `Dialog`, `DialogContent`, `DialogClose` from the existing `@/components/ui/dialog.tsx`
- Add `useState` to track whether the modal is open
- Inside the Dialog, render the image with no border styling -- use `bg-transparent` and no `border` classes on the DialogContent so the image appears clean and borderless
- The Dialog already includes a built-in X close button and clicking the overlay backdrop closes it automatically
- Keep `e.stopPropagation()` on the trigger button so clicking it doesn't also select the tier card

### 2. Update `HowItWorksTierPreview.tsx`
- Apply the same modal pattern to the "View full build" link in the How It Works preview cards
- Only show the modal for image-based URLs (Ludacris); external URLs (Esports, Pro) continue opening in a new tab as before

### 3. Image display styling
- Render the image with `rounded-lg` and no border/outline
- Use `max-h-[80vh] w-auto object-contain` so it scales nicely on all screens without overflow
- DialogContent will use a transparent/minimal background with no padding so the image feels clean and frameless

## Files touched
1. `src/components/waitlist/TierCard.tsx` -- add Dialog modal for image specs
2. `src/components/howitworks/HowItWorksTierPreview.tsx` -- same modal pattern

## What stays the same
- All pricing, specs, form logic, and submission flow unchanged
- External PCPartPicker links for Esports and Pro tiers still open in new tabs
- Overall page layout and design unchanged

