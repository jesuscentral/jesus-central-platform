import type { RssVideo, RssFeedEntry } from '../types'
import {
  YOUTUBE_WATCH_URL,
  YOUTUBE_THUMBNAIL_URL,
  DEFAULT_THUMBNAIL_QUALITY,
} from '../constants'

/**
 * Extract video ID from RSS feed entry
 * Tries multiple methods to find the video ID
 */
export function extractVideoId(entry: RssFeedEntry): string | null {
  // Try direct yt:videoId field
  const rawVideoId = entry['yt:videoId']
  if (rawVideoId) return rawVideoId

  // Try extracting from id field if it contains a colon
  if (typeof entry.id === 'string' && entry.id.includes(':')) {
    const parts = entry.id.split(':')
    return parts[parts.length - 1] || null
  }

  // Return id as-is if it exists
  if (entry.id) return entry.id

  return null
}

/**
 * Extract video URL from RSS feed entry
 * Prefers link from entry, falls back to constructing from video ID
 */
export function extractVideoUrl(entry: RssFeedEntry, videoId: string): string {
  // Handle link as array
  if (Array.isArray(entry.link)) {
    const href = entry.link[0]?.href
    if (href) return href
  }

  // Handle link as single object
  if (entry.link && !Array.isArray(entry.link) && entry.link.href) {
    return entry.link.href
  }

  // Fallback to constructing URL from video ID
  return `${YOUTUBE_WATCH_URL}${videoId}`
}

/**
 * Extract thumbnail URL from RSS feed entry
 * Tries multiple locations in the feed structure
 */
export function extractThumbnailUrl(
  entry: RssFeedEntry,
  videoId: string,
): string {
  // Try media:group > media:thumbnail
  const mediaGroupThumb = entry['media:group']?.['media:thumbnail']?.url
  if (mediaGroupThumb) return mediaGroupThumb

  // Try direct media:thumbnail
  const directThumb = entry['media:thumbnail']?.url
  if (directThumb) return directThumb

  // Fallback to constructing from video ID
  return `${YOUTUBE_THUMBNAIL_URL}${videoId}/${DEFAULT_THUMBNAIL_QUALITY}`
}

/**
 * Extract video description from RSS feed entry
 */
export function extractDescription(entry: RssFeedEntry): string {
  const description = entry['media:group']?.['media:description']
  return description?.toString() ?? ''
}

/**
 * Extract video title from RSS feed entry
 */
export function extractTitle(entry: RssFeedEntry): string {
  return entry.title ?? ''
}

/**
 * Extract published date from RSS feed entry
 * Returns ISO timestamp
 */
export function extractPublishedAt(entry: RssFeedEntry): string {
  return entry.published ?? new Date().toISOString()
}

/**
 * Transform raw RSS feed entry into structured RssVideo object
 * @param entry - Raw RSS feed entry
 * @param fallbackChannelId - Channel ID to use if not in entry
 * @returns Formatted RssVideo object or null if video ID is missing
 */
export function formatRssEntry(
  entry: RssFeedEntry,
  fallbackChannelId: string,
): RssVideo | null {
  const videoId = extractVideoId(entry)
  if (!videoId) return null

  return {
    videoId,
    title: extractTitle(entry),
    description: extractDescription(entry),
    publishedAt: extractPublishedAt(entry),
    thumbnailUrl: extractThumbnailUrl(entry, videoId),
    channelId: fallbackChannelId,
    url: extractVideoUrl(entry, videoId),
  }
}
