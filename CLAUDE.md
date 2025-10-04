# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 (App Router) church website for Jesus Central Church that integrates with Storyblok CMS for content management. The application includes:

- **Storyblok CMS**: Content-managed pages with dynamic component rendering
- **YouTube Integration**: RSS feed parsing for sermon videos
- **Mollie Payments**: Donation processing and recurring payment setup
- **Mapbox**: Interactive maps for location display
- **Multi-site Support**: Uses `NEXT_PUBLIC_BASE_PATH` to support multiple sites in a single Storyblok space

## Commands

```bash
# Development
npm run dev                      # Start development server with Turbopack
npm run dev:https                # Start dev server with HTTPS (requires certificates)

# Build & Deploy
npm run build                    # Build for production with Turbopack
npm start                        # Start production server

# Code Quality
npm run lint                     # Run ESLint

# Storyblok
npm run storyblok:pull           # Pull component definitions from Storyblok
npm run storyblok:generate-types # Generate TypeScript types from Storyblok schema
npm run storyblok:regenerate     # Pull components and regenerate types (run this after Storyblok changes)
```

## Architecture

### Storyblok Component System

The application uses a centralized component registration system in `src/lib/storyblok.ts`:

- **Component Registration**: All Storyblok components must be registered in the `components` object in `getStoryblokApi()`
- **Type Generation**: TypeScript types are auto-generated in `.storyblok/types/` via `storyblok:generate-types`
- **Component Location**: Storyblok components live in `src/features/storyblok/components/`
- **Editable Blocks**: Use `storyblokEditable()` wrapper for live editing support

### Routing Architecture

1. **Dynamic Catch-All Routes** (`src/app/[...slug]/page.tsx`):
   - Fetches story from Storyblok via `getStory(slug)`
   - Renders using `<StoryblokStory>` component
   - Handles SEO metadata via `getStoryblokSeoParameters()`

2. **Static Hybrid Pages** (e.g., `/agenda`, `/preken`):
   - Combines Storyblok page content (hero, layout) with additional data fetching
   - `agenda/page.tsx`: Fetches events from Storyblok stories with date filtering
   - `preken/page.tsx`: Fetches sermon videos from YouTube RSS via server action

3. **Base Path Handling**:
   - All Storyblok stories are prefixed with `NEXT_PUBLIC_BASE_PATH` (e.g., "jesuscentral")
   - `linkResolver()` in `storyblok.ts` handles stripping base paths from URLs
   - Redirects in `next.config.ts` normalize URLs without base path

### Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── [...slug]/           # Dynamic Storyblok pages
│   ├── agenda/              # Events page (Storyblok + data)
│   ├── preken/              # Sermons page (Storyblok + YouTube)
│   ├── api/                 # API routes (webhooks, YouTube RSS proxy)
│   └── layout.tsx           # Root layout with fonts and StoryblokProvider
├── components/
│   ├── StoryblokProvider.tsx # Client component wrapper for Storyblok
│   ├── sermons/             # Sermon display components
│   └── ui/                  # Atomic design structure
│       ├── atoms/           # Basic UI elements (Button, Badge, Heading)
│       ├── molecules/       # Composed components
│       └── organisms/       # Complex components (CinematicMenu, MapboxMap)
├── features/
│   ├── events/              # Event filtering and display
│   ├── mollie/              # Mollie payment integration
│   │   └── index.ts         # Payment API, customer management, subscriptions
│   ├── youtube/             # YouTube RSS integration
│   │   ├── index.ts         # Public API exports
│   │   ├── api.ts           # Core API functions (fetchChannelRssFeed)
│   │   ├── types.ts         # Type definitions (RssVideo, etc.)
│   │   ├── constants.ts     # Configuration constants
│   │   ├── utils/           # Helper functions
│   │   │   ├── parser.ts    # XML parsing logic
│   │   │   └── formatters.ts # Data formatting utilities
│   │   └── README.md        # Feature documentation
│   └── storyblok/
│       ├── components/      # Storyblok blok components (organized by category)
│       │   ├── layout/      # Page, Section, Grid, FullGrid, StaticGrid, Global
│       │   ├── heroes/      # VideoHero, ImageHero, BlokHero
│       │   ├── content/     # RichText, Content, Scripture, Statement, etc.
│       │   ├── cards/       # Card, ImageCard, PersonCard
│       │   ├── navigation/  # Footer, Link
│       │   ├── interactive/ # Button, Badge, Donation, Map
│       │   └── media/       # Image, SpotifyEmbed
│       ├── config.ts        # Centralized Storyblok configuration
│       ├── types/           # TypeScript type re-exports
│       ├── utils/           # Helper functions (linkResolver, SEO, updateStory)
│       └── hooks/           # Custom React hooks
├── lib/
│   ├── storyblok.ts         # Storyblok API setup and component registration
│   ├── mapbox.ts            # Mapbox configuration
│   ├── animations.ts        # Framer Motion variants
│   └── actions/             # Server actions for data fetching
└── utils/
    └── cn.ts                # Tailwind class utility (clsx + tailwind-merge)
```

### Page Component Pattern

All page-level Storyblok components follow this pattern:

- Navigation bar with logo and `CinematicMenu`
- Main content area rendering `blok.body` components
- Global footer from resolved relations (`global_footer`)

See `src/features/storyblok/components/Page.tsx` for the base template.

## Key Integrations

### Storyblok Configuration

- Space ID: 287435740670216
- API Token: Set via `NEXT_PUBLIC_STORYBLOK_TOKEN`
- Preview Mode: Controlled by `NEXT_PUBLIC_STORYBLOK_IS_PREVIEW` (switches between draft/published)
- Region: EU
- Relation Resolution: Global footer is resolved via `resolve_relations: ["global_footer"]`

### Mollie Payments

- **Location**: `src/features/mollie/index.ts`
- Customer management: Upsert pattern (find or create customer)
- Payment creation: One-off or recurring (first mandate) payments
- All functions marked with `"use server"`
- Webhook endpoint: `/api/webhooks/mollie` for subscription setup
- Used by: Donation component (`src/features/storyblok/components/interactive/Donation.tsx`)

### YouTube Integration

- **Location**: `src/features/youtube/`
- **Structure**:
  - `api.ts` - Main `fetchChannelRssFeed()` function
  - `types.ts` - `RssVideo` and internal RSS feed types
  - `constants.ts` - Configuration (URLs, cache time, thumbnail quality)
  - `utils/parser.ts` - XML parsing with `fast-xml-parser`
  - `utils/formatters.ts` - Data extraction and transformation
- **Caching**: 1 hour revalidation (`CACHE_REVALIDATE_TIME`)
- **Server Action**: `src/lib/actions/sermons.ts` wraps the fetch
- **API Route**: `/api/youtube/channel/rss` (cached, force-static)
- **Documentation**: See `src/features/youtube/README.md` for detailed usage

### Mapbox

- Token: Set via `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- Custom map styles defined in `src/lib/mapbox.ts`
- Component: `src/components/ui/organisms/MapboxMap.tsx`

## Environment Variables

Required variables (see `.env.example`):

```bash
NEXT_PUBLIC_STORYBLOK_TOKEN=      # Storyblok API token
NEXT_PUBLIC_STORYBLOK_IS_PREVIEW= # true for draft, false for published
NEXT_PUBLIC_BASE_PATH=            # Storyblok path prefix (e.g., "jesuscentral")
NEXT_PUBLIC_BASE_URL=             # Site URL for SEO and redirects
MOLLIE_API_KEY=                   # Mollie payment API key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=  # Mapbox public token
```

## TypeScript & Path Aliases

- `@/*` maps to `src/*`
- `@storyblok/*` maps to `.storyblok/*` (generated types)
- Storyblok types: Import from `@storyblok/types/287435740670216/storyblok-components`

## Styling

- **Tailwind CSS v4**: Using `@tailwindcss/postcss`
- **Custom Colors**: Defined as CSS variables in `globals.css`, extended in `tailwind.config.ts`
- **Fonts**:
  - Heading: TGS Perfect Condensed (local font)
  - Body: Fira Sans (local font)
- **Utility**: Use `cn()` from `src/utils/cn.ts` for conditional classes

## When Adding New Storyblok Components

1. Create component file in the appropriate category folder under `src/features/storyblok/components/`
   - `layout/` for page structure components
   - `heroes/` for hero sections
   - `content/` for text and content blocks
   - `cards/` for card components
   - `navigation/` for navigation elements
   - `interactive/` for buttons, forms, maps
   - `media/` for images, videos, embeds
2. Export from the category's `index.ts` file
3. Add to the `componentMap` in `src/features/storyblok/components/index.ts`
4. Run `npm run storyblok:regenerate` after creating component in Storyblok UI
5. Use generated types from `@storyblok/types/287435740670216/storyblok-components`
6. If needed, add type export to `src/features/storyblok/types/index.ts`

For detailed instructions, see `src/features/storyblok/README.md`.
