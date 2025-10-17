# Jesus Central Church - Landing Page

A modern, multi-site church website platform built with Next.js 15 and Storyblok CMS.

## Features

- **Storyblok CMS**: Headless CMS with visual editing and component-based content management
- **Multi-site Support**: Manage multiple church sites from a single Storyblok space using base paths
- **YouTube Integration**: Automatic sermon video feed from YouTube RSS
- **Donation System**: Complete Mollie payment integration
  - One-time and recurring donations
  - Subscription management dashboard
  - Payment history tracking
  - Customer mandate handling
- **Member Portal**: Authenticated user area with Clerk
  - Event management for authorized users
  - Monthly giving management
  - ANBI information display
  - Announcement requests
- **Interactive Maps**: Mapbox integration for location display
- **Event Management**: Filterable event listings with calendar integration
- **Edge Config**: Feature flags and runtime configuration via Vercel Edge Config
- **Asset Management**: Storyblok asset browser with folder filtering
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
   STORYBLOK_MANAGEMENT_TOKEN=your_management_token  # For asset management

   # Multi-site Configuration (Required)
   NEXT_PUBLIC_BASE_PATH=jesuscentral        # Folder name in Storyblok
   NEXT_PUBLIC_BASE_URL=https://jesuscentral.church

   # YouTube Configuration (Required for sermons)
   NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_youtube_channel_id

   # Payment Integration (Optional - Required for donations)
   MOLLIE_API_KEY=your_mollie_api_key

   # Authentication (Required for member portal)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Maps Integration (Optional - Required for location maps)
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token

   # Edge Config (Optional - For feature flags and runtime config)
   EDGE_CONFIG=your_edge_config_connection_string
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
├── app/
│   ├── (admin)/                  # Member portal (protected routes)
│   │   ├── mijn-jesus-central/  # Dashboard and user pages
│   │   │   ├── agenda/          # Event management page
│   │   │   ├── geven/           # Donation management page
│   │   │   └── page.tsx         # Dashboard home
│   │   └── components/          # Admin-specific components
│   │       └── AdminNav.tsx     # Admin navigation menu
│   ├── (website)/               # Public website routes
│   │   ├── [...slug]/           # Dynamic pages from Storyblok
│   │   ├── agenda/              # Public events page
│   │   ├── preken/              # Sermons page (YouTube)
│   │   └── activiteiten/        # Activity pages
│   └── api/                     # API routes
│       ├── revalidate/          # Cache revalidation webhook
│       ├── webhooks/mollie/     # Mollie payment webhooks
│       └── youtube/             # YouTube RSS proxy
├── components/
│   ├── admin/                   # Admin portal components
│   │   └── AdminNav.tsx         # Navigation for member area
│   ├── forms/                   # Form components
│   │   └── EventForm.tsx        # Event creation/editing form
│   ├── StoryblokProvider.tsx    # Storyblok bridge component
│   ├── sermons/                 # Sermon display components
│   └── ui/                      # Design system (Atomic Design)
│       ├── atoms/               # Button, Badge, Heading, etc.
│       ├── molecules/           # Composed components
│       └── organisms/           # CinematicMenu, MapboxMap, etc.
├── features/
│   ├── events/                  # Event management
│   │   ├── utils.ts            # Date filtering, sorting
│   │   └── types.ts            # Event type definitions
│   ├── mollie/                  # Complete payment integration
│   │   ├── api.ts              # Core Mollie API functions
│   │   ├── actions/            # Server actions
│   │   │   └── subscriptions.ts # Subscription management
│   │   ├── components/         # UI components
│   │   │   ├── PaymentHistory.tsx
│   │   │   ├── SubscriptionCard.tsx
│   │   │   └── NewSubscriptionForm.tsx
│   │   ├── types/              # TypeScript definitions
│   │   └── README.md           # Feature documentation
│   ├── storyblok/
│   │   ├── components/         # Storyblok components (by category)
│   │   │   ├── layout/        # Page, Section, Grid components
│   │   │   ├── heroes/        # Hero sections
│   │   │   ├── content/       # Text, images, rich content
│   │   │   ├── cards/         # Card components
│   │   │   ├── navigation/    # Footer, links
│   │   │   ├── interactive/   # Buttons, donations, maps
│   │   │   └── media/         # Images, embeds
│   │   ├── api.ts             # Storyblok API functions
│   │   ├── management-api.ts  # Storyblok Management API
│   │   ├── config.ts          # Configuration
│   │   ├── types/             # Type exports
│   │   └── utils/             # Helpers (linkResolver, SEO)
│   ├── storyblok-management/   # Asset management
│   │   ├── api/               # Management API functions
│   │   │   ├── assets.ts     # Asset fetching
│   │   │   └── stories.ts    # Story creation
│   │   ├── components/        # UI components
│   │   │   ├── asset-selector/ # Asset browser
│   │   │   └── ui/           # Reusable UI primitives
│   │   ├── hooks/            # Custom React hooks
│   │   └── types/            # Type definitions
│   └── youtube/               # YouTube RSS parsing
│       ├── api.ts            # Core fetch functions
│       ├── types.ts          # Type definitions
│       ├── utils/            # Parser and formatters
│       └── README.md         # Feature documentation
├── lib/
│   ├── storyblok.ts          # Storyblok setup
│   ├── mapbox.ts             # Mapbox configuration
│   ├── animations.ts         # Framer Motion presets
│   └── actions/              # Server actions
│       ├── config.ts         # Edge Config integration
│       ├── events.ts         # Event CRUD operations
│       └── sermons.ts        # YouTube video fetching
├── middleware.ts             # Clerk authentication middleware
└── utils/
    └── cn.ts                 # Tailwind class utility
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

Complete payment integration with subscription management:

```typescript
// Location: src/features/mollie/
import { createPayment, getSubscriptions } from "@/features/mollie";

// Create one-time payment
const redirectUrl = await createPayment(
  "10.00",
  false, // not recurring
  "Gift",
  "John Doe",
  "john@example.com"
);

// Get user's subscriptions
const subscriptions = await getSubscriptions(customerId);
```

**Features:**
- Customer management with automatic upsert
- One-time and recurring payments
- Monthly subscription management dashboard
- Payment history tracking
- Subscription editing (amount, description)
- Subscription cancellation
- SEPA mandate handling
- Webhook at `/api/webhooks/mollie` for updates
- Full serialization for client components

See [Mollie Feature Documentation](src/features/mollie/README.md) for detailed usage.

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

### Clerk Authentication

User authentication and member portal:

```typescript
// Middleware: src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Server-side auth
import { currentUser } from "@clerk/nextjs/server";
const user = await currentUser();

// Client-side components
import { UserButton, SignInButton } from "@clerk/nextjs";
```

**Features:**
- Dutch localization (`nlNL`)
- Protected routes for member portal (`/mijn-jesus-central/*`)
- User metadata for permissions
  - `canEditEvents` - Event management access
  - `canRequestAnnouncement` - Announcement requests
  - `mollieCustomerId` - Linked payment customer
- UserButton component in admin navigation
- Automatic permission assignment for `@jesuscentral.nl` emails

### Vercel Edge Config

Runtime configuration and feature flags:

```typescript
// Location: src/lib/actions/config.ts
import { getConfig } from "@/lib/actions/config";

const config = await getConfig();
if (config?.auth === false) {
  // Authentication disabled
}
```

**Configuration Options:**
- `auth` (boolean) - Enable/disable authentication
  - `true` - Member portal accessible
  - `false` - Member portal returns 404
- Easy runtime feature flag toggling without redeployment

**Setup:**
1. Create Edge Config in Vercel dashboard
2. Add configuration JSON:
   ```json
   {
     "auth": true
   }
   ```
3. Copy connection string to `EDGE_CONFIG` env var
4. Access config via `getConfig()` server action

### Storyblok Asset Management

Browse and select assets from Storyblok:

```typescript
// Location: src/features/storyblok-management/
import { AssetSelector } from "@/features/storyblok-management";

<AssetSelector
  selectedAssetId={selectedId}
  onSelect={(assetId) => setSelectedId(assetId)}
  folderName="public_events" // Filter to specific folder
/>
```

**Features:**
- Asset folder filtering
- Real-time search
- Lazy loading images
- Keyboard navigation
- Modern UI with skeleton states
- Used in event creation forms

### Member Portal

Authenticated user area at `/mijn-jesus-central`:

**Pages:**
- **Dashboard** (`/mijn-jesus-central`) - Welcome and overview
- **Agenda** (`/mijn-jesus-central/agenda`) - Event management (authorized users)
  - Create new events
  - Browse and select images from Storyblok
  - Publish events to website
- **Geven** (`/mijn-jesus-central/geven`) - Donation management
  - View payment history
  - Manage monthly subscriptions
  - Create/edit/cancel subscriptions
  - ANBI information

**Navigation:**
- Top navigation bar with links to all sections
- "Terug naar website" button to return to main site
- Clerk UserButton for account management
- Responsive design with mobile menu

**Permissions:**
- Users with `@jesuscentral.nl` email automatically get:
  - `canEditEvents: true`
  - `canRequestAnnouncement: true`
- Other users can only access donation management

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

**Required:**
- [ ] `NEXT_PUBLIC_STORYBLOK_TOKEN` - Storyblok Content Delivery API token
- [ ] `NEXT_PUBLIC_STORYBLOK_IS_PREVIEW` - Set to `false` for production
- [ ] `NEXT_PUBLIC_BASE_PATH` - Your site's folder name in Storyblok
- [ ] `NEXT_PUBLIC_BASE_URL` - Your site's public URL

**Optional (Feature-dependent):**
- [ ] `STORYBLOK_MANAGEMENT_TOKEN` - For asset management in event creation
- [ ] `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` - For sermon videos
- [ ] `MOLLIE_API_KEY` - For payment processing
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - For member portal (public)
- [ ] `CLERK_SECRET_KEY` - For member portal (server-side)
- [ ] `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` - For interactive maps
- [ ] `EDGE_CONFIG` - For runtime configuration and feature flags

### Build Commands

Most hosting platforms auto-detect Next.js. If not:

- **Build**: `npm run build`
- **Start**: `npm start`

### Storyblok Webhook (Optional)

For instant cache revalidation on content changes:

1. Go to Storyblok Settings → Webhooks
2. Create webhook: `https://your-domain.com/api/revalidate`
3. Set story published/unpublished events

### Vercel Edge Config Setup (Optional)

For runtime configuration without redeployment:

1. **Create Edge Config:**
   - Go to Vercel Dashboard → Storage → Edge Config
   - Click "Create Edge Config"
   - Name it (e.g., `jcc-config`)

2. **Add Configuration:**
   - Click on your Edge Config
   - Add items via the UI or JSON editor:
     ```json
     {
       "auth": true
     }
     ```

3. **Connect to Project:**
   - Copy the connection string
   - Add to environment variables: `EDGE_CONFIG=https://edge-config.vercel.com/...`
   - Redeploy or the connection will be automatically available

4. **Usage in Code:**
   ```typescript
   import { getConfig } from "@/lib/actions/config";
   const config = await getConfig();
   ```

**Available Configuration:**
- `auth` (boolean) - Enable/disable member portal authentication

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

### External Documentation
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Mollie API](https://docs.mollie.com/)
- [Vercel Edge Config](https://vercel.com/docs/storage/edge-config)

### Feature Documentation
- [YouTube Feature](src/features/youtube/README.md) - YouTube RSS integration
- [Mollie Feature](src/features/mollie/README.md) - Payment and subscription management
- [Storyblok Feature](src/features/storyblok/README.md) - CMS integration

### Architecture Documentation
For detailed architecture information and AI assistant instructions, see [CLAUDE.md](CLAUDE.md).

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Storyblok (Headless CMS)
- **Authentication**: Clerk
- **Payments**: Mollie API
- **Maps**: Mapbox GL JS
- **Deployment**: Vercel
- **Edge Config**: Vercel Edge Config
- **Fonts**: TGS Perfect Condensed, Fira Sans
- **Animations**: Framer Motion
- **Date Formatting**: date-fns (Dutch locale)
