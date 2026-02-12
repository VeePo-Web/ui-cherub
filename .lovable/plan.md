

# Update Tier Cards: New Specs, Image Link, and Pricing

## Overview
Update the Ludacris (Tier 1) card with new specs from the provided PCPartPicker screenshot, replace its external link to open the image directly, and add monthly pricing (with 10% early-bird discount) to all three tier cards. Esports and Pro tiers keep their existing specs/links until new images are provided.

## What Changes

### 1. Copy the uploaded image into the project
- Copy `user-uploads://IMG_5533.PNG` to `public/images/ludacris-specs.png`
- This image will open in a new tab when "View full build" is clicked on the Ludacris card

### 2. Update tier data in `src/lib/waitlist-validation.ts`
- **Ludacris tier**: Update specs from `["RTX 4090", "Ryzen 9 7950X", "64GB DDR5"]` to `["RTX 5070 Ti", "Ryzen 7 7800X3D", "32GB DDR5"]` (matching the image)
- **Ludacris tier**: Change `specsUrl` from the PCPartPicker link to the local image path (`/images/ludacris-specs.png`)
- **Add `price` field** to each tier:
  - Ludacris: `"$139.99/mo"`
  - Esports: `"$109.99/mo"`
  - Pro: `"$89.99/mo"`
- **Add `originalPrice` field** for strikethrough display (showing the pre-discount price):
  - Ludacris: `"$155.55/mo"`
  - Esports: `"$122.21/mo"`
  - Pro: `"$99.99/mo"`

### 3. Update `TierCard` component (`src/components/waitlist/TierCard.tsx`)
- Add `price` and `originalPrice` to the props interface
- Display pricing prominently on each card: show the original price with a strikethrough, the discounted price in the tier's accent color, and a small "with early-bird discount" label
- Place the pricing section between the tagline and description for visual hierarchy

### 4. Update `TierSelector` component (`src/components/waitlist/TierSelector.tsx`)
- Pass the new `price` and `originalPrice` props from `tierOptions` to each `TierCard`

### 5. Update `HowItWorksTierPreview` component (`src/components/howitworks/HowItWorksTierPreview.tsx`)
- Update the Ludacris entry specs and specsUrl to match the new data
- Add pricing display to these preview cards as well

## Technical Details

### Tier data shape change (waitlist-validation.ts)
```
{
  id: "ludacris",
  name: "Ludacris",
  tagline: "Peak Gaming Performance",
  description: "...",
  accentColor: "gaming-gold",
  specsUrl: "/images/ludacris-specs.png",  // was PCPartPicker URL
  specs: ["RTX 5070 Ti", "Ryzen 7 7800X3D", "32GB DDR5"],  // updated
  price: "$139.99/mo",       // NEW
  originalPrice: "$155.55/mo" // NEW
}
```

### Pricing display in TierCard
- Original price shown with strikethrough (line-through) in muted text
- Discounted price shown larger in the tier's accent color
- Small badge: "10% early-bird discount"
- Positioned after the tagline, before the description

### Files touched
1. `public/images/ludacris-specs.png` -- new file (copied image)
2. `src/lib/waitlist-validation.ts` -- updated tier data
3. `src/components/waitlist/TierCard.tsx` -- add pricing UI + updated props
4. `src/components/waitlist/TierSelector.tsx` -- pass new props
5. `src/components/howitworks/HowItWorksTierPreview.tsx` -- sync specs + add pricing

### What stays the same
- All form logic, validation, submission flow, and email delivery unchanged
- Esports and Pro tiers keep their existing PCPartPicker links and specs
- Overall page design and layout unchanged
- Thank-you modal, geo coverage, navigation all unchanged

