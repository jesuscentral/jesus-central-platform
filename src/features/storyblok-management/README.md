# Storyblok Management Feature

A comprehensive feature for managing Storyblok content through the Management API. This feature provides a clean, organized structure for creating, updating, and managing Storyblok stories and assets.

## Overview

This feature encapsulates all Storyblok Management API operations, including:

- Story creation, updating, and deletion
- Asset management and retrieval
- Event management
- Reusable UI components for asset selection

## Directory Structure

```
src/features/storyblok-management/
├── api/                      # Management API functions
│   ├── config.ts            # API configuration and auth
│   ├── assets.ts            # Asset-related API calls
│   ├── stories.ts           # Story-related API calls
│   └── index.ts             # API exports
├── actions/                  # Server actions
│   ├── events.ts            # Event creation and management
│   └── index.ts             # Action exports
├── components/               # React components
│   ├── AssetSelector.tsx    # Reusable asset picker component
│   ├── CreateEventForm.tsx  # Event creation form
│   └── index.ts             # Component exports
├── types/                    # TypeScript type definitions
│   ├── index.ts             # Core Management API types
│   └── events.ts            # Event-specific types
├── utils/                    # Utility functions (future use)
├── index.ts                  # Main feature export
└── README.md                 # This file
```

## Configuration

### Environment Variables

Required environment variable:

```bash
STORYBLOK_MANAGEMENT_TOKEN=your_management_api_token_here
```

Get your Management API token from:

1. Go to your Storyblok space settings
2. Navigate to "Access Tokens"
3. Create a new Management API token
4. Add it to your `.env` file

**Note:** This is different from the public Content Delivery API token (`NEXT_PUBLIC_STORYBLOK_TOKEN`).

## Usage

### Importing

```typescript
// Import everything
import {
  createEvent,
  AssetSelector,
  fetchImageAssets,
} from '@/features/storyblok-management'

// Import specific modules
import { createStory, updateStory } from '@/features/storyblok-management/api'
import { createEvent } from '@/features/storyblok-management/actions'
import { AssetSelector } from '@/features/storyblok-management/components'
import type {
  StoryblokAsset,
  CreateEventFormData,
} from '@/features/storyblok-management'
```

### API Functions

#### Story Management

```typescript
import {
  createStory,
  updateStory,
  deleteStory,
} from '@/features/storyblok-management'

// Create a story
const result = await createStory({
  name: 'My New Story',
  slug: 'my-new-story',
  content: {
    component: 'page',
    title: 'Page Title',
    // ... other content fields
  },
  published: true,
})

// Update a story
await updateStory(storyId, {
  name: 'Updated Name',
  published: true,
})

// Delete a story
await deleteStory(storyId)
```

#### Asset Management

````typescript
import { fetchAssets, fetchImageAssets } from "@/features/storyblok-management";

// Fetch all assets with filters
const { assets } = await fetchAssets({
  search: "logo",
  sort_by: "updated_at:desc",
  per_page: 50,
});

// Fetch only image assets
const images = await fetchImageAssets({
  search: "banner",
  per_page: 100,
});
```

### Components

#### AssetSelector

A reusable component for selecting images from Storyblok assets.

```typescript
import { AssetSelector } from '@/features/storyblok-management';

function MyForm() {
  const [selectedAssetId, setSelectedAssetId] = useState<number>();

  return (
    <AssetSelector
      label="Choose Image"
      selectedAssetId={selectedAssetId}
      onSelect={(assetId) => setSelectedAssetId(assetId)}
    />
  );
}
````

**Props:**

- `selectedAssetId?: number` - Currently selected asset ID
- `onSelect: (assetId: number) => void` - Callback when an asset is selected
- `label?: string` - Label for the selector (default: "Select Image")
- `className?: string` - Additional CSS classes

**Features:**

- Visual grid display of images
- Real-time search by filename or alt text
- Hover effects and selection highlighting
- Responsive grid (2-4 columns)
- Scrollable container with max height
- Loading state

#### CreateEventForm

A complete form for creating events in Storyblok.

```typescript
import { CreateEventForm } from '@/features/storyblok-management';

export default function NewEventPage() {
  return (
    <div className="container">
      <CreateEventForm />
    </div>
  );
}
```

**Features:**

- All required event fields
- Asset selection for thumbnail and preacher picture
- Video file upload
- Form validation
- Success/error feedback
- Auto-reset on success

### Actions

#### Creating Events

```typescript
import { createEvent } from '@/features/storyblok-management'
import type {
  CreateEventFormData,
  EventFiles,
  EventSelectedAssets,
} from '@/features/storyblok-management'

const formData: CreateEventFormData = {
  title: 'Sunday Service',
  description: 'Join us for worship',
  date: '2025-10-19T10:00',
  speaker: 'John Doe',
  location: 'Main Auditorium',
  type: 'service',
  language: 'Nederlands',
  translationAvailable: true,
  youtubeLink: 'https://youtube.com/watch?v=...',
}

const selectedAssets: EventSelectedAssets = {
  thumbnailAssetId: 12345,
  preacherPictureAssetId: 67890,
}

const files: EventFiles = {
  video: videoFile, // Optional
}

const result = await createEvent(formData, files, selectedAssets)

if (result.success) {
  console.log('Event created:', result.storyId)
} else {
  console.error('Error:', result.error)
}
```

## Types

### Core Types

```typescript
// Asset object from Storyblok
interface StoryblokAsset {
  id: number;
  filename: string;
  short_filename: string;
  content_type: string;
  alt: string;
  // ... more properties
}

// Parameters for fetching assets
interface FetchAssetsParams {
  in_folder?: number;
  sort_by?: 'created_at:asc' | 'created_at:desc' | ...;
  search?: string;
  per_page?: number;
  page?: number;
  // ... more options
}

// Story creation parameters
interface CreateStoryParams {
  name: string;
  slug: string;
  content: Record<string, unknown>;
  parent_id?: number;
  published?: boolean;
}
```

### Event Types

```typescript
// Event form data
interface CreateEventFormData {
  title: string
  description: string
  date: string
  speaker?: string
  location?: string
  type?: 'service' | 'event' | ''
  language: 'Nederlands' | 'Engels' | ''
  translationAvailable?: boolean
  youtubeLink?: string
}

// Event creation result
interface CreateEventResult {
  success: boolean
  error?: string
  storyId?: number
  storySlug?: string
}
```

## Best Practices

### Server Actions

All API functions are marked with `"use server"` and should only be called from server components or client components using server actions.

```typescript
// ✅ Good - Server action
'use server'
export async function myServerAction() {
  const assets = await fetchAssets()
  return assets
}

// ❌ Bad - Direct API call in client component
;('use client')
function MyComponent() {
  const assets = await fetchAssets() // Won't work!
}
```

### Asset Selection

When selecting assets for stories, prefer using `AssetSelector` component over file uploads when the assets already exist in Storyblok.

```typescript
// ✅ Good - Reuse existing assets
<AssetSelector onSelect={handleSelect} />

// ⚠️ Acceptable - Upload new assets only when necessary
<input type="file" onChange={handleUpload} />
```

### Error Handling

Always handle errors when working with the Management API:

```typescript
try {
  const result = await createStory(params)
  // Handle success
} catch (error) {
  console.error('Failed to create story:', error)
  // Show user-friendly error message
}
```

## Architecture Decisions

### Why a Separate Feature?

1. **Separation of Concerns**: Management API operations are distinct from content delivery
2. **Reusability**: Components and functions can be used across different pages
3. **Maintainability**: All related code is in one organized location
4. **Type Safety**: Centralized type definitions prevent inconsistencies
5. **Testability**: Isolated modules are easier to test

### File Organization

- `api/`: Pure API functions, no React dependencies
- `actions/`: Server actions that may include business logic
- `components/`: React components for UI
- `types/`: Shared TypeScript types
- `utils/`: Helper functions (for future use)

## Migration Guide

If you're migrating from the old `management-api.ts` file:

```typescript
// Old
import { createStory } from '@/features/storyblok/management-api'

// New
import { createStory } from '@/features/storyblok-management'
```

The old file will continue to work (re-exports from the new location) but is marked as deprecated.

## Future Enhancements

Potential additions to this feature:

- [ ] Bulk story operations
- [ ] Asset folder management
- [ ] Story versioning
- [ ] Draft/publish workflows
- [ ] Asset upload with progress tracking
- [ ] Story duplication
- [ ] Scheduled publishing
- [ ] Asset optimization before upload

## Related Documentation

- [Storyblok Management API Docs](https://www.storyblok.com/docs/api/management)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Project CLAUDE.md](../../../CLAUDE.md) - Main project documentation
