/**
 * YouTube RSS Feed Configuration
 */

/** Base URL for YouTube RSS feeds */
export const YOUTUBE_RSS_BASE_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=";

/** Base URL for YouTube video watch pages */
export const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";

/** Base URL for YouTube thumbnail images (high quality default) */
export const YOUTUBE_THUMBNAIL_URL = "https://i.ytimg.com/vi/";

/** Cache revalidation time in seconds (1 hour) */
export const CACHE_REVALIDATE_TIME = 3600;

/** Thumbnail quality options */
export const THUMBNAIL_QUALITY = {
  DEFAULT: "default.jpg", // 120x90
  MEDIUM: "mqdefault.jpg", // 320x180
  HIGH: "hqdefault.jpg", // 480x360
  STANDARD: "sddefault.jpg", // 640x480
  MAXRES: "maxresdefault.jpg", // 1280x720
} as const;

/** Default thumbnail quality to use */
export const DEFAULT_THUMBNAIL_QUALITY = THUMBNAIL_QUALITY.HIGH;
