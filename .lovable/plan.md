

# Comprehensive Update Plan: Tier Specs, Insurance Language, and Trade-In Form Fields

## Overview

This plan implements four key changes requested:
1. Update tier cards with actual PCPartPicker specs and links
2. Change insurance language to clarify the Company provides the insurance
3. Add trade-in computer spec fields (GPU, CPU, RAM, Memory, Motherboard, Computer Uptime)
4. Add trade-in value copy ("Trade-ins get up to $1000 trade-in value")

---

## 1. Tier Cards: Add Actual Specs and PCPartPicker Links

### Files to Modify

| File | Purpose |
|------|---------|
| `src/lib/waitlist-validation.ts` | Add specs and specsUrl to tier options |
| `src/components/waitlist/TierCard.tsx` | Display specs and link |
| `src/components/howitworks/HowItWorksTierPreview.tsx` | Update with actual URLs |

### Tier Data with Specs

**Ludacris Tier** (Peak Gaming Performance)
- URL: `https://ca.pcpartpicker.com/list/GcVLC8`
- Key specs to display (summary format for card)

**Esports Tier** (Competition-Ready Performance)
- URL: `https://ca.pcpartpicker.com/list/9NwCpK`
- Key specs to display

**Pro Tier** (AAA-Title Performance)
- URL: `https://ca.pcpartpicker.com/list/VJdJzP`
- Key specs to display

### Changes to `src/lib/waitlist-validation.ts`

Update the `tierOptions` array to include `specsUrl` and `specs` array:

```typescript
export const tierOptions = [
  {
    id: "ludacris" as const,
    name: "Ludacris",
    tagline: "Peak Gaming Performance",
    description: "For those who demand the absolute best. Max settings on every title, future-proofed for years.",
    accentColor: "gaming-gold" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/GcVLC8",
    specs: ["RTX 4090", "Ryzen 9 7950X", "64GB DDR5"],
  },
  {
    id: "esports" as const,
    name: "Esports",
    tagline: "Competition-Ready Performance",
    description: "Built for competitive play. Ultra-low latency, high refresh rates, zero input lag.",
    accentColor: "gaming-blue" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/9NwCpK",
    specs: ["RTX 4070 Super", "Ryzen 7 7800X3D", "32GB DDR5"],
  },
  {
    id: "pro" as const,
    name: "Pro",
    tagline: "AAA-Title Performance",
    description: "Reliable performance on demanding titles. Quality components, hassle-free gaming.",
    accentColor: "gaming-green" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/VJdJzP",
    specs: ["RTX 4060 Ti", "Ryzen 5 7600", "32GB DDR5"],
  },
] as const;
```

### Changes to `src/components/waitlist/TierCard.tsx`

Add props for `specsUrl` and `specs`, then render:
- Specs as small badges/pills
- "View full specs" link to PCPartPicker
- Keep "Yearly upgrade" badge

### Changes to `src/components/howitworks/HowItWorksTierPreview.tsx`

Update the hardcoded `tiers` array with actual URLs and specs.

---

## 2. Insurance Language: Clarify Company Provides It

### Files to Modify (7 files)

| File | Current Text | New Text |
|------|--------------|----------|
| `src/pages/HowItWorks.tsx` (line 34, 51) | "insurance required" | "company-provided insurance included" |
| `src/components/howitworks/WhatsIncluded.tsx` (line 16) | "(Insurance required.)" | "(Company-provided insurance included.)" |
| `src/components/howitworks/HowItWorksHero.tsx` (line 144) | "(insurance required)" | "(company-provided insurance included)" |
| `src/components/howitworks/ThreeSteps.tsx` (line 27) | "(Insurance required.)" | "(Company-provided insurance included.)" |
| `src/components/howitworks/ThePromise.tsx` (line 67) | "Insurance required for repair coverage" | "Company-provided insurance included for repair coverage" |
| `src/components/howitworks/MicroFAQs.tsx` (line 23) | "we require insurance as part of the plan" | "we include insurance as part of the plan" |
| `src/components/howitworks/ComplianceFooter.tsx` (line 17) | "insurance is required" | "company-provided insurance is included" |

---

## 3. Trade-In Computer Spec Fields

### Database Migration Required

Add new columns to `waitlist_signups` table:

```sql
ALTER TABLE public.waitlist_signups
ADD COLUMN trade_in_gpu text,
ADD COLUMN trade_in_cpu text,
ADD COLUMN trade_in_ram text,
ADD COLUMN trade_in_storage text,
ADD COLUMN trade_in_motherboard text,
ADD COLUMN trade_in_uptime text;
```

### Files to Modify

| File | Changes |
|------|---------|
| `src/lib/waitlist-validation.ts` | Add 6 new optional fields to schema |
| `src/components/waitlist/WaitlistForm.tsx` | Add trade-in fields in collapsible section |
| `src/hooks/useWaitlistSubmit.ts` | Include new fields in database insert |

### Schema Updates in `src/lib/waitlist-validation.ts`

```typescript
export const waitlistFormSchema = z.object({
  // ... existing fields ...
  
  // Trade-in spec fields (all optional)
  tradeInGpu: z
    .string()
    .trim()
    .max(100, "GPU must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInCpu: z
    .string()
    .trim()
    .max(100, "CPU must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInRam: z
    .string()
    .trim()
    .max(50, "RAM must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  tradeInStorage: z
    .string()
    .trim()
    .max(100, "Storage must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInMotherboard: z
    .string()
    .trim()
    .max(100, "Motherboard must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInUptime: z
    .string()
    .trim()
    .max(50, "Uptime must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});
```

### Form UI in `src/components/waitlist/WaitlistForm.tsx`

Add a new collapsible "Trade-in Details" section that appears when `tradeInInterest` checkbox is checked:

```text
Trade-in Details Section:
-----------------------------------------
| Trade-ins get up to $1,000 trade-in   |
| value (subject to terms & conditions) |
|                                       |
| GPU *                                 |
| [e.g. RTX 3070, RX 6800]             |
|                                       |
| CPU *                                 |
| [e.g. Ryzen 5 5600X, i7-12700K]      |
|                                       |
| RAM *                                 |
| [e.g. 16GB DDR4, 32GB DDR5]          |
|                                       |
| Storage (optional)                    |
| [e.g. 1TB NVMe SSD]                  |
|                                       |
| Motherboard (optional)                |
| [e.g. B550, Z690]                    |
|                                       |
| Computer Age/Uptime (optional)        |
| [e.g. 2 years, Built 2022]           |
-----------------------------------------
```

### Submit Hook Updates in `src/hooks/useWaitlistSubmit.ts`

Add the new fields to the insert:

```typescript
const { data: insertedData, error: insertError } = await supabase
  .from("waitlist_signups")
  .insert({
    // ... existing fields ...
    trade_in_gpu: data.tradeInGpu || null,
    trade_in_cpu: data.tradeInCpu || null,
    trade_in_ram: data.tradeInRam || null,
    trade_in_storage: data.tradeInStorage || null,
    trade_in_motherboard: data.tradeInMotherboard || null,
    trade_in_uptime: data.tradeInUptime || null,
  })
```

---

## 4. Trade-In Copy

Add the following text above the trade-in fields:

**"Trade-ins get up to $1,000 trade-in value (subject to terms & conditions)."**

This will appear:
1. As a subtext under the "Check my PC for a bonus discount" checkbox
2. As a header in the trade-in details section when expanded

---

## Implementation Summary

### Database Changes
- 6 new nullable text columns in `waitlist_signups`

### File Changes

| File | Type |
|------|------|
| `src/lib/waitlist-validation.ts` | Modify - Add tier specs + trade-in fields |
| `src/components/waitlist/TierCard.tsx` | Modify - Add specs display + link |
| `src/components/waitlist/TierSelector.tsx` | Modify - Pass new props |
| `src/components/waitlist/WaitlistForm.tsx` | Modify - Add trade-in section |
| `src/components/howitworks/HowItWorksTierPreview.tsx` | Modify - Update URLs |
| `src/hooks/useWaitlistSubmit.ts` | Modify - Submit new fields |
| `src/pages/HowItWorks.tsx` | Modify - Insurance language |
| `src/components/howitworks/WhatsIncluded.tsx` | Modify - Insurance language |
| `src/components/howitworks/HowItWorksHero.tsx` | Modify - Insurance language |
| `src/components/howitworks/ThreeSteps.tsx` | Modify - Insurance language |
| `src/components/howitworks/ThePromise.tsx` | Modify - Insurance language |
| `src/components/howitworks/MicroFAQs.tsx` | Modify - Insurance language |
| `src/components/howitworks/ComplianceFooter.tsx` | Modify - Insurance language |

**Total: 13 files modified + 1 database migration**

---

## Technical Notes

### Trade-In Fields Visibility
The trade-in spec fields will only appear when the user checks "Check my PC for a bonus discount" - this keeps the form clean for users not interested in trade-ins.

### Specs Display on Tier Cards
Specs will be shown as compact pills (e.g., `RTX 4090 | Ryzen 9 | 64GB DDR5`) with a subtle "View full build" link to PCPartPicker.

### Performance Considerations
- No new dependencies required
- No additional API calls
- Form fields use same validation pattern (onBlur)

