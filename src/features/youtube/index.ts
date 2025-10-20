/**
 * YouTube RSS Feed Integration
 *
 * This module provides functionality to fetch and parse YouTube channel RSS feeds.
 *
 * @example
 * ```ts
 * import { fetchChannelRssFeed, type RssVideo } from '@/features/youtube';
 *
 * const videos = await fetchChannelRssFeed('UCxxxxxxxxxxxxx');
 * videos.forEach(video => {
 *   console.log(video.title, video.publishedAt);
 * });
 * ```
 */

// Export main API
export { fetchChannelRssFeed } from './api'

// Export types
export type { RssVideo } from './types'

// Export constants for advanced usage
export {
  YOUTUBE_RSS_BASE_URL,
  YOUTUBE_WATCH_URL,
  YOUTUBE_THUMBNAIL_URL,
  CACHE_REVALIDATE_TIME,
  THUMBNAIL_QUALITY,
} from './constants'
