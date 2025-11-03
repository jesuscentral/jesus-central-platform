# Design System Quick Reference

Quick lookup for design tokens. Copy-paste ready!

## Colors

### Brand Colors

```tsx
bg - strategy - gold // #c89657 - Primary brand (gold)
bg - strategy - green // #746e06 - Secondary brand (green)
bg - strategy - red // #eb3700 - Accent brand (red)
bg - boldness // #161615 - Dark (almost black)
bg - freedom // #edf2e9 - Light (cream)
```

### Semantic Colors

```tsx
bg - primary // Gold (#c89657)
bg - primary - hover // Darker gold
bg - secondary // Green (#746e06)
bg - secondary - hover // Darker green
bg - accent // Red (#eb3700)
bg - accent - hover // Darker red
bg - background // Page background
bg - foreground // Text color (as bg)
bg - muted // Muted background
text - muted - foreground // Muted text
border - border // Standard border color
```

### Status Colors

```tsx
text - success // Green (#22c55e)
text - warning // Orange (#f59e0b)
text - error // Red (#ef4444)
text - info // Blue (#3b82f6)
```

## Spacing

### ⚠️ IMPORTANT: Semantic Spacing (Use These!)

Use semantic names to avoid conflicts with Tailwind's sizing scales:

```tsx
// Content spacing (16px) - for text content
;(p - content) | (m - content) | (gap - content)

// Card spacing (24px) - for card internals
;(p - card) | (m - card) | (gap - card)

// Section spacing (48px) - for major sections
;(p - section) | (m - section) | (gap - section)
```

### Standard Tailwind Spacing (Also Available)

For widths, heights, max-widths, or custom spacing:

```tsx
// Use Tailwind's default scale
p-0, p-1, p-2, p-4, p-6, p-8, p-12, p-16, p-24, p-32
m-0, m-1, m-2, m-4, m-6, m-8, m-12, m-16, m-24, m-32

// Max-width (uses Tailwind defaults - NOT our spacing tokens!)
max-w-xs    // 20rem
max-w-sm    // 24rem
max-w-md    // 28rem
max-w-lg    // 32rem
max-w-xl    // 36rem
max-w-2xl   // 42rem  ✅ Correct size!
max-w-4xl   // 56rem
max-w-7xl   // 80rem
```

## Typography

### Font Families

```tsx
font - heading // TGS Perfect Condensed
font - body // Fira Sans
```

### Font Sizes

```tsx
text-xs    // 12px
text-sm    // 14px
text-base  // 16px  ⭐ Default
text-lg    // 18px
text-xl    // 20px
text-2xl   // 24px
text-3xl   // 30px
text-4xl   // 36px
text-5xl   // 48px
text-6xl   // 60px
```

### Font Weights

```tsx
font - normal // 400
font - medium // 500
font - semibold // 600
font - bold // 700
font - extrabold // 800
```

### Line Heights

```tsx
leading - tight // 1.25
leading - snug // 1.375
leading - normal // 1.5    ⭐ Default
leading - relaxed // 1.625
leading - loose // 2
```

## Borders

### Border Radius

```tsx
rounded-xs   // 2px
rounded-sm   // 4px
rounded-md   // 8px   ⭐ Default
rounded-lg   // 12px
rounded-xl   // 16px
rounded-2xl  // 24px
rounded-full // 9999px (pill/circle)
```

### Border Width

```tsx
border - thin // 1px
border // 2px  ⭐ Default (use border-2 to apply)
border - thick // 3px
```

## Shadows

```tsx
shadow-xs  // Minimal shadow
shadow-sm  // Small shadow
shadow-md  // Medium shadow  ⭐ Default for cards
shadow-lg  // Large shadow
shadow-xl  // Extra large
shadow-2xl // Maximum shadow
```

## Transitions

```tsx
duration - fast // 150ms  ⭐ For hover effects
duration - base // 200ms  ⭐ Default
duration - slow // 300ms  ⭐ For modals/complex animations

transition - all // Transition all properties
transition - colors // Only colors
transition - transform // Only transforms
```

## Z-Index

```tsx
z - dropdown // 1000
z - sticky // 1020
z - fixed // 1030
z - modal - backdrop // 1040
z - modal // 1050
z - popover // 1060
z - tooltip // 1070
```

## Common Patterns

### Button Styles

```tsx
// Primary button
'bg-primary hover:bg-primary-hover text-white'

// Outline button
'border-2 border-primary text-primary hover:bg-primary hover:text-white'

// Ghost button
'hover:bg-muted'
```

### Card Styles

```tsx
// Basic card
'rounded-lg border-2 border-border bg-background p-card shadow-md'

// Elevated card
'rounded-lg border-2 border-border bg-background p-card shadow-lg hover:shadow-xl transition-shadow'
```

### Input Styles

```tsx
'rounded-md border-2 border-input bg-background px-3 py-2 focus:ring-2 focus:ring-ring'
```

### Section Padding

```tsx
// Mobile-first responsive padding
'py-section px-content md:px-8'
```

### Status Messages

```tsx
// Success
'bg-success/10 text-success border-success'

// Error
'bg-error/10 text-error border-error'

// Warning
'bg-warning/10 text-warning border-warning'

// Info
'bg-info/10 text-info border-info'
```

## Responsive Prefixes

```tsx
sm:   // ≥640px
md:   // ≥768px
lg:   // ≥1024px
xl:   // ≥1280px
2xl:  // ≥1536px

// Example
<div className="p-md md:p-lg lg:p-xl">
  Responsive padding
</div>
```

## State Prefixes

```tsx
hover:     // Mouse hover
focus:     // Keyboard focus
active:    // Click/tap
disabled:  // Disabled state
group-hover: // When parent with class="group" is hovered

// Example
<button className="bg-primary hover:bg-primary-hover focus:ring-2">
  Button
</button>
```

## Dark Mode

All color tokens automatically adapt to dark mode via `prefers-color-scheme: dark`.

```tsx
// These automatically adjust in dark mode
'bg-background text-foreground border-border'
```

## Copy-Paste Components

### Button

```tsx
<button className="rounded-full bg-primary px-8 py-3 font-semibold uppercase text-white shadow-lg transition-all duration-base hover:bg-primary-hover">
  Click Me
</button>
```

### Card

```tsx
<div className="rounded-lg border-2 border-border bg-background p-card shadow-md transition-shadow hover:shadow-lg">
  Card Content
</div>
```

### Alert

```tsx
<div className="bg-success/10 rounded-md border-2 border-success p-content text-success">
  Success message here
</div>
```

### Input

```tsx
<input
  type="text"
  className="w-full rounded-md border-2 border-input bg-background px-3 py-2 outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring"
  placeholder="Enter text..."
/>
```

### Badge

```tsx
<span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-white">
  Badge
</span>
```

### Section

```tsx
<section className="px-content py-section md:px-8">
  <div className="mx-auto max-w-7xl">Section Content</div>
</section>
```

---

**Pro Tip**: Use your IDE's autocomplete by typing `className="bg-` and letting IntelliSense show you all available design token options!
