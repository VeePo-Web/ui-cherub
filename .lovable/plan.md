
# 🎮 Gaming PC Subscription Waitlist — Comprehensive Implementation Plan

## Executive Summary
A premium, Fantasy.co-inspired one-pager waitlist for a gaming PC subscription service targeting Canadian gamers. The design features **orange (#fc7e30) on purple** with medium-motion micro-interactions, visual tier selection cards, and a full-screen modal celebration on signup.

---

## 🎨 Design System

### Brand Colors
| Role | Color | Usage |
|------|-------|-------|
| Primary Accent | `#fc7e30` (Orange) | CTAs, highlights, tier cards, active states |
| Background | Deep Purple Gradient | `#1a0a2e` → `#2d1b4e` |
| Text Primary | `#ffffff` | Headlines, important copy |
| Text Secondary | `#c4b5d6` | Body text, labels |
| Card Background | `rgba(255,255,255,0.05)` | Glass-morphism effect |
| Border Glow | `rgba(252,126,48,0.3)` | Hover states, focus rings |

### Typography
- **Headlines**: Host Grotesk Bold (already installed), tight letter-spacing
- **Body**: Host Grotesk Regular, generous line-height for readability

### Micro-Interactions (Medium Motion)
- **Scroll reveals**: Sections fade up as they enter viewport
- **Button hover**: Scale up slightly + glow effect + gradient shift
- **Form field focus**: Orange border glow + subtle lift
- **Tier card selection**: Scale + border glow + checkmark animation
- **Loading states**: Pulsing CTA button during submission
- **Modal entrance**: Scale up from center with backdrop blur

---

## 📐 Page Structure (Single Page)

### Section 1: Hero (Above the Fold)
**Purpose**: Instant value communication + first CTA exposure

| Element | Content |
|---------|---------|
| H1 | "Always-current performance. Zero hassle. One monthly price." |
| Subtitle | "all repairs covered. insurance req. yearly upgrades." |
| Primary CTA | "be the first to know when we launch in your area — 10% discount first three months" |
| Visual | Animated gradient background with subtle particle effects (gaming aesthetic) |

**Animations**:
- H1 fades in from below (staggered word reveal)
- Subtitle fades in after headline
- CTA button pulses gently to draw attention
- Background gradient slowly animates

### Section 2: Tier Selection Cards
**Purpose**: Let users see and select their preferred tier before filling the form

| Tier | Performance Promise | Visual Style |
|------|---------------------|--------------|
| **Ludacris** | "Peak Gaming Performance" | Gold/premium accent |
| **Esports** | "Competition-Ready Performance" | Electric blue accent |
| **Pro** | "AAA-Title Performance" | Green accent |

**Card Design**:
- Horizontal layout on desktop, vertical stack on mobile
- Glass-morphism cards with subtle border
- Tier name + performance promise + "SELECT" button
- Selected state: Orange glow border + checkmark badge
- Hover state: Lift + enhanced glow

**Animations**:
- Cards fade in staggered as user scrolls
- Click triggers scale pulse + selection animation

### Section 3: Waitlist Form
**Purpose**: Capture qualified leads with progressive, low-friction design

**Form Fields**:
| Field | Type | Validation |
|-------|------|------------|
| Email* | email input | Required, valid email format |
| First Name* | text input | Required, max 50 chars |
| Last Name* | text input | Required, max 50 chars |
| Preferred Tier* | Auto-filled from card selection | Required |
| Phone Number | tel input | Optional, formatted |
| Budget | select dropdown | Ranges: $50-100, $100-150, $150-200, $200+ |
| Trade-in Interest | yes/no toggle | Optional |
| Mailing List | checkbox | Default unchecked (GDPR-friendly) |

**Form UX**:
- Single-column layout
- Real-time validation with green checkmarks
- Error states with orange underline + shake animation
- Submit button shows loading spinner during API call

**Animations**:
- Form fades in as section enters view
- Fields highlight with orange glow on focus
- Successful validation shows checkmark slide-in

### Section 4: Geographic Coverage
**Purpose**: Set expectations for service area

**Content**: "soon to be enrolling greater calgary area → followed by all of alberta → moving to BC next"

**Design**: Timeline/roadmap visual with location pins and dotted line connecting them

---

## 🎉 Thank-You Modal (Full-Screen Overlay)

**Trigger**: Successful form submission

**Content**:
- Large celebratory headline: "You're on the list! 🎮"
- Personalized message: "Thanks, [First Name]! You're #[queue_position] in line."
- Coupon display: Large, styled coupon code box with "EARLY10" (10% discount)
- Next steps: "Check your email for your welcome message and coupon code"
- Social share buttons: Twitter, Facebook, copy link
- Close button

**Animations**:
- Backdrop blur fades in
- Modal scales from 90% → 100% with spring easing
- Optional: Confetti particles burst on open
- Queue position counter animates up

---

## 💾 Database Schema

### Table: `waitlist_signups`
```
id: uuid (primary key, auto-generated)
created_at: timestamp (default now())
email: text (unique, required)
first_name: text (required)
last_name: text (required)
preferred_tier: text (enum: 'ludacris', 'esports', 'pro')
phone_number: text (nullable)
budget_range: text (nullable)
trade_in_interest: boolean (default false)
mailing_list_opt_in: boolean (default false)
coupon_code: text (generated on signup)
queue_position: integer (auto-incremented)
referral_source: text (nullable, for tracking)
```

### RLS Policies
- **INSERT**: Allow anyone to insert (public waitlist)
- **SELECT**: Only allow users to read their own row (for queue position)
- **UPDATE/DELETE**: Disabled (admin-only via backend)

---

## 📧 Email Flow (Resend Integration)

### Edge Function: `send-waitlist-confirmation`
**Trigger**: Called after successful database insert

**Email Content**:
- From: "Team [Placeholder Brand]" <noreply@yourdomain.com>
- Subject: "You're on the waitlist! Here's your 10% discount 🎮"
- Body:
  - Personalized greeting
  - Queue position
  - Coupon code: **EARLY10**
  - What to expect next
  - Social share links

**Required Secret**: `RESEND_API_KEY` (user will need to provide this)

---

## 📱 Responsive Design

### Desktop (1200px+)
- Two-column hero: copy left, animated visual right
- Tier cards in horizontal row
- Form in centered container (max-width 600px)

### Tablet (768px-1199px)
- Single-column hero, stacked
- Tier cards in 2-column grid
- Full-width form

### Mobile (< 768px)
- Single-column everything
- Tier cards stack vertically
- Large touch targets (min 48px)
- Sticky CTA button at bottom of viewport
- Form fields expand full-width

---

## ⚡ Performance Optimizations

- **Lazy loading**: Tier cards and form sections load on scroll
- **Optimized animations**: Use CSS transforms only (GPU-accelerated)
- **Minimal dependencies**: Leverage existing UI components
- **Image optimization**: WebP format, responsive sizes
- **Target metrics**: < 2.5s LCP, < 100ms FID

---

## 🔐 Security Measures

- **Input validation**: Zod schemas for all form fields (client + server)
- **Rate limiting**: Prevent spam submissions via edge function
- **Email validation**: Real-time format check + backend verification
- **SQL injection prevention**: Parameterized queries via Supabase client
- **XSS prevention**: All user input sanitized before display

---

## 📊 Analytics & Tracking (Future-Ready)

Prepared hooks for:
- Form submission events
- Tier selection tracking
- Drop-off points
- Referral attribution
- A/B test variants

---

## 🗂️ File Structure

```
src/
├── pages/
│   └── Index.tsx (redirects to Waitlist)
│   └── Waitlist.tsx (new main page)
├── components/
│   └── waitlist/
│       ├── WaitlistHero.tsx
│       ├── TierSelector.tsx
│       ├── TierCard.tsx
│       ├── WaitlistForm.tsx
│       ├── GeoCoverage.tsx
│       ├── ThankYouModal.tsx
│       └── SocialShare.tsx
├── hooks/
│   └── useWaitlistSubmit.ts
├── lib/
│   └── waitlist-validation.ts (Zod schemas)
supabase/
├── functions/
│   └── send-waitlist-confirmation/
│       └── index.ts
├── migrations/
│   └── [timestamp]_create_waitlist_signups.sql
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation
1. Create database table with RLS policies
2. Set up color system and CSS variables
3. Build Hero section with animations

### Phase 2: Core Components
4. Build TierCard component with selection logic
5. Build WaitlistForm with validation
6. Create ThankYouModal with animations

### Phase 3: Backend Integration
7. Wire form to Supabase insert
8. Create edge function for Resend email
9. Add secret for RESEND_API_KEY

### Phase 4: Polish
10. Add scroll-reveal animations
11. Responsive refinements
12. Performance optimization
13. Accessibility audit

---

## ⚠️ Pre-Implementation Requirements

Before building, you'll need to:
1. **Add RESEND_API_KEY secret** — Go to [resend.com](https://resend.com), create an account, verify your domain, and generate an API key
2. **Decide on brand name** — Currently using placeholder; update copy once decided
3. **Provide logo** — Optional for initial build; can add later

---

## 🎯 Success Metrics (Post-Launch)

- **Primary**: Waitlist conversion rate (target: 15-25%)
- **Secondary**: Email open rate, social shares, tier distribution
- **Tertiary**: Mobile vs desktop conversion, time to complete form

