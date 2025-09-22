# Component Architecture

## Directory Structure

```
components/
├── sections/          # Page-specific sections
│   ├── hero-section.tsx
│   ├── mission-vision-section.tsx
│   ├── scripture-section.tsx
│   ├── strategy-section.tsx
│   └── practical-info-section.tsx
├── layout/           # Layout components
│   └── footer.tsx
└── ui/              # Reusable UI components
    └── section-skeleton.tsx
```

## Key Features

### 1. **Lazy Loading**

All sections are lazy-loaded using Next.js dynamic imports for optimal performance:

- Reduces initial bundle size
- Improves First Contentful Paint (FCP)
- Sections load as user scrolls

### 2. **Loading States**

Each section has skeleton loading states for better UX during lazy loading.

### 3. **Animation Library**

Shared animations in `lib/animations.ts` ensure consistency across components.

### 4. **TypeScript**

Full TypeScript support with proper typing for all components and props.

### 5. **Performance Optimizations**

- Next.js Image component for optimized image loading
- Viewport-based animation triggers
- Memoized animation variants
- SSR enabled for SEO benefits

## Best Practices

1. **Component Isolation**: Each section is self-contained with its own styles and logic
2. **Reusability**: Common patterns extracted into shared components
3. **Type Safety**: All props and variants are properly typed
4. **Performance**: Lazy loading and code splitting for optimal load times
5. **Maintainability**: Clear file structure and naming conventions
