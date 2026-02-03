
# How It Works Page — Comprehensive Design & Implementation Plan

---

## Executive Summary

This plan outlines the creation of a new standalone "How It Works" page that explains the gaming PC subscription service in depth. The page will follow Fantasy.co's design philosophy while maintaining visual consistency with the existing waitlist page. It will serve as an educational/trust-building resource that guides visitors through the service model before they join the waitlist.

---

## 1. Information Architecture

### 1.1 Page Sections (Narrative Flow)

The page will unfold as a story, revealing information in logical chapters:

```text
1. Hero Section          — "How It Works" headline + subhead
2. Who It's For          — Qualify the reader, build empathy
3. The Promise           — Plain English value prop
4. The Three Steps       — Interactive step cards with tier preview
5. What's Included       — Feature grid across all tiers
6. Why This Beats Buying — Comparison section (us vs. retail)
7. Roadmap               — Coming soon features
8. The Experience        — Vision casting paragraph
9. Micro-FAQs            — Accordion with common questions
10. CTA Section          — Final push to waitlist
11. Compliance Footer    — Legal fine print
12. Footer               — Consistent with Waitlist page
```

### 1.2 Page URL & Navigation

- **Route**: `/how-it-works`
- **Navigation**: Add link to site navigation (new simple nav component for this page)
- The existing Navbar.tsx is designed for a different app (events platform) — will create a new lightweight nav specific to the waitlist/how-it-works pages

---

## 2. Component Architecture

### 2.1 New Files to Create

```text
src/pages/HowItWorks.tsx                    — Main page component
src/components/howitworks/
├── HowItWorksHero.tsx                      — Hero section
├── WhoItsFor.tsx                           — Target audience section
├── ThePromise.tsx                          — Value proposition section
├── ThreeSteps.tsx                          — Interactive step cards
├── HowItWorksTierPreview.tsx               — Mini tier cards for step 1
├── WhatsIncluded.tsx                       — Feature grid
├── ComparisonSection.tsx                   — Us vs. retail
├── Roadmap.tsx                             — Coming soon features
├── TheExperience.tsx                       — Vision casting
├── MicroFAQs.tsx                           — Accordion FAQ
├── HowItWorksCTA.tsx                       — Final CTA section
├── HowItWorksNav.tsx                       — Simple floating nav
└── ComplianceFooter.tsx                    — Legal text
```

### 2.2 Shared Components to Reuse

From existing codebase:
- `src/components/ui/accordion.tsx` — For FAQ section
- `src/lib/utils.ts` — cn() utility
- `src/lib/waitlist-validation.ts` — tierOptions data
- Motion patterns from `WaitlistHero.tsx`
- Color system from `index.css`
- Trust badge pattern from `TrustBadges.tsx`

---

## 3. Detailed Section Designs

### 3.1 Hero Section — `HowItWorksHero.tsx`

**Visual Design:**
- Full-viewport hero with animated gradient background (reuse orb pattern from WaitlistHero)
- Headline: "HOW IT WORKS" (uppercase, tracking-wide, primary color)
- Subhead: "The competitive PC that just stays competitive."
- Sub-subhead: "Annual upgrades, covered repairs (insurance required), and transparent builds—under one predictable monthly plan."

**Micro-interactions:**
- Staggered text reveal (existing pattern)
- Subtle grid overlay
- Scroll indicator at bottom

**Code Structure:**
```tsx
<section className="relative min-h-[80vh] flex flex-col items-center justify-center">
  {/* Animated gradient background */}
  {/* Grid pattern overlay */}
  <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
    <motion.span className="text-sm uppercase tracking-widest text-primary">
      HOW IT WORKS
    </motion.span>
    <motion.h1>The competitive PC that just stays competitive.</motion.h1>
    <motion.p>Annual upgrades, covered repairs...</motion.p>
  </div>
</section>
```

### 3.2 Who It's For — `WhoItsFor.tsx`

**Visual Design:**
- Centered text block with generous margins
- Section title: "Who it's for (read this if you value your time)"
- Paragraph of empathy-building copy from the brief

**Copy (exact from brief):**
> "You want the performance, not the parts-hunt. You want stable frametimes, fast support, and to feel taken care of—with a spend that's predictable every month. You want to be the dependable teammate, not the friend reinstalling drivers on patch day."

**Micro-interactions:**
- Fade-in on scroll
- Subtle text highlight on keywords

### 3.3 The Promise — `ThePromise.tsx`

**Visual Design:**
- Card-style container with subtle border
- Section title: "The promise (in plain English)"
- Copy from brief explaining scheduled upgrades, trigger-based refreshes, covered repairs

**Layout:**
```text
┌────────────────────────────────────────────────────┐
│  THE PROMISE (in plain English)                    │
│                                                    │
│  We keep your desktop current and reliable...     │
│  (Insurance required.)                             │
└────────────────────────────────────────────────────┘
```

### 3.4 The Three Steps — `ThreeSteps.tsx`

**Visual Design:**
- Numbered step cards in a vertical timeline layout
- Each step has:
  - Number badge (1, 2, 3)
  - Title
  - Description
  - Interactive element or visual

**Step 1: Pick your performance tier**
- Mini tier preview cards (clickable, link to waitlist)
- Each card shows: tier name, tagline, "See exact parts via public list" link, "(Monthly subscription: TBD.)"
- Footer text: "Transparency is a feature: every tier maps to a live PCPartPicker build so you know what's inside before you join."

**Step 2: Join the competitive waitlist**
- Description about locking launch window
- CTA button: "be the first to know when we launch in your area" with "10% discount first three months" subtitle
- Links to waitlist page scroll-to-form

**Step 3: Delivery & care**
- Description about prep, verify, handover
- Icons for: annual upgrades, interim refreshes, covered repairs

**Micro-interactions:**
- Step cards animate in sequentially on scroll
- Hover lift on step cards
- Tier preview cards have same tactile feel as main tier cards (but smaller)

### 3.5 Mini Tier Preview — `HowItWorksTierPreview.tsx`

**Visual Design:**
- Compact version of TierCard
- Three cards side by side
- Crown/Zap/Gamepad2 icons
- Tier name, tagline
- "See exact parts" link (opens PCPartPicker in new tab — placeholder # for now)
- "Monthly subscription: TBD" text

**Layout:**
```text
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 👑 Ludacris     │ │ ⚡ Esports      │ │ 🎮 Pro          │
│ Peak Gaming...  │ │ Competition...  │ │ AAA-Title...    │
│ See exact parts │ │ See exact parts │ │ See exact parts │
│ TBD/mo          │ │ TBD/mo          │ │ TBD/mo          │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 3.6 What's Included — `WhatsIncluded.tsx`

**Visual Design:**
- Feature grid with icons
- 4 items in 2x2 grid on mobile, 4 columns on desktop

**Features:**
1. Annual upgrade plan (with interim refresh triggers tied to major releases)
2. Covered repairs with fast turnaround (Insurance required)
3. Public parts lists (model numbers visible)
4. Planned trade-in path to simplify moving up a tier

**Icons:** RefreshCw, Shield, FileCheck, ArrowUpCircle

**Layout:**
```text
┌─────────────┬─────────────┐
│ 🔄 Annual   │ 🛡️ Covered  │
│   upgrade   │   repairs   │
├─────────────┼─────────────┤
│ 📋 Public   │ ↗️ Trade-in │
│   parts     │   path      │
└─────────────┴─────────────┘
```

### 3.7 Why This Beats Buying — `ComparisonSection.tsx`

**Visual Design:**
- Two-column comparison layout
- Left: "Retail" (pain points)
- Right: "This plan" (solutions)
- Clear visual distinction (muted vs. primary colors)

**Content from brief:**
- Retail: "You shoulder upgrade timing, resale, repair costs, and downtime."
- This plan: "We publish the parts, schedule the upgrade, and cover repairs under one monthly line item—local, transparent, performance-first."

**Bottom note:**
> "We avoid 'lease,' 'rental,' and 'finance' language on purpose—this is a clarity-first model built around performance, trust, and ease."

**Layout:**
```text
┌────────────────────┬────────────────────┐
│    RETAIL          │   THIS PLAN        │
│    (muted)         │   (highlighted)    │
├────────────────────┼────────────────────┤
│ • You shoulder...  │ • We publish...    │
│ • Upgrade timing   │ • Schedule upgrade │
│ • Resale           │ • Cover repairs    │
│ • Repair costs     │ • One monthly line │
│ • Downtime         │ • Zero downtime    │
└────────────────────┴────────────────────┘
```

### 3.8 Roadmap — `Roadmap.tsx`

**Visual Design:**
- Vertical timeline with "Coming Soon" items
- Each item has icon, title, description

**Items:**
1. Benchmarks & flagship games — FPS/frametime examples
2. Spec Integrity Ledger — public change-log
3. Referral & queue position — ways to move up
4. Community flywheel — esports tournaments

**Micro-interactions:**
- Items fade in sequentially
- Pulsing indicator on first item ("Coming soon")

### 3.9 The Experience — `TheExperience.tsx`

**Visual Design:**
- Large quote-style text block
- Centered, with generous padding
- Italic or different font weight for emphasis

**Copy (exact from brief):**
> "From first click to first game, the experience should feel effortless. Minimal decisions. Clear promises. Human support that speaks 'gamer.' Your job is to play; our job is to keep you current—without drama, delays, or driver roulette."

### 3.10 Micro-FAQs — `MicroFAQs.tsx`

**Visual Design:**
- Accordion component (reuse existing)
- Minimal styling, consistent with page aesthetic
- 4 questions from brief

**Questions:**
1. Is this a lease or rental?
2. Will I know the exact parts?
3. What if a part fails?
4. Do you publish benchmarks?

**Answers:** Exact copy from brief

### 3.11 CTA Section — `HowItWorksCTA.tsx`

**Visual Design:**
- Full-width section with gradient background
- Headline: "Join the waitlist"
- Subhead: "Lock your upgrade window and early-access pricing."
- CTA button: "be the first to know when we launch in your area" with "10% discount first three months"
- Links to waitlist page (or scrolls to form if same-page)

**Micro-interactions:**
- Button glow-pulse animation
- Hover scale

### 3.12 Navigation — `HowItWorksNav.tsx`

**Visual Design:**
- Fixed position top-left (consistent with existing Navbar position)
- Minimal design: logo + "Home" + "How It Works" + "Join Waitlist"
- Mobile hamburger menu

**Layout:**
```text
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  HOME  HOW IT WORKS  [JOIN WAITLIST - highlighted]  │
└─────────────────────────────────────────────────────────────┘
```

### 3.13 Compliance Footer — `ComplianceFooter.tsx`

**Visual Design:**
- Small text, muted color
- Legal copy from brief about repairs, insurance, upgrades

---

## 4. Technical Implementation Details

### 4.1 Route Setup

Update `src/App.tsx`:
```tsx
import HowItWorks from "./pages/HowItWorks";

<Route path="/how-it-works" element={<HowItWorks />} />
```

### 4.2 SEO Integration

Create SEO component with meta from brief:
```tsx
<Helmet>
  <title>How It Works — Always-current gaming performance with yearly upgrades & covered repairs (Calgary)</title>
  <meta name="description" content="See how our three-tier monthly plan keeps your desktop competitive..." />
  {/* JSON-LD schema from brief */}
</Helmet>
```

### 4.3 Schema Markup

Add HowTo schema from brief as JSON-LD script tag

### 4.4 Shared State

- `useActualSpotsRemaining` hook can be reused for scarcity counter
- Tier data from `waitlist-validation.ts`

### 4.5 Cross-Page Navigation

- "Join Waitlist" button in nav links to `/` (waitlist page)
- Step 2 CTA links to `/?scrollTo=form` or uses React Router navigation with state
- Consider using `Link` from react-router-dom with scroll behavior

---

## 5. Animation & Micro-Interaction Specifications

### 5.1 Scroll Animations

All sections use `whileInView` from Framer Motion:
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

### 5.2 Stagger Delays

For lists/grids, stagger children:
```tsx
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### 5.3 Hover States

All interactive elements:
- Cards: `whileHover={{ scale: 1.02, y: -4 }}`
- Buttons: `whileHover={{ scale: 1.02 }}`
- Links: underline on hover

### 5.4 Reduced Motion

Respect `prefers-reduced-motion`:
```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

---

## 6. Mobile Responsiveness

### 6.1 Breakpoint Strategy

- Mobile-first approach
- `sm:` (640px) — Minor adjustments
- `md:` (768px) — Two-column layouts
- `lg:` (1024px) — Full desktop layouts

### 6.2 Mobile-Specific Considerations

- Single-column layouts by default
- Larger touch targets (min 44px)
- Sticky CTA at bottom on mobile
- Collapsible sections for long content
- Reduced animation complexity

---

## 7. Accessibility Requirements

### 7.1 Semantic HTML

- Proper heading hierarchy (h1 > h2 > h3)
- Landmark regions (nav, main, section, footer)
- ARIA labels where needed

### 7.2 Focus Management

- Visible focus indicators
- Skip-to-content link
- Logical tab order

### 7.3 Screen Reader Support

- Alt text for decorative elements (empty alt)
- Descriptive link text
- Accordion aria-expanded states (handled by Radix)

---

## 8. Performance Considerations

### 8.1 Code Splitting

- Each section component can be lazy-loaded if needed
- Critical hero renders immediately

### 8.2 Animation Performance

- Use `will-change-transform` on animated elements
- Reduce orb count on mobile (existing pattern)
- Use CSS animations where possible

### 8.3 Bundle Size

- Reuse existing components
- No new dependencies required
- Framer Motion already installed

---

## 9. File Structure Summary

```text
src/
├── pages/
│   └── HowItWorks.tsx              ← NEW
├── components/
│   └── howitworks/                 ← NEW FOLDER
│       ├── HowItWorksHero.tsx
│       ├── WhoItsFor.tsx
│       ├── ThePromise.tsx
│       ├── ThreeSteps.tsx
│       ├── HowItWorksTierPreview.tsx
│       ├── WhatsIncluded.tsx
│       ├── ComparisonSection.tsx
│       ├── Roadmap.tsx
│       ├── TheExperience.tsx
│       ├── MicroFAQs.tsx
│       ├── HowItWorksCTA.tsx
│       ├── HowItWorksNav.tsx
│       └── ComplianceFooter.tsx
└── App.tsx                         ← MODIFY (add route)
```

---

## 10. Implementation Order

1. Create `HowItWorksNav.tsx` — Navigation component
2. Create `HowItWorksHero.tsx` — Hero section
3. Create `HowItWorks.tsx` page scaffold
4. Add route to `App.tsx`
5. Create remaining section components in narrative order
6. Add SEO/schema markup
7. Test responsiveness
8. Test accessibility
9. Cross-link with waitlist page

---

## 11. Content Verification

All copy will be taken exactly from the provided brief, including:
- Headlines and subheadlines
- Body copy paragraphs
- FAQ questions and answers
- Legal/compliance text
- Meta descriptions and schema markup

---

## 12. Visual Consistency Checklist

Ensure matching with Waitlist page:
- Color palette (purple background, orange primary)
- Typography (Host Grotesk)
- Border radius (rounded-xl, rounded-2xl)
- Gradient orb animations
- Card styling (bg-card/50 backdrop-blur-sm)
- Glow effects on CTAs
- Trust badge styling
- Footer design

---

## 13. Success Criteria

1. Page loads in under 3 seconds
2. All sections animate smoothly on scroll
3. Mobile layout is single-column and touch-friendly
4. Navigation works correctly between pages
5. CTA buttons link to waitlist form
6. FAQ accordion functions correctly
7. Schema markup validates in testing tools
8. Accessibility audit passes (axe, Lighthouse)
9. Zero console errors
10. Consistent visual language with waitlist page
