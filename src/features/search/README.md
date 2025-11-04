# Search Feature

Algolia-powered site search with a beautiful, animated search interface.

## Overview

This feature provides a seamless search experience for users to find pages and events across the site. It uses Algolia's crawler index to provide fast, relevant search results with highlighting and keyboard navigation.

## Features

- **Search Icon Button**: Top-right search button matching the site's design system
- **Animated Dialog**: Full-screen search dialog with smooth animations
- **Keyboard Navigation**: Arrow keys, Enter, and Escape support
- **Global Shortcuts**: `Cmd/Ctrl+K` and `/` to open search from anywhere
- **Result Highlighting**: Algolia highlights matching terms in results
- **Responsive Design**: Works beautifully on all screen sizes
- **Debounced Queries**: Efficient search with 250ms debounce
- **Auto-close**: Closes on navigation or result click

## Setup

### 1. Environment Variables

Add the following to your `.env.local`:

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_only_api_key
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=your_index_name
```

**Important**: Use a search-only API key (not an admin key) for client-side usage.

### 2. Algolia Configuration

1. Create an Algolia application at [algolia.com](https://www.algolia.com)
2. Set up a crawler index that indexes your site
3. Configure the crawler to index:
   - Page titles
   - Page URLs
   - Page content
   - Page hierarchy (breadcrumbs)
   - Content type (page, event, etc.)

### 3. Verify Index Structure

The search expects the following attributes in your Algolia index:

- `title` - Page/event title
- `url` - Full URL to the page
- `type` - Content type (optional)
- `content` - Main content text
- `hierarchy` - Array of breadcrumb items (optional)

## Usage

### Basic Integration

The search is automatically integrated into the `Navigation` component. No additional setup required once environment variables are configured.

### Customization

#### Change Search Attributes

Edit `src/features/search/algolia.ts` to modify which attributes are retrieved:

```typescript
const response = await index.search(query, {
  hitsPerPage: 8,
  attributesToRetrieve: ['title', 'url', 'type', 'content', 'hierarchy'],
  attributesToHighlight: ['title', 'content'],
})
```

#### Customize Result Count

Change `hitsPerPage` in the search configuration:

```typescript
const response = await index.search(query, {
  hitsPerPage: 12, // Show more results
  // ...
})
```

#### Modify Styling

The search dialog uses Tailwind CSS classes. Key styling files:

- `search-dialog.tsx` - Main dialog styling
- `search-button.tsx` - Search icon button
- `search-result-item.tsx` - Individual result cards

Colors use the brand color system:

- `strategy-red` - Accent color
- `freedom` - Text color
- `boldness` - Background color

## Keyboard Shortcuts

- `Cmd/Ctrl+K` - Open search (works from anywhere)
- `/` - Open search (when not in an input field)
- `↑/↓` - Navigate results
- `Enter` - Open selected result
- `Esc` - Close search

## API

### `performSearch(query: string): Promise<SearchResult[]>`

Performs a search query against Algolia.

```typescript
import { performSearch } from '@/features/search'

const results = await performSearch('church')
```

### `isAlgoliaConfigured(): boolean`

Checks if Algolia environment variables are set.

```typescript
import { isAlgoliaConfigured } from '@/features/search'

if (isAlgoliaConfigured()) {
  // Algolia is ready
}
```

### `useSearchShortcuts(onOpen: () => void, isOpen: boolean)`

Hook for global keyboard shortcuts.

```typescript
import { useSearchShortcuts } from '@/features/search'

const [isOpen, setIsOpen] = useState(false)
useSearchShortcuts(() => setIsOpen(true), isOpen)
```

## Types

### `SearchResult`

```typescript
interface SearchResult {
  id: string
  title: string
  url: string
  type?: string
  breadcrumb?: string
  snippet?: string
  highlightedTitle: string
  highlightedSnippet?: string
}
```

## Performance

- **Dynamic Import**: Search dialog is loaded on-demand to reduce initial bundle size
- **Debouncing**: Search queries are debounced by 250ms to reduce API calls
- **Lite Build**: Uses `algoliasearch/lite` for minimal bundle size
- **Client-Only**: All search code runs client-side to avoid SSR issues

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Escape key support

## Troubleshooting

### Search Not Working

1. Check environment variables are set correctly
2. Verify Algolia credentials are valid
3. Ensure index name matches your Algolia index
4. Check browser console for errors

### No Results Showing

1. Verify your Algolia index has data
2. Check that the index name is correct
3. Ensure attributes match what the code expects
4. Test the search directly in Algolia dashboard

### Keyboard Shortcuts Not Working

1. Ensure you're not typing in an input/textarea
2. Check that the search dialog isn't already open (for `/` shortcut)
3. Verify `useSearchShortcuts` is called in your component

## Future Enhancements

Potential improvements:

- Recent searches
- Search suggestions/autocomplete
- Filter by content type
- Search analytics
- Voice search support
