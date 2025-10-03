# YouTube RSS Feed Integration

This feature module provides functionality to fetch and parse YouTube channel RSS feeds for displaying sermon videos.

## Overview

The YouTube integration fetches video data from YouTube's RSS feed API, which provides a simple, unauthenticated way to get the latest videos from a channel. The data is cached for 1 hour to improve performance and reduce API calls.

## Structure

```
youtube/
├── index.ts              # Public API exports
├── api.ts                # Core API functions
├── types.ts              # TypeScript type definitions
├── constants.ts          # Configuration constants
├── utils/
│   ├── index.ts          # Utils exports
│   ├── parser.ts         # XML parsing logic
│   └── formatters.ts     # Data formatting utilities
└── README.md             # This file
```

## Usage

### Basic Usage

```typescript
import { fetchChannelRssFeed, type RssVideo } from "@/features/youtube";

// Fetch videos from a channel
const videos = await fetchChannelRssFeed("UCxxxxxxxxxxxxx");

// Use the video data
videos.forEach((video) => {
  console.log(video.title);
  console.log(video.publishedAt);
  console.log(video.thumbnailUrl);
});
```

### In Server Components

```typescript
import { fetchChannelRssFeed } from "@/features/youtube";

export default async function SermonsPage() {
  const sermons = await fetchChannelRssFeed(
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? ""
  );

  return (
    <div>
      {sermons.map((sermon) => (
        <div key={sermon.videoId}>
          <h2>{sermon.title}</h2>
          <img src={sermon.thumbnailUrl} alt={sermon.title} />
        </div>
      ))}
    </div>
  );
}
```

### In Server Actions

```typescript
"use server";

import { fetchChannelRssFeed } from "@/features/youtube";

export async function getSermons() {
  const videos = await fetchChannelRssFeed(
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? ""
  );
  return videos;
}
```

## API Reference

### `fetchChannelRssFeed(channelId: string): Promise<RssVideo[]>`

Fetches and parses the RSS feed for a YouTube channel.

**Parameters:**

- `channelId` (string) - The YouTube channel ID (starts with "UC")

**Returns:**

- `Promise<RssVideo[]>` - Array of video objects

**Throws:**

- `Error` - If the RSS feed fetch fails

**Caching:**

- Results are cached for 1 hour (3600 seconds)

### Types

#### `RssVideo`

```typescript
interface RssVideo {
  videoId: string; // YouTube video ID
  title: string; // Video title
  description: string; // Video description
  publishedAt: string; // ISO timestamp
  thumbnailUrl: string; // URL to thumbnail image
  channelId: string; // YouTube channel ID
  url: string; // Full YouTube video URL
}
```

## Configuration

### Environment Variables

```bash
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxx  # Your channel ID
```

### Constants

All configuration is centralized in `constants.ts`:

```typescript
import {
  YOUTUBE_RSS_BASE_URL,
  YOUTUBE_WATCH_URL,
  YOUTUBE_THUMBNAIL_URL,
  CACHE_REVALIDATE_TIME,
  THUMBNAIL_QUALITY,
} from "@/features/youtube";
```

- **CACHE_REVALIDATE_TIME**: 3600 seconds (1 hour)
- **THUMBNAIL_QUALITY**: Options for different thumbnail sizes

## Implementation Details

### XML Parsing

The module uses `fast-xml-parser` to parse YouTube's RSS feed XML. The parser is configured to:

- Preserve XML attributes (needed for thumbnail URLs)
- Keep namespace prefixes (e.g., `yt:videoId`, `media:group`)

### Data Extraction

Video data is extracted from multiple possible locations in the RSS feed:

- Video ID: `yt:videoId` → `id` field → fallback parsing
- Thumbnail: `media:group` → `media:thumbnail` → fallback URL construction
- Description: `media:group > media:description`

### Error Handling

- Network errors are propagated with descriptive messages
- Missing video IDs result in filtered entries (no null values)
- Missing fields fallback to empty strings or constructed URLs

## Utilities

### Parser Utilities (`utils/parser.ts`)

- `createXmlParser()` - Creates configured XML parser
- `parseRssXml(xml)` - Parses XML string to structured data
- `normalizeEntries(feed)` - Ensures entries is always an array
- `extractChannelId(feed)` - Extracts channel ID from feed

### Formatter Utilities (`utils/formatters.ts`)

- `extractVideoId(entry)` - Extracts video ID from entry
- `extractVideoUrl(entry, videoId)` - Gets or constructs video URL
- `extractThumbnailUrl(entry, videoId)` - Gets or constructs thumbnail URL
- `extractDescription(entry)` - Extracts video description
- `extractTitle(entry)` - Extracts video title
- `extractPublishedAt(entry)` - Extracts publish timestamp
- `formatRssEntry(entry, channelId)` - Transforms entry to RssVideo

## Integration Points

### Used By

- **Server Action**: `src/lib/actions/sermons.ts` - Wraps fetch for sermon data
- **Sermon Components**: `src/components/sermons/` - Display sermon cards and lists
- **Preken Page**: `src/app/preken/page.tsx` - Main sermons page

### API Route

- `src/app/api/youtube/channel/rss/route.ts` - Proxy endpoint (cached, force-static)

## Performance

- **Caching**: RSS feed responses are cached for 1 hour
- **Static Generation**: API route uses `force-static` for build-time generation
- **Revalidation**: Automatic revalidation after cache expiry

## Best Practices

1. **Always handle errors**: Wrap `fetchChannelRssFeed` in try-catch blocks
2. **Use environment variables**: Don't hardcode channel IDs
3. **Type your data**: Use the `RssVideo` type for type safety
4. **Cache appropriately**: Leverage Next.js caching for better performance

## Troubleshooting

### No Videos Returned

- Verify the channel ID is correct (starts with "UC")
- Check if the channel has published videos
- Ensure RSS feed is accessible (public channel)

### Parsing Errors

- Check if YouTube's RSS feed format has changed
- Verify XML parser configuration in `utils/parser.ts`

### Cache Issues

- Clear Next.js cache: `rm -rf .next`
- Adjust `CACHE_REVALIDATE_TIME` in `constants.ts`

## Future Enhancements

- [ ] Add video filtering by date range
- [ ] Support for playlists RSS feeds
- [ ] Pagination support for large channels
- [ ] Video duration extraction
- [ ] View count and likes (requires YouTube Data API)
