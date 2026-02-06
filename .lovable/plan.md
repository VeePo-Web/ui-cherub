

# Add Trade-In Value Copy to PC Details Section

## Overview

Add the "$1,000 trade-in value" promotional text directly in the "Tell us about your current PC" section header, so users see the incentive right where they're entering their PC specs.

---

## Current State (Line 376-379)

```tsx
<div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-4">
  <div className="text-sm text-foreground font-medium">
    Tell us about your current PC
  </div>
```

## Updated State

```tsx
<div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-4">
  <div>
    <div className="text-sm text-foreground font-medium">
      Tell us about your current PC
    </div>
    <p className="text-xs text-muted-foreground mt-1">
      Trade-ins get up to $1,000 trade-in value (subject to terms & conditions).
    </p>
  </div>
```

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/waitlist/WaitlistForm.tsx` | Add trade-in value text under "Tell us about your current PC" header |

---

## Visual Result

```text
┌─────────────────────────────────────────────────┐
│ Tell us about your current PC                   │
│ Trade-ins get up to $1,000 trade-in value       │
│ (subject to terms & conditions).                │
│                                                 │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ GPU          │  │ CPU          │             │
│ └──────────────┘  └──────────────┘             │
│ ┌──────────────┐  ┌──────────────┐             │
│ │ RAM          │  │ Storage      │             │
│ └──────────────┘  └──────────────┘             │
│ ...                                             │
└─────────────────────────────────────────────────┘
```

This reinforces the trade-in value incentive right where users are entering their PC details, increasing motivation to complete the optional fields.

