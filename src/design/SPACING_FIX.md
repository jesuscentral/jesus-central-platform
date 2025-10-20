# Spacing Token Fix - Important Update

## The Problem

The original spacing token implementation conflicted with Tailwind's default sizing scales, causing issues like:

```tsx
// This was using our 3rem (48px) token instead of Tailwind's 42rem
<div className="max-w-2xl">  // Only 48px wide! 😱
```

## The Solution

We've updated the spacing tokens to use **semantic names** that don't conflict with Tailwind's defaults:

### Before (Don't Use)
```tsx
<div className="p-md gap-lg">  // ❌ Conflicts with Tailwind
<div className="max-w-2xl">    // ❌ Too small (3rem)
```

### After (Use These)
```tsx
<div className="p-content gap-card">  // ✅ Semantic spacing
<div className="max-w-2xl">           // ✅ Tailwind default (42rem)
```

## New Spacing Scale

### Semantic Spacing Tokens (Use for padding, margin, gap)

```tsx
// Content spacing (16px / 1rem) - for text content padding
p-content
m-content
gap-content

// Card spacing (24px / 1.5rem) - for card internal padding
p-card
m-card
gap-card

// Section spacing (48px / 3rem) - for section padding
p-section
m-section
gap-section
```

### Standard Tailwind Spacing (Use for everything else)

For margins, padding, widths, heights, max-widths, etc., use **standard Tailwind values**:

```tsx
// Tailwind's default spacing scale (unchanged)
p-0, p-1, p-2, p-4, p-8, p-16, p-32, p-64, etc.
m-0, m-1, m-2, m-4, m-8, m-16, m-32, m-64, etc.

// Width and max-width
w-full, w-96, w-1/2
max-w-xs, max-w-sm, max-w-md, max-w-lg, max-w-xl
max-w-2xl (42rem ✅), max-w-4xl, max-w-6xl, max-w-7xl

// Height and max-height
h-screen, h-96, h-64
max-h-screen, max-h-96, max-h-64
```

## Migration Guide

### 1. Update Padding/Margin with Semantic Intent

```tsx
// Before
<div className="p-md">           // ❌

// After (choose based on context)
<div className="p-content">      // ✅ For text content
<div className="p-card">         // ✅ For card internals
<div className="p-section">      // ✅ For major sections

// Or use Tailwind standard
<div className="p-4">            // ✅ 1rem (16px)
<div className="p-6">            // ✅ 1.5rem (24px)
<div className="p-12">           // ✅ 3rem (48px)
```

### 2. Continue Using Tailwind for Sizing

```tsx
// Width/Max-width - Use Tailwind defaults
<div className="max-w-2xl">     // ✅ 42rem
<div className="max-w-7xl">     // ✅ 80rem
<div className="w-96">          // ✅ 24rem

// Height/Max-height - Use Tailwind defaults
<div className="max-h-screen">  // ✅ 100vh
<div className="h-64">          // ✅ 16rem
```

### 3. Use Semantic Names for Consistency

Think about **what** you're spacing, not **how much**:

```tsx
// Card component
<div className="p-card gap-card rounded-lg border-2">
  {/* Card content with consistent spacing */}
</div>

// Text content
<article className="p-content">
  <p>Text with standard content spacing</p>
</article>

// Page section
<section className="py-section px-content">
  {/* Major page section */}
</section>
```

## Recommended Patterns

### Container/Section Layout
```tsx
<section className="py-section px-4 md:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Card Component
```tsx
<div className="rounded-lg border-2 p-card gap-card shadow-md max-w-md">
  {/* Card content */}
</div>
```

### Content Area
```tsx
<article className="p-content max-w-2xl mx-auto space-y-4">
  {/* Article content */}
</article>
```

## TypeScript Tokens Still Work

The TypeScript design tokens remain unchanged and can still be used:

```tsx
import { spacing } from '@/design/tokens'

const styles = {
  padding: spacing.md,  // 16px
  gap: spacing.lg,      // 24px
}
```

## Quick Reference

| Use Case | Recommended Class | Size |
|----------|------------------|------|
| Text content padding | `p-content` | 16px |
| Card internal spacing | `p-card` | 24px |
| Section padding | `p-section` | 48px |
| Gap between items | `gap-content` or `gap-card` | 16px or 24px |
| Container max-width | `max-w-7xl`, `max-w-4xl` | Tailwind defaults |
| Element width | `w-96`, `w-full`, `w-1/2` | Tailwind defaults |
| Element height | `h-64`, `h-screen` | Tailwind defaults |

## Why This Approach?

1. **No Conflicts**: Our semantic tokens don't interfere with Tailwind's sizing scales
2. **Clearer Intent**: `p-card` is more meaningful than `p-6`
3. **Best of Both**: Use semantic tokens where it makes sense, Tailwind defaults elsewhere
4. **Backward Compatible**: All existing Tailwind classes still work

## Need Help?

- For padding/margin/gap with semantic meaning → Use `p-content`, `p-card`, `p-section`
- For sizing (width, height, max-width) → Use Tailwind defaults (`max-w-2xl`, `w-96`, etc.)
- When in doubt → Use Tailwind's standard scale

---

**Updated**: October 2025
**Breaking Changes**: None (spacing tokens renamed, old names removed)
