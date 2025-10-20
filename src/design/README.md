# Jesus Central Church Design System

This design system provides a comprehensive set of design tokens and guidelines for building consistent UI components across the Jesus Central Church website.

## Overview

The design system is built on three layers:

1. **CSS Variables** (`src/app/globals.css`) - Raw design values
2. **Tailwind Config** (`tailwind.config.ts`) - Utility class integration
3. **TypeScript Tokens** (`src/design/tokens/`) - Type-safe programmatic access

## Design Tokens

### Colors

#### Brand Colors (Strategy)
- **Gold**: `#c89657` - Primary brand color, represents warmth and divine light
- **Green**: `#746e06` - Secondary color, represents growth and life
- **Red**: `#eb3700` - Accent color, represents passion and Holy Spirit

#### Semantic Colors
- **Primary**: Gold (`#c89657`) - Main interactive elements, CTAs
- **Secondary**: Green (`#746e06`) - Supporting actions
- **Accent**: Red (`#eb3700`) - Emphasis, special highlights
- **Muted**: Light gray - Backgrounds, disabled states
- **Border**: Medium gray - Dividers, borders

#### Status Colors
- **Success**: Green (`#22c55e`)
- **Warning**: Orange (`#f59e0b`)
- **Error**: Red (`#ef4444`)
- **Info**: Blue (`#3b82f6`)

#### Usage Examples

```tsx
// Tailwind classes
<button className="bg-primary hover:bg-primary-hover text-white">
  Donate
</button>

// TypeScript
import { colors } from '@/design/tokens'
const buttonColor = colors.primary.DEFAULT
```

### Spacing

Based on a 4px (0.25rem) base unit:

- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem) - Default spacing
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

#### Usage Examples

```tsx
// Tailwind classes
<div className="p-md gap-lg">Content</div>

// TypeScript
import { spacing } from '@/design/tokens'
const padding = spacing.md
```

### Typography

#### Font Families
- **Heading**: TGS Perfect Condensed (uppercase)
- **Body**: Fira Sans

#### Font Sizes
- **xs**: 12px (0.75rem)
- **sm**: 14px (0.875rem)
- **base**: 16px (1rem) - Default
- **lg**: 18px (1.125rem)
- **xl**: 20px (1.25rem)
- **2xl**: 24px (1.5rem)
- **3xl**: 30px (1.875rem)
- **4xl**: 36px (2.25rem)
- **5xl**: 48px (3rem)
- **6xl**: 60px (3.75rem)

#### Font Weights
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700
- **extrabold**: 800

#### Usage Examples

```tsx
// Tailwind classes
<h1 className="font-heading text-4xl font-bold uppercase">Title</h1>
<p className="font-body text-base">Body text</p>

// TypeScript
import { typography } from '@/design/tokens'
const fontSize = typography.fontSize['2xl']
```

### Borders

#### Border Radius
- **xs**: 2px (0.125rem)
- **sm**: 4px (0.25rem)
- **md**: 8px (0.5rem) - Default
- **lg**: 12px (0.75rem)
- **xl**: 16px (1rem)
- **2xl**: 24px (1.5rem)
- **full**: 9999px (Pill shape)

#### Border Width
- **thin**: 1px
- **DEFAULT**: 2px
- **thick**: 3px

#### Usage Examples

```tsx
// Tailwind classes
<div className="rounded-lg border-2 border-border">Card</div>

// TypeScript
import { borders } from '@/design/tokens'
const borderRadius = borders.radius.lg
```

### Shadows

Elevation system for depth and hierarchy:

- **xs**: Subtle shadow
- **sm**: Small shadow (cards at rest)
- **md**: Medium shadow (raised cards)
- **lg**: Large shadow (modals, dropdowns)
- **xl**: Extra large shadow
- **2xl**: Maximum shadow

#### Usage Examples

```tsx
// Tailwind classes
<div className="shadow-md hover:shadow-lg transition-all">Card</div>

// TypeScript
import { shadows } from '@/design/tokens'
const cardShadow = shadows.md
```

### Transitions

#### Duration
- **fast**: 150ms - Quick interactions
- **base**: 200ms - Default
- **slow**: 300ms - Deliberate animations

#### Easing
All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` by default

#### Usage Examples

```tsx
// Tailwind classes
<button className="transition-all duration-base hover:scale-105">
  Button
</button>

// TypeScript
import { transitions } from '@/design/tokens'
const transitionSpeed = transitions.duration.base
```

### Z-Index

Layering system for stacking contexts:

- **dropdown**: 1000
- **sticky**: 1020
- **fixed**: 1030
- **modal-backdrop**: 1040
- **modal**: 1050
- **popover**: 1060
- **tooltip**: 1070

#### Usage Examples

```tsx
// Tailwind classes
<div className="z-modal">Modal content</div>

// TypeScript
import { zIndex } from '@/design/tokens'
const modalLayer = zIndex.modal
```

## Component Variants with CVA

We use `class-variance-authority` for consistent component variant management.

### Example Button Component

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-hover text-white',
        secondary: 'bg-secondary hover:bg-secondary-hover text-white',
        outline: 'border-2 border-border bg-transparent hover:bg-muted',
        ghost: 'hover:bg-muted',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
}

export function Button({ variant, size, className, children }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  )
}

// Usage
<Button variant="primary" size="lg">Donate Now</Button>
<Button variant="outline" size="sm">Learn More</Button>
```

## Dark Mode Support

The design system includes dark mode support via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #161615;
    --foreground: #edf2e9;
    --muted: #2a2a28;
    /* ... other dark mode overrides */
  }
}
```

All components automatically adapt to dark mode through CSS variables.

## Responsive Design

Use Tailwind's responsive prefixes with our breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

```tsx
<div className="p-md md:p-lg lg:p-xl">
  Responsive padding
</div>
```

## Best Practices

### ✅ Do

- Use semantic color names (`primary`, `secondary`) over brand names
- Use spacing scale tokens consistently (`p-md`, `gap-lg`)
- Use CVA for component variants with multiple states
- Import tokens from `@/design/tokens` for type safety
- Use `cn()` utility for conditional classes

### ❌ Don't

- Use arbitrary values like `p-[13px]` unless absolutely necessary
- Mix different spacing scales in related components
- Define colors outside the token system
- Use inline styles for design values that should be tokens

## Extending the Design System

### Adding a New Color

1. Add CSS variable to `globals.css`:
```css
:root {
  --new-color: #123456;
}
```

2. Add to Tailwind config:
```ts
colors: {
  'new-color': 'var(--new-color)',
}
```

3. Add to TypeScript tokens:
```ts
// src/design/tokens/colors.ts
export const colors = {
  newColor: 'var(--new-color)',
}
```

### Creating Component Variants

See the Button component example above. Key principles:

1. Define base styles that apply to all variants
2. Use semantic variant names (`primary`, `outline`, not `blue`, `red`)
3. Include size variants when needed
4. Set sensible `defaultVariants`

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CVA Documentation](https://cva.style/docs)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## Questions?

For questions or suggestions about the design system, please reach out to the development team or create an issue in the repository.
