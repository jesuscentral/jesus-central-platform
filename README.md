# Jesus Central Church - Landing Page

A modern, multi-site church website platform built with Next.js 15 and Storyblok CMS.

## Features

- **Storyblok CMS**: Headless CMS with visual editing and component-based content management
- **Multi-site Support**: Manage multiple church sites from a single Storyblok space using base paths
- **YouTube Integration**: Automatic sermon video feed from YouTube RSS
- **Donation System**: Mollie payment integration for one-time and recurring donations
- **Interactive Maps**: Mapbox integration for location display
- **Event Management**: Filterable event listings with calendar integration
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **TypeScript**: Full type safety with auto-generated Storyblok types

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Storyblok account with access to space ID: 287435740670216
- (Optional) Mollie API key for donations
- (Optional) Mapbox access token for maps

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd jcc-landing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values:

   ```bash
   # Storyblok Configuration (Required)
   NEXT_PUBLIC_STORYBLOK_TOKEN=your_storyblok_token
   NEXT_PUBLIC_STORYBLOK_IS_PREVIEW=true

   # Multi-site Configuration (Required)
   NEXT_PUBLIC_BASE_PATH=jesuscentral        # Folder name in Storyblok
   NEXT_PUBLIC_BASE_URL=https://jesuscentral.church

   # Payment Integration (Optional - Required for donations)
   MOLLIE_API_KEY=your_mollie_api_key

   # Maps Integration (Optional - Required for location maps)
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   ```

4. **Generate Storyblok types**

   ```bash
   npm run storyblok:regenerate
   ```

   This pulls component definitions from Storyblok and generates TypeScript types.

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Multi-site Setup in Storyblok

This application supports managing multiple church sites within a single Storyblok space using base paths.

### Storyblok Folder Structure

```
Storyblok Space
├── jesuscentral/           # Site 1 folder (BASE_PATH=jesuscentral)
│   ├── website_config      # Site-specific configuration
│   ├── home                # Homepage
│   ├── about               # About page
│   └── ...                 # Other pages
├── anotherchurch/          # Site 2 folder (BASE_PATH=anotherchurch)
│   ├── website_config
│   ├── home
│   └── ...
```

### Website Configuration

Each site requires a `website_config` story in its base path folder with:

- **Footer configuration**: Navigation links, contact info, social media
- **Site settings**: Logo, colors, fonts (optional overrides)
- **Navigation menu**: Main menu items and structure

**Example**: For `BASE_PATH=jesuscentral`, create a story at:

```
jesuscentral/website_config
```

### Adding a New Site

1. **In Storyblok**:
   - Create a new folder with your site's base path (e.g., `newchurch`)
   - Create a `website_config` story inside this folder
   - Add your pages (home, about, etc.) inside this folder

2. **In Your Project**:
   - Update `.env.local`:

     ```bash
     NEXT_PUBLIC_BASE_PATH=newchurch
     NEXT_PUBLIC_BASE_URL=https://newchurch.org
     ```

   - Restart your dev server

3. **Deploy**:
   - Set the same environment variables in your hosting platform
   - Each site can have its own deployment with different env vars

## Available Commands

### Development

```bash
npm run dev              # Start dev server with Turbopack (Fast Refresh)
npm run dev:https        # Start dev server with HTTPS (requires SSL certificates)
```

### Production

```bash
npm run build            # Build for production
npm start                # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint checks
```

### Storyblok

```bash
npm run storyblok:pull              # Pull component definitions from Storyblok
npm run storyblok:generate-types    # Generate TypeScript types from schema
npm run storyblok:regenerate        # Pull + generate (run after Storyblok changes)
```

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── [...slug]/                # Dynamic pages from Storyblok
│   ├── agenda/                   # Events page
│   ├── preken/                   # Sermons page (YouTube integration)
│   └── api/                      # API routes (webhooks, proxies)
├── components/
│   ├── StoryblokProvider.tsx     # Storyblok bridge component
│   ├── sermons/                  # Sermon display components
│   └── ui/                       # Design system (Atomic Design)
│       ├── atoms/                # Button, Badge, Heading, etc.
│       ├── molecules/            # Composed components
│       └── organisms/            # CinematicMenu, MapboxMap, etc.
├── features/
│   ├── events/                   # Event filtering and display
│   ├── mollie/                   # Payment integration
│   ├── youtube/                  # YouTube RSS parsing
│   │   ├── api.ts               # Core fetch functions
│   │   ├── types.ts             # Type definitions
│   │   ├── utils/               # Parser and formatters
│   │   └── README.md            # Feature documentation
│   └── storyblok/
│       ├── components/           # Storyblok components (by category)
│       │   ├── layout/          # Page, Section, Grid components
│       │   ├── heroes/          # Hero sections
│       │   ├── content/         # Text, images, rich content
│       │   ├── cards/           # Card components
│       │   ├── navigation/      # Footer, links
│       │   ├── interactive/     # Buttons, donations, maps
│       │   └── media/           # Images, embeds
│       ├── api.ts               # Storyblok API functions
│       ├── config.ts            # Configuration
│       ├── types/               # Type exports
│       └── utils/               # Helpers (linkResolver, SEO)
├── lib/
│   ├── storyblok.ts             # Storyblok setup
│   ├── mapbox.ts                # Mapbox configuration
│   ├── animations.ts            # Framer Motion presets
│   └── actions/                 # Server actions
└── utils/
    └── cn.ts                    # Tailwind class utility
```

## Key Integrations

### Storyblok CMS

- **Space**: 287435740670216
- **Region**: EU
- **Preview Mode**: Toggle with `NEXT_PUBLIC_STORYBLOK_IS_PREVIEW`
- **Visual Editor**: Real-time preview with Storyblok Bridge
- **Components**: Registered in `src/features/storyblok/components/index.ts`

### YouTube RSS Integration

Automatically fetches sermon videos from your YouTube channel:

```typescript
// Location: src/features/youtube/
import { fetchChannelRssFeed } from "@/features/youtube";

const videos = await fetchChannelRssFeed(channelId);
```

- Caches for 1 hour
- Returns parsed video metadata (title, description, thumbnail, etc.)
- See `src/features/youtube/README.md` for details

### Mollie Payments

Handles donations and recurring payments:

```typescript
// Location: src/features/mollie/
import { createPayment } from "@/features/mollie";

const payment = await createPayment({
  amount: "10.00",
  description: "Donation",
  // ...
});
```

- Customer management with upsert pattern
- One-time and recurring payment support
- Webhook at `/api/webhooks/mollie` for subscription updates

### Mapbox Maps

Interactive location maps:

```typescript
// Location: src/components/ui/organisms/MapboxMap.tsx
<MapboxMap
  latitude={52.3676}
  longitude={4.9041}
  title="Jesus Central Church"
/>
```

## Development Guide

### Adding a Storyblok Component

1. **Create the component**:

   ```bash
   # Choose the appropriate category folder
   src/features/storyblok/components/
   ├── layout/       # Page structure
   ├── heroes/       # Hero sections
   ├── content/      # Text and rich content
   ├── cards/        # Card layouts
   ├── navigation/   # Menus and links
   ├── interactive/  # Buttons, forms, maps
   └── media/        # Images, videos, embeds
   ```

2. **Export from category**:

   ```typescript
   // src/features/storyblok/components/content/index.ts
   export { MyComponent } from "./MyComponent";
   ```

3. **Register in componentMap**:

   ```typescript
   // src/features/storyblok/components/index.ts
   import { MyComponent } from "./content";

   export const componentMap = {
     // ...
     my_component: MyComponent,
   };
   ```

4. **Create in Storyblok UI**:
   - Go to your Storyblok space
   - Create a new component matching the name (`my_component`)
   - Add fields as needed

5. **Regenerate types**:

   ```bash
   npm run storyblok:regenerate
   ```

6. **Use generated types**:

   ```typescript
   import type { MyComponentStoryblok } from "@storyblok/types/287435740670216/storyblok-components";

   export function MyComponent({ blok }: { blok: MyComponentStoryblok }) {
     // Component implementation
   }
   ```

### Path Aliases

- `@/*` → `src/*`
- `@storyblok/*` → `.storyblok/*` (generated types)

### Styling

- **Framework**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Custom Colors**: CSS variables in `src/app/globals.css`
- **Fonts**:
  - Headings: TGS Perfect Condensed (local)
  - Body: Fira Sans (local)
- **Utilities**: Use `cn()` from `src/utils/cn.ts` for conditional classes

## Deployment

### Environment Variables Checklist

Make sure these are set in your hosting platform:

- [ ] `NEXT_PUBLIC_STORYBLOK_TOKEN`
- [ ] `NEXT_PUBLIC_STORYBLOK_IS_PREVIEW` (set to `false` for production)
- [ ] `NEXT_PUBLIC_BASE_PATH` (your site's folder name in Storyblok)
- [ ] `NEXT_PUBLIC_BASE_URL` (your site's public URL)
- [ ] `MOLLIE_API_KEY` (if using donations)
- [ ] `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (if using maps)

### Build Commands

Most hosting platforms auto-detect Next.js. If not:

- **Build**: `npm run build`
- **Start**: `npm start`

### Storyblok Webhook (Optional)

For instant cache revalidation on content changes:

1. Go to Storyblok Settings → Webhooks
2. Create webhook: `https://your-domain.com/api/revalidate`
3. Set story published/unpublished events

## Troubleshooting

### Types not generating

```bash
# Make sure you're authenticated with Storyblok
npm run storyblok:pull
npm run storyblok:generate-types
```

### Preview mode not working

Check that:

1. `NEXT_PUBLIC_STORYBLOK_IS_PREVIEW=true` in `.env.local`
2. Storyblok Visual Editor URL is set to your dev server (e.g., `http://localhost:3000/`)
3. You've added your domain to Storyblok's allowed origins

### Multi-site pages not loading

Verify:

1. `NEXT_PUBLIC_BASE_PATH` matches your Storyblok folder name exactly
2. Stories are inside the correct base path folder in Storyblok
3. `website_config` story exists at `{BASE_PATH}/website_config`

## Documentation

- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [YouTube Feature Documentation](src/features/youtube/README.md)
- [Storyblok Feature Documentation](src/features/storyblok/README.md)

## Technical Details

For detailed architecture information and AI assistant instructions, see [CLAUDE.md](CLAUDE.md).
