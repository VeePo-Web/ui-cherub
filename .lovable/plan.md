

# Switch Email Sender Domain to ub-gaming.com

## Overview

Update the "from" address in both edge functions from `noreply@olausen.ca` to `noreply@ub-gaming.com` so emails can send immediately using the verified domain. No changes to recipient logic -- admin notifications always go to `connor@olausen.ca`, and confirmation emails always go to the form submitter.

## Changes

### File 1: `supabase/functions/waitlist-signup/index.ts`

- Change the `from` field in the Resend API call from `"Unbound - Gaming <noreply@olausen.ca>"` to `"Unbound - Gaming <noreply@ub-gaming.com>"`
- The `to` field remains `["connor@olausen.ca"]` -- unchanged

### File 2: `supabase/functions/send-waitlist-confirmation/index.ts`

- Change the `from` field in the Resend API call from `"Unbound - Gaming <noreply@olausen.ca>"` to `"Unbound - Gaming <noreply@ub-gaming.com>"`
- The `to` field remains `[sanitizedEmail]` (the form submitter's email) -- unchanged

### No other changes

All logic, templates, validation, and error handling remain exactly as they are. Only the sender address string changes in each file.

