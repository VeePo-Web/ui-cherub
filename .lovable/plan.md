

# Clean, Minimalist Email Templates for Unbound - Gaming

## Overview

Redesign both email templates to match the Unbound - Gaming brand identity: minimal, professional, zero-emoji, using the brand color palette (deep purple background, orange #fc7e30 accent, clean typography). Both templates currently work but need visual refinement to match the premium aesthetic of the site.

---

## Template 1: Subscriber Confirmation Email (send-waitlist-confirmation)

**Sent to:** The person who submitted the form
**Current issues:** Uses emoji in headline and subject line (violates zero-emoji brand policy), slightly busy layout

**New design direction:**
- Remove all emoji from subject line and body
- Subject line: "You're on the Unbound waitlist -- here's your 10% discount"
- Clean, structured layout with generous whitespace
- Brand mark rendered as text "Unbound . Gaming" at the top (no image dependency)
- Muted purple (#1a0a2e) background, card (#2d1b4e) container, white text, orange accents
- Queue position displayed prominently in brand orange
- Coupon code in a clean bordered box with monospace font
- "What happens next" section with clean list (no bullet clutter)
- Minimal footer with copyright and reply prompt

**Structure:**
```text
+------------------------------------------+
|          Unbound . Gaming                 |
|          (text-based brand mark)          |
+------------------------------------------+
|                                           |
|   You're on the list, {firstName}.        |
|                                           |
|   POSITION IN LINE                        |
|   #42                                     |
|                                           |
|   +-----------------------------------+  |
|   |  YOUR 10% DISCOUNT CODE           |  |
|   |  EARLY10-XXXX                      |  |
|   +-----------------------------------+  |
|                                           |
|   What happens next                       |
|   - We'll notify you at launch            |
|   - Early access before the public        |
|   - Discount applied automatically        |
|   - No commitment until you're ready      |
|                                           |
+------------------------------------------+
|   Questions? Reply to this email.         |
|   (c) 2026 Unbound - Gaming              |
+------------------------------------------+
```

---

## Template 2: Admin Notification Email (waitlist-signup)

**Sent to:** connor@olausen.ca
**Current issues:** Raw, unstyled HTML (just `<h2>`, `<p>`, `<strong>` tags), no visual structure, no brand identity

**New design direction:**
- Clean white/light background for readability (this is an internal admin email -- prioritize scannability)
- Subtle brand header with "Unbound . Gaming" and a thin orange accent line
- Structured data table layout for signup details
- Clear visual separation between contact info, tier/budget, and trade-in sections
- Conditional sections only render when data exists (already implemented, will keep)
- Compact, information-dense but well-spaced

**Structure:**
```text
+------------------------------------------+
|  Unbound . Gaming                        |
|  ==============================  (#fc7e30)|
+------------------------------------------+
|                                           |
|  New Waitlist Signup  #42                 |
|                                           |
|  CONTACT                                 |
|  Name:    John Smith                      |
|  Email:   john@example.com                |
|  Phone:   555-1234                        |
|                                           |
|  PREFERENCES                             |
|  Tier:      Ludacris                      |
|  Budget:    $200-300/mo                   |
|  Mailing:   Yes                           |
|  Coupon:    EARLY10-XXXX                  |
|                                           |
|  TRADE-IN  (if applicable)               |
|  GPU:       RTX 4090                      |
|  CPU:       i9-13900K                     |
|  RAM:       32GB DDR5                     |
|  Storage:   2TB NVMe                      |
|  Board:     ASUS ROG Z790                 |
|  Uptime:    2 years                       |
|                                           |
+------------------------------------------+
|  Unbound - Gaming (c) 2026               |
+------------------------------------------+
```

---

## Technical Changes

### File 1: `supabase/functions/send-waitlist-confirmation/index.ts`

- Replace the `emailHtml` template (lines 57-130) with the new minimalist design
- Update the subject line (line 146) to remove emoji: `"You're on the Unbound waitlist -- here's your 10% discount"`
- Add a text-based brand mark at the top of the email instead of relying on emoji
- Keep all existing logic (sanitization, validation, timeout, error handling) untouched

### File 2: `supabase/functions/waitlist-signup/index.ts`

- Replace the `notificationHtml` template (lines 149-160) with the new structured admin design
- Keep the fire-and-forget pattern, subject line format, and all surrounding logic untouched

### No other files change

The frontend hook (`useWaitlistSubmit.ts`), form components, and all other files remain exactly as they are.

---

## Design Principles Applied

- **Zero-emoji policy**: No emoji anywhere in subject lines or body content
- **Brand consistency**: Deep purple + orange palette for subscriber email; clean white for admin readability
- **Minimalism**: Generous padding, no decorative elements, only functional content
- **Email client compatibility**: Table-based layout, inline styles only, no external CSS or images
- **Mobile responsive**: 100% width tables with max-width constraint, readable font sizes (14-16px body)
- **Accessibility**: High contrast text on backgrounds, semantic heading hierarchy
