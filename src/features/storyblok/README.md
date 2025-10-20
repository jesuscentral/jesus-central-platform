# Storyblok Feature Module

This module contains all Storyblok-related code for the JCC Landing project.

## Structure

```
storyblok/
├── components/          # All Storyblok component implementations
│   ├── layout/         # Page structure components (Page, Grid, Section)
│   ├── heroes/         # Hero section variants (VideoHero, ImageHero, BlokHero)
│   ├── content/        # Text and media content blocks
│   ├── cards/          # Card-based components
│   ├── navigation/     # Navigation elements (Footer, Link)
│   ├── interactive/    # Interactive UI elements (Button, Donation, Map)
│   └── media/          # Media components (Image, SpotifyEmbed)
├── hooks/              # Custom React hooks for Storyblok
├── utils/              # Helper functions and utilities
├── types/              # TypeScript type definitions
├── config.ts           # Configuration constants
└── README.md           # This file
```

## Component Categories

### Layout Components

- **Page**: Main page wrapper component
- **Section**: Content section wrapper
- **Grid**: Responsive grid layout
- **FullGrid**: Full-width grid layout
- **StaticGrid**: Static grid layout
- **Global**: Global content wrapper

### Hero Components

- **VideoHero**: Hero section with video background
- **ImageHero**: Hero section with image background
- **BlokHero**: Hero section with custom blok

### Content Components

- **RichText**: Rich text content renderer
- **Content**: Generic content block
- **Scripture**: Scripture reference display
- **Statement**: Statement or quote display
- **ScrollingText**: Animated scrolling text
- **Teaser**: Content teaser/preview
- **InformationItem**: Informational content block
- **SermonHighlight**: Sermon highlight display

### Card Components

- **Card**: Generic card component
- **ImageCard**: Card with image
- **PersonCard**: Person profile card

### Navigation Components

- **Footer**: Site footer
- **Link**: Navigation link

### Interactive Components

- **Button**: Call-to-action button
- **Badge**: Label or badge
- **Donation**: Donation form/button
- **Map**: Interactive map

### Media Components

- **Image**: Optimized image component
- **SpotifyEmbed**: Spotify embed player

## Adding a New Component

1. **Create the component file** in the appropriate category folder:

   ```typescript
   // src/features/storyblok/components/[category]/YourComponent.tsx
   'use client'; // Add if client component

   import { storyblokEditable, SbBlokData } from '@storyblok/react/rsc';
   import type { SbYourComponent } from '../../types';

   interface YourComponentProps {
     blok: SbYourComponent;
   }

   export default function YourComponent({ blok }: YourComponentProps) {
     return (
       <div {...storyblokEditable(blok as SbBlokData)}>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Export from category index**:

   ```typescript
   // src/features/storyblok/components/[category]/index.ts
   export { default as YourComponent } from './YourComponent'
   ```

3. **Add to component map**:

   ```typescript
   // src/features/storyblok/components/index.ts
   export const componentMap = {
     // ... existing components
     yourComponent: YourCategory.YourComponent,
   } as const
   ```

4. **Generate types**:

   ```bash
   npm run storyblok:regenerate
   ```

5. **Add type export** (if needed):
   ```typescript
   // src/features/storyblok/types/index.ts
   export type { SbYourComponent } from '@storyblok/types/287435740670216/storyblok-components'
   ```

## Configuration

All Storyblok configuration is centralized in `config.ts`:

```typescript
import {
  storyblokConfig,
  storyblokApiConfig,
} from '@/features/storyblok/config'

// Access configuration
const { accessToken, isPreview, basePath } = storyblokConfig
```

## Utilities

### Link Resolver

```typescript
import { linkResolver } from '@/features/storyblok/utils'

const url = linkResolver(blok.link)
```

### SEO Parameters

```typescript
import { getStoryblokSeoParameters } from '@/features/storyblok/utils'

const seoParams = getStoryblokSeoParameters(story)
```

## Hooks

### useStoryblokLink

```typescript
import { useStoryblokLink } from '@/features/storyblok/hooks';

function MyComponent({ blok }) {
  const href = useStoryblokLink(blok.link);
  return <a href={href}>Link</a>;
}
```

## Type Safety

All Storyblok types are re-exported from the `types` module:

```typescript
import type {
  SbPage,
  SbCard,
  BlokComponentProps,
} from '@/features/storyblok/types'
```

## Scripts

- `npm run storyblok:generate-types` - Generate TypeScript types from Storyblok
- `npm run storyblok:pull` - Pull component definitions from Storyblok
- `npm run storyblok:regenerate` - Pull and generate types in one command

## Best Practices

1. **Always use TypeScript types** for component props
2. **Use `storyblokEditable`** wrapper for all component root elements
3. **Group related components** in appropriate category folders
4. **Keep components focused** - one component per file
5. **Use shared utilities** instead of duplicating code
6. **Document complex components** with JSDoc comments
7. **Add 'use client' directive** only when necessary (client-side interactivity)

## Troubleshooting

### Types Not Updating

Run the regenerate script:

```bash
npm run storyblok:regenerate
```

### Component Not Rendering

1. Check if component is registered in `componentMap`
2. Verify component name matches Storyblok schema
3. Ensure component is properly exported from category index

### Import Errors After Refactor

Update import paths to use category-based imports:

```typescript
// Old
import Page from '@/features/storyblok/components/Page'

// New
import { Page } from '@/features/storyblok/components/layout'
// Or from main index
import { Page } from '@/features/storyblok/components'
```
