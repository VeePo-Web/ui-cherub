

# How It Works Page — Roadmap Removal & FAQ Enhancement Plan

---

## Overview

This plan removes the "Roadmap: what you'll see next" section entirely and transforms the Micro-FAQs from basic, defensive answers into compelling, professional, benefit-driven responses that build trust and drive conversions.

---

## Summary of Changes

### Remove
- `Roadmap` component import and usage from `HowItWorks.tsx`
- This removes the entire "Roadmap: what you'll see next" section with its 4 timeline items

### Enhance
- Rewrite all 4 FAQ answers to be more compelling, professional, and sales-oriented
- Apply persuasive copywriting techniques: benefit-first, trust-building, value-reinforcing

---

## Changes to Make

### File 1: `src/pages/HowItWorks.tsx`

**Remove:**
- Line 10: Import statement for Roadmap component
- Line 80: Roadmap component usage

```text
Delete line 10:
import { Roadmap } from "@/components/howitworks/Roadmap";

Delete line 80:
<Roadmap />
```

---

### File 2: `src/components/howitworks/MicroFAQs.tsx`

**Rewrite the FAQ answers** (lines 9-30) with compelling, professional, benefit-driven copy.

---

## FAQ Content Transformation

### FAQ 1: "Is this a lease or rental?"

**Current Answer (Weak):**
> "No. We avoid that language and model. We emphasise performance, trust, reliability, ease, and style."

**Problems:**
- Defensive ("We avoid that language")
- Vague and abstract ("performance, trust, reliability")
- Doesn't explain what it IS, only what it ISN'T
- No benefit to the customer

**New Answer (Compelling):**
> "Think of it as a performance partnership. You pay one predictable monthly fee and we take care of everything—from day-one setup to annual upgrades to covered repairs. No hidden costs, no depreciation headaches, no obsolescence anxiety. Just always-current hardware that keeps you competitive, month after month."

**Why it's better:**
- Reframes positively ("performance partnership")
- Emphasizes tangible benefits (predictable fee, everything handled)
- Addresses pain points (hidden costs, depreciation, obsolescence)
- Ends with the core value proposition

---

### FAQ 2: "Will I know the exact parts?"

**Current Answer (Weak):**
> "Yes. Each tier links to a public parts list with model numbers and a change-log."

**Problems:**
- Too brief and transactional
- Misses the opportunity to build trust
- Doesn't explain WHY transparency matters

**New Answer (Compelling):**
> "Absolutely—we believe in radical transparency. Every tier includes a public parts list with exact model numbers, so you know precisely what's powering your gaming. When we make any upgrade or swap, it's documented in our public change-log with full reasoning. No mystery boxes, no corners cut. You see exactly what you're getting, always."

**Why it's better:**
- Opens with confident affirmation ("Absolutely")
- Introduces brand value ("radical transparency")
- Explains the benefit of the feature
- Addresses potential skepticism ("No mystery boxes, no corners cut")
- Reinforces trust ("You see exactly what you're getting, always")

---

### FAQ 3: "What if a part fails?"

**Current Answer (Weak):**
> "We act fast per our SLA and handle repairs end-to-end. (Insurance required.)"

**Problems:**
- Dry and corporate ("per our SLA")
- Parenthetical feels like a disclaimer/catch
- Doesn't convey care or speed
- No reassurance for the worried customer

**New Answer (Compelling):**
> "We've got you covered—literally. If something fails, you contact us and we handle the rest: diagnosis, parts, labour, and logistics. Our goal is minimal downtime so you're back to gaming fast. That's why we require insurance as part of the plan—it ensures rapid, no-excuses coverage for hardware issues. You focus on playing; we focus on keeping you running."

**Why it's better:**
- Opens warmly ("We've got you covered—literally")
- Details the comprehensive service (diagnosis, parts, labour, logistics)
- Emphasizes speed and minimal downtime
- Reframes insurance as a BENEFIT, not a catch
- Ends with clear value statement

---

### FAQ 4: "Do you publish benchmarks?"

**Current Answer (Weak):**
> "Yes—coming soon. We'll add flagship game examples and FPS/frametime charts to this page."

**Problems:**
- "Coming soon" feels uncertain and underwhelming
- Doesn't build confidence or excitement
- No call to action or engagement

**New Answer (Compelling):**
> "We're building comprehensive benchmark data for every tier—real-world FPS and frametime results across flagship titles so you can see exactly how your rig performs. Waitlist members will be the first to access these results. Want to help shape what games we test? Join the waitlist and let us know your must-play titles."

**Why it's better:**
- Describes what's coming with specificity
- Creates exclusivity ("Waitlist members will be the first")
- Adds engagement opportunity ("help shape what games we test")
- Converts the FAQ into a soft CTA ("Join the waitlist")
- Turns a weakness into an interactive feature

---

## Visual Comparison of FAQ Answers

| Question | Before | After |
|----------|--------|-------|
| Is this a lease or rental? | 22 words, defensive | 67 words, benefit-rich |
| Will I know the exact parts? | 17 words, transactional | 55 words, trust-building |
| What if a part fails? | 15 words, corporate | 67 words, reassuring |
| Do you publish benchmarks? | 18 words, uncertain | 54 words, engaging CTA |

---

## Copywriting Techniques Applied

### 1. Benefit-First Framing
Every answer now leads with what the customer gains, not what we do.

### 2. Objection Handling
Each answer anticipates the underlying concern and addresses it directly:
- "Is this a lease?" → "No hidden costs, no depreciation headaches"
- "What about parts?" → "No mystery boxes, no corners cut"
- "What if something breaks?" → "minimal downtime... back to gaming fast"
- "Where are the benchmarks?" → "Waitlist members will be the first to access"

### 3. Trust Signals
- "radical transparency"
- "public change-log with full reasoning"
- "You see exactly what you're getting, always"

### 4. Emotional Resonance
- "obsolescence anxiety"
- "You focus on playing; we focus on keeping you running"
- "your must-play titles"

### 5. Soft CTAs
The benchmark answer converts a potential weakness into a waitlist driver.

---

## Files to Modify

| File | Action | Details |
|------|--------|---------|
| `src/pages/HowItWorks.tsx` | Remove | Delete Roadmap import (line 10) and usage (line 80) |
| `src/components/howitworks/MicroFAQs.tsx` | Update | Replace all 4 FAQ answers with compelling new copy |

---

## Page Flow After Changes

```text
Current Flow:
Hero → Who It's For → The Promise → Three Steps → What's Included → 
Comparison → Rollout → ROADMAP → Experience → FAQs → CTA → Footer

New Flow:
Hero → Who It's For → The Promise → Three Steps → What's Included → 
Comparison → Rollout → Experience → FAQs (Enhanced) → CTA → Footer
```

The removal of Roadmap creates a tighter narrative flow, moving directly from Rollout/Availability to The Experience to FAQs to CTA—a natural progression from "where" to "what it feels like" to "common questions" to "action."

---

## Updated FAQ Data Structure

```typescript
const faqs = [
  {
    question: "Is this a lease or rental?",
    answer:
      "Think of it as a performance partnership. You pay one predictable monthly fee and we take care of everything—from day-one setup to annual upgrades to covered repairs. No hidden costs, no depreciation headaches, no obsolescence anxiety. Just always-current hardware that keeps you competitive, month after month.",
  },
  {
    question: "Will I know the exact parts?",
    answer:
      "Absolutely—we believe in radical transparency. Every tier includes a public parts list with exact model numbers, so you know precisely what's powering your gaming. When we make any upgrade or swap, it's documented in our public change-log with full reasoning. No mystery boxes, no corners cut. You see exactly what you're getting, always.",
  },
  {
    question: "What if a part fails?",
    answer:
      "We've got you covered—literally. If something fails, you contact us and we handle the rest: diagnosis, parts, labour, and logistics. Our goal is minimal downtime so you're back to gaming fast. That's why we require insurance as part of the plan—it ensures rapid, no-excuses coverage for hardware issues. You focus on playing; we focus on keeping you running.",
  },
  {
    question: "Do you publish benchmarks?",
    answer:
      "We're building comprehensive benchmark data for every tier—real-world FPS and frametime results across flagship titles so you can see exactly how your rig performs. Waitlist members will be the first to access these results. Want to help shape what games we test? Join the waitlist and let us know your must-play titles.",
  },
];
```

---

## Implementation Order

1. Remove Roadmap import and usage from `HowItWorks.tsx`
2. Update FAQ answers in `MicroFAQs.tsx`
3. Test page flow to ensure sections connect smoothly
4. Verify accordion functionality still works correctly

---

## Success Criteria

1. Roadmap section no longer appears on the How It Works page
2. All 4 FAQ answers are updated with new compelling copy
3. FAQ accordion still functions correctly (expand/collapse)
4. Page flow feels natural without the Roadmap section
5. FAQ answers address objections and build trust
6. Benchmark FAQ includes soft CTA for waitlist

