

# Form, Email & Popup Performance Optimization Plan

## Executive Summary

This plan ensures the waitlist form, confirmation emails, and thank-you modal work flawlessly while being extremely performance-optimized. Based on thorough code analysis, I've identified several issues that need to be addressed and optimizations to implement.

---

## Current State Analysis

### Critical Issue Identified

| Component | Issue | Severity |
|-----------|-------|----------|
| **Edge Function** | `RESEND_API_KEY` secret is NOT configured | CRITICAL |
| **Edge Function** | `verify_jwt` not explicitly set in config.toml | Medium |
| **Form** | Mobile sticky button calls `handleFormSubmit` directly which bypasses validation | Bug |
| **ThankYouModal** | Multiple useEffect dependencies could cause stale closures | Medium |
| **TierCard** | Missing `aria-pressed` for accessibility | Low |

### Secrets Status
- `RESEND_API_KEY`: NOT FOUND - emails will fail silently
- This explains why the edge function has no logs - it's likely failing on API key retrieval

---

## Phase 1: Fix Critical Email Functionality

### 1.1 Add RESEND_API_KEY Secret

The edge function requires a Resend API key to send confirmation emails. This must be configured before emails will work.

**Action Required:** User must provide their Resend API key from https://resend.com/api-keys

### 1.2 Update Edge Function Configuration

**File: `supabase/config.toml`**

Add explicit function configuration:

```toml
project_id = "sjlkfitixkwocusfbllv"

[functions.send-waitlist-confirmation]
verify_jwt = false
```

### 1.3 Improve Edge Function Error Handling

**File: `supabase/functions/send-waitlist-confirmation/index.ts`**

Add better error handling and logging:

```typescript
// At the start of the handler, add early validation
if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not configured - check Supabase secrets");
  return new Response(
    JSON.stringify({ 
      error: "Email service not configured",
      hint: "RESEND_API_KEY secret is missing" 
    }),
    { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
}
```

---

## Phase 2: Fix Form Mobile Bug

### 2.1 Fix Mobile Submit Button

**File: `src/components/waitlist/WaitlistForm.tsx`**

**Current Bug (Line 475):**
```tsx
onClick={selectedTier ? handleFormSubmit : handleSubmitClick}
```

**Issue:** When tier is selected, clicking the mobile button calls `handleFormSubmit` directly. However, `handleFormSubmit` is the wrapped `handleSubmit(async (data) => {...})` which is correct for form submission, BUT the button has `type="submit"` when tier is selected, so it will trigger form submission twice.

**Fix:** The mobile button should always be `type="button"` since it manually triggers submission:

```tsx
<motion.button
  type="button"  // Always button, never submit
  onClick={selectedTier ? handleFormSubmit : handleSubmitClick}
  disabled={isSubmitting}
  // ... rest of props
>
```

### 2.2 Add Form Error State Feedback

Add visual feedback when form submission fails on mobile:

```tsx
// Add to mobile button section
{errors && Object.keys(errors).length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-20 left-4 right-4 p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-center text-sm text-destructive z-40"
  >
    Please fix the errors above
  </motion.div>
)}
```

---

## Phase 3: Optimize Form Performance

### 3.1 Memoize Callbacks

**File: `src/components/waitlist/WaitlistForm.tsx`**

Wrap event handlers in `useCallback` to prevent unnecessary re-renders:

```typescript
import { useCallback, useMemo } from "react";

// Memoize the submit handler
const handleFormSubmit = useCallback(
  handleSubmit(async (data) => {
    await onSubmit(data);
  }),
  [handleSubmit, onSubmit]
);

// Memoize the scroll handler
const handleSubmitClick = useCallback(() => {
  if (!selectedTier && onScrollToTiers) {
    onScrollToTiers();
  }
}, [selectedTier, onScrollToTiers]);

// Memoize tier info lookup
const selectedTierInfo = useMemo(
  () => tierOptions.find((t) => t.id === selectedTier),
  [selectedTier]
);
```

### 3.2 Debounce Progress Celebration Effect

The progress effect triggers on every field change. Add debouncing:

```typescript
// Replace the milestone detection with debounced version
useEffect(() => {
  const milestones = [50, 75, 100];
  const crossed = milestones.find(m => progressPercent >= m && prevProgress < m);
  if (crossed) {
    // Debounce celebration to avoid rapid re-triggers
    const timer = setTimeout(() => {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 500);
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }, 100);
    return () => clearTimeout(timer);
  }
  setPrevProgress(progressPercent);
}, [progressPercent, prevProgress]);
```

### 3.3 Fix Conditional Hook Issue

**Current Issue (Line 80-82):**
```tsx
if (selectedTier && watch("preferredTier") !== selectedTier) {
  setValue("preferredTier", selectedTier);
}
```

This runs on every render and causes unnecessary updates. Move to `useEffect`:

```typescript
// Replace with useEffect
useEffect(() => {
  if (selectedTier) {
    setValue("preferredTier", selectedTier);
  }
}, [selectedTier, setValue]);
```

---

## Phase 4: Optimize ThankYouModal

### 4.1 Fix Effect Dependencies

**File: `src/components/waitlist/ThankYouModal.tsx`**

The counter animation effect has a potential memory leak. Fix cleanup:

```typescript
// Line 57-84: Improve cleanup
useEffect(() => {
  if (!isOpen || queuePosition <= 1) {
    setDisplayPosition(queuePosition || 1);
    return;
  }

  let intervalId: NodeJS.Timeout | null = null;
  const startDelay = setTimeout(() => {
    const duration = 800;
    const steps = 20;
    const increment = queuePosition / steps;
    let current = 1;

    intervalId = setInterval(() => {
      current += increment;
      if (current >= queuePosition) {
        setDisplayPosition(queuePosition);
        if (intervalId) clearInterval(intervalId);
      } else {
        setDisplayPosition(Math.floor(current));
      }
    }, duration / steps);
  }, 300);

  // Proper cleanup
  return () => {
    clearTimeout(startDelay);
    if (intervalId) clearInterval(intervalId);
  };
}, [isOpen, queuePosition]);
```

### 4.2 Memoize Share Handlers

```typescript
// Already using useCallback for handleCopy - good!
// But the share URLs should be memoized:

const shareUrl = useMemo(
  () => typeof window !== "undefined" ? window.location.href : "",
  []
);

const shareText = useMemo(() => {
  const tierName = selectedTier 
    ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) 
    : "";
  return selectedTier
    ? `I just locked in the ${tierName} tier for a gaming PC subscription! I'm #${queuePosition} in line for Calgary. Get 10% off your first 3 months with code ${couponCode}!`
    : `I just joined the waitlist for a gaming PC subscription! Get 10% off your first 3 months with code ${couponCode}!`;
}, [selectedTier, queuePosition, couponCode]);
```

### 4.3 Reduce Confetti Re-renders

The confetti already uses reduced count (15 particles) and CSS containment. Add `will-change` cleanup:

```tsx
// Add onAnimationComplete to clean up will-change
<motion.div
  key={i}
  // ... existing props
  onAnimationComplete={() => {
    // will-change is automatically removed after animation
  }}
  className={cn(
    "absolute w-2 h-2 rounded-sm will-change-transform",
    // Remove gpu-accelerated as it's redundant with will-change
    i % 3 === 0 && "bg-primary",
    i % 3 === 1 && "bg-gaming-gold",
    i % 3 === 2 && "bg-gaming-blue"
  )}
/>
```

---

## Phase 5: Optimize SaveCodeActions

### 5.1 Add Error Boundaries

**File: `src/components/waitlist/SaveCodeActions.tsx`**

The email resend should have better error handling:

```typescript
const handleEmailCode = useCallback(async () => {
  if (emailState === "sending" || !email) return;
  
  setEmailState("sending");
  
  try {
    const { error } = await supabase.functions.invoke("send-waitlist-confirmation", {
      body: {
        email,
        firstName,
        queuePosition,
        couponCode,
      },
    });
    
    if (error) {
      throw error;
    }
    
    setEmailState("sent");
  } catch (error) {
    console.error("Failed to resend email:", error);
    setEmailState("error");
    setTimeout(() => setEmailState("idle"), 3000);
  }
}, [email, firstName, queuePosition, couponCode, emailState]);
```

### 5.2 Optimize ICS Download

**File: `src/lib/calendar-utils.ts`**

Add cleanup for blob URL:

```typescript
export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Use requestAnimationFrame for smoother execution
  requestAnimationFrame(() => {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Clean up blob URL
    URL.revokeObjectURL(url);
  });
}
```

---

## Phase 6: Accessibility Improvements

### 6.1 TierCard Accessibility

**File: `src/components/waitlist/TierCard.tsx`**

Add proper ARIA attributes:

```tsx
<motion.button
  type="button"
  onClick={onSelect}
  aria-pressed={isSelected}
  aria-label={`Select ${name} tier: ${tagline}`}
  // ... rest of props
>
```

### 6.2 Form Field Accessibility

Ensure all form fields have proper error announcements:

```tsx
// In FormField component, add live region
{error && (
  <motion.p
    id={fieldId ? `${fieldId}-error` : undefined}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="text-sm text-destructive"
    role="alert"
    aria-live="polite"
  >
    {error}
  </motion.p>
)}
```

---

## Phase 7: Edge Function Optimization

### 7.1 Add Request Timeout

**File: `supabase/functions/send-waitlist-confirmation/index.ts`**

Add timeout to prevent hanging requests:

```typescript
// Add AbortController for timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

try {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Team Gaming PC <noreply@yourdomain.com>",
      to: [email],
      subject: "You're on the waitlist! Here's your 10% discount",
      html: emailHtml,
    }),
    signal: controller.signal,
  });
  
  clearTimeout(timeoutId);
  // ... rest of handling
} catch (error) {
  clearTimeout(timeoutId);
  if (error.name === 'AbortError') {
    return new Response(
      JSON.stringify({ error: "Email service timeout" }),
      { status: 504, headers: { ...corsHeaders } }
    );
  }
  throw error;
}
```

### 7.2 Add Input Sanitization

```typescript
// Sanitize inputs to prevent injection
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim().slice(0, 255);
};

const sanitizedEmail = sanitizeInput(email);
const sanitizedFirstName = sanitizeInput(firstName);
```

---

## Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `supabase/config.toml` | Add function config | P0 - Critical |
| `supabase/functions/send-waitlist-confirmation/index.ts` | Better error handling, timeout, sanitization | P0 - Critical |
| `src/components/waitlist/WaitlistForm.tsx` | Fix mobile button bug, memoization, useEffect fixes | P0 - Critical |
| `src/components/waitlist/ThankYouModal.tsx` | Fix effect cleanup, memoization | P1 - High |
| `src/components/waitlist/SaveCodeActions.tsx` | Better error handling | P1 - High |
| `src/components/waitlist/TierCard.tsx` | Accessibility improvements | P2 - Medium |
| `src/lib/calendar-utils.ts` | Optimize blob cleanup | P2 - Medium |

---

## Pre-Requisite: RESEND_API_KEY

Before the email functionality will work, you must provide a Resend API key:

1. Go to https://resend.com and sign up
2. Verify your email domain at https://resend.com/domains
3. Create an API key at https://resend.com/api-keys
4. Provide the API key when prompted

---

## Verification Checklist

After implementation, verify:

- [ ] Form submits successfully on desktop
- [ ] Form submits successfully on mobile (sticky button)
- [ ] Validation errors appear correctly
- [ ] Tier selection works with haptic feedback
- [ ] Thank you modal opens with confetti
- [ ] Queue position counter animates
- [ ] Copy coupon code works
- [ ] Email confirmation sends (requires RESEND_API_KEY)
- [ ] Calendar download works
- [ ] Social share buttons work
- [ ] Referral link copies correctly
- [ ] SMS share works on mobile
- [ ] Modal closes properly
- [ ] No console errors
- [ ] Reduced motion preference respected

---

## Expected Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| Form re-renders | Every keystroke | On blur only |
| Callback creation | Every render | Memoized |
| Memory leaks | Possible in effects | Fixed with cleanup |
| Bundle impact | None (no new deps) | Optimized existing |

