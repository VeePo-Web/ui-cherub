

# Fix: Waitlist Signup RLS Blocking Insert Return

## Problem

The waitlist form submission is failing with error:
```
"new row violates row-level security policy for table 'waitlist_signups'"
```

**Root Cause**: The code uses `.select("queue_position, coupon_code, first_name")` after insert to return the queue position. Since we blocked all SELECT access with `USING (false)` for security, the insert succeeds but the SELECT return fails, causing the entire operation to fail.

---

## Solution: Edge Function for Waitlist Signup

Create an edge function that handles the waitlist signup with service role access, bypassing RLS for the insert while maintaining security.

### Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/waitlist-signup/index.ts` | Create - New edge function |
| `src/hooks/useWaitlistSubmit.ts` | Modify - Call edge function instead of direct insert |

---

## New Edge Function: `waitlist-signup/index.ts`

The edge function will:
1. Validate incoming data server-side
2. Use service role to insert (bypasses RLS)
3. Return queue_position, coupon_code, first_name
4. Handle duplicate email errors gracefully

```text
Request → Edge Function → Validate → Insert (service role) → Return data
```

### Key Implementation Details

```typescript
// supabase/functions/waitlist-signup/index.ts

import { createClient } from "@supabase/supabase-js";

// Use service role to bypass RLS
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Validate and insert, return queue position
```

---

## Modified Hook: `useWaitlistSubmit.ts`

Change from:
```typescript
const { data, error } = await supabase
  .from("waitlist_signups")
  .insert({...})
  .select("queue_position, coupon_code, first_name")
  .single();
```

To:
```typescript
const { data, error } = await supabase.functions.invoke("waitlist-signup", {
  body: { ...formData }
});
```

---

## Security Considerations

1. **Input validation** - The edge function validates all inputs before insert
2. **Service role only for insert** - Not exposed to client
3. **RLS remains restrictive** - Direct table access still blocked
4. **Rate limiting** - Could add rate limiting in future if needed

---

## Data Flow

```text
┌─────────────┐     ┌──────────────────┐     ┌────────────┐
│   Client    │────▶│  Edge Function   │────▶│  Database  │
│   Form      │     │ (service role)   │     │    RLS     │
└─────────────┘     └──────────────────┘     └────────────┘
                            │
                            ▼
                    Returns: queue_position,
                    coupon_code, first_name
```

---

## Summary

- **1 new file**: `supabase/functions/waitlist-signup/index.ts`
- **1 modified file**: `src/hooks/useWaitlistSubmit.ts`
- **No database changes**: RLS policies remain restrictive

