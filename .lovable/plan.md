

# Create Minimal Tech Favicon & Remove Lovable Branding

## Overview

Delete the existing Lovable favicon and all Lovable image references, then create a super minimal geometric favicon using inline SVG - just a few clean lines forming an abstract "C" or geometric shape that fits the Connor Computer brand.

---

## Files to Delete

| File | Reason |
|------|--------|
| `public/favicon.ico` | Remove Lovable favicon |

---

## Files to Create

| File | Description |
|------|-------------|
| `public/favicon.svg` | Minimal geometric SVG favicon - just 3-4 lines forming an abstract angular shape |

### Favicon Design Concept

```text
Ultra-minimal design options:

Option A: Abstract "C" with 3 lines
   ╱──
  │
   ╲──

Option B: Hexagonal corner (tech feel)
  ╱╲
  ╲╱

Option C: Angular bracket (code-inspired)
  ◢
  ◣
```

The SVG will be:
- **32x32 viewBox** for sharp rendering
- **Orange stroke** (#fc7e30) on transparent background
- **3-4 path elements** maximum
- **Clean angular lines** - no fills, just strokes

### SVG Code Preview

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M8 8 L4 16 L8 24" stroke="#fc7e30" stroke-width="3" 
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M24 8 L28 16 L24 24" stroke="#fc7e30" stroke-width="3" 
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

This creates two angular brackets `< >` - minimal, tech-forward, and matches the brand orange.

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add favicon link, remove Lovable OG/Twitter images |

### index.html Changes

**Add** after line 31 (after theme-color meta):
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

**Remove/Update** lines 37 and 44:
- Remove `og:image` referencing lovable.dev
- Remove `twitter:image` referencing lovable.dev

Or optionally leave them empty/remove the meta tags entirely until you have custom OG images.

---

## Summary

| Action | Target |
|--------|--------|
| Delete | `public/favicon.ico` |
| Create | `public/favicon.svg` (minimal 3-4 line geometric icon) |
| Modify | `index.html` (add SVG favicon link, remove Lovable images) |

The result: A clean, ultra-minimal favicon with just angular lines in brand orange - no Lovable branding anywhere.

