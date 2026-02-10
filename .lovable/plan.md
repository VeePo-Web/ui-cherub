

# Performance Optimization and Email Notification Setup

## Overview

Two objectives: (1) ensure the waitlist site is performance-optimized and everything works perfectly, and (2) add email notifications to **connor@olausen.ca** whenever someone submits the waitlist form.

---

## Part 1: Email Notification to connor@olausen.ca

### Approach

Rather than relying on the Resend-based confirmation email (which requires a RESEND_API_KEY that is not currently configured), we will modify the `waitlist-signup` edge function to also send a **notification email to connor@olausen.ca** using Resend. This way, every signup triggers an email to you with the submitter's details.

### Prerequisite: RESEND_API_KEY

You will need to:
1. Sign up at [resend.com](https://resend.com) (if you haven't already)
2. Verify your domain at [resend.com/domains](https://resend.com/domains) (e.g., olausen.ca)
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
4. Provide the API key so it can be added as a project secret

Without this key, emails cannot be sent.

### Changes to `supabase/functions/waitlist-signup/index.ts`

After the successful database insert, add a fetch call to Resend's API that sends a notification email to connor@olausen.ca containing:
- Submitter's name, email, selected tier
- Phone number and budget range (if provided)
- Trade-in details (if provided)
- Queue position

This is a fire-and-forget call -- if the email fails, the signup still succeeds.

### Changes to `supabase/functions/send-waitlist-confirmation/index.ts`

- Update the "from" address and footer branding from "Gaming PC Subscription" to "Unbound - Gaming"
- This function remains dormant until RESEND_API_KEY is configured

### Changes to `src/hooks/useWaitlistSubmit.ts`

No changes needed -- the confirmation email call already exists and gracefully handles failures.

---

## Part 2: Performance Verification and Optimizations

After auditing the codebase, the site already follows many best practices. The following minor improvements will be made:

### 2a. Font Loading Optimization (`index.html`)

The current font loading uses `preload` + `onload` pattern which is correct. No changes needed.

### 2b. Image Optimization

The site uses no raster images in the main flow (all SVG/CSS), so image optimization is not applicable. The `placeholder.svg` and `badge.png` in assets are not used in the critical path.

### 2c. Code Splitting

Already implemented via `React.lazy()` in `App.tsx` for all three routes. No changes needed.

### 2d. CSS Performance (`src/index.css`)

Already has:
- `content-visibility: auto` for off-screen sections
- `will-change` and `contain` utilities
- Comprehensive `prefers-reduced-motion` support
- GPU acceleration classes

No changes needed.

### 2e. Network Optimization (`index.html`)

Already has:
- `dns-prefetch` for Google Fonts and backend
- `preconnect` for the same
- Non-blocking font loading with `media="print"` + `onload`

No changes needed.

### 2f. Form Performance (`WaitlistForm.tsx`)

Already optimized with:
- `mode: "onBlur"` validation (not onChange)
- `useMemo` and `useCallback` for handlers
- Memoized tier info lookups

No changes needed.

### 2g. Spots Remaining Cache (`useActualSpotsRemaining.ts`)

Already uses sessionStorage with 1-minute TTL and `head: true` for count-only queries. No changes needed.

---

## Summary of File Changes

| Action | File | Change |
|--------|------|--------|
| Modify | `supabase/functions/waitlist-signup/index.ts` | Add notification email to connor@olausen.ca after successful insert |
| Modify | `supabase/functions/send-waitlist-confirmation/index.ts` | Update branding to "Unbound - Gaming" |
| Secret | `RESEND_API_KEY` | Required -- user must provide from resend.com |

The site is already well-optimized for performance. The primary actionable change is wiring up the email notification so you receive submissions at connor@olausen.ca.

