

# Revert to External Links and Update Specs to Match PCPartPicker Builds

## Overview
Remove the popup/modal behavior for "View full build" links and go back to opening PCPartPicker in a new tab. Update the specs pills on each card to match the actual components in each PCPartPicker build. Update the Ludacris link to the new URL.

## Specs from PCPartPicker (verified)

| Tier | GPU | CPU | RAM | Link |
|------|-----|-----|-----|------|
| Ludacris | RTX 5070 Ti | Ryzen 7 7800X3D | 32GB DDR5 | ca.pcpartpicker.com/list/GcVLC8 |
| Esports | RTX 5070 | Ryzen 5 7600X | 32GB DDR5 | ca.pcpartpicker.com/list/9NwCpK |
| Pro | RTX 5060 | Ryzen 5 7600X | 16GB DDR5 | ca.pcpartpicker.com/list/VJdJzP |

## Changes

### 1. `src/lib/waitlist-validation.ts` -- Update tier data
- **Ludacris**: Change `specsUrl` from `/images/ludacris-specs.png` to `https://ca.pcpartpicker.com/list/GcVLC8`. Specs stay the same (already correct: RTX 5070 Ti, Ryzen 7 7800X3D, 32GB DDR5).
- **Esports**: Update specs from `["RTX 4070 Super", "Ryzen 7 7800X3D", "32GB DDR5"]` to `["RTX 5070", "Ryzen 5 7600X", "32GB DDR5"]`. Link stays the same.
- **Pro**: Update specs from `["RTX 4060 Ti", "Ryzen 5 7600", "32GB DDR5"]` to `["RTX 5060", "Ryzen 5 7600X", "16GB DDR5"]`. Link stays the same.

### 2. `src/components/waitlist/TierCard.tsx` -- Remove modal, revert to simple link
- Remove the `useState` for `specsOpen` and the `Dialog` import
- Remove the image-detection conditional logic (`specsUrl.match(...)`)
- Replace with a simple `<a>` tag that opens `specsUrl` in a new tab (`target="_blank"`)
- Keep `e.stopPropagation()` so clicking the link does not select the tier card

### 3. `src/components/howitworks/HowItWorksTierPreview.tsx` -- Remove modal, revert to simple link
- Remove the `SpecsLink` helper component and `Dialog` imports
- Remove `useState` import (if no longer needed)
- Replace with a simple `<a>` tag that opens `specsUrl` in a new tab
- Update the Ludacris tier data inline to match the new URL and specs

### 4. Cleanup
- The `public/images/ludacris-specs.png` file can remain (no harm) but will no longer be referenced

## What stays the same
- All pricing (Ludacris $139.99, Esports $109.99, Pro $89.99 with early-bird discounts)
- Card layout, design, animations, and selection behavior
- Form logic, validation, and submission flow
- All other page sections

