"use server";

import type { RssVideo } from "./types";
import { YOUTUBE_RSS_BASE_URL, CACHE_REVALIDATE_TIME } from "./constants";
import {
  parseRssXml,
  normalizeEntries,
  extractChannelId,
} from "./utils/parser";
import { formatRssEntry } from "./utils/formatters";

/**
 * Fetch and parse YouTube channel RSS feed
 *
 * @param channelId - YouTube channel ID
 * @returns Array of video objects from the RSS feed
 * @throws Error if the RSS fetch fails
 *
 * @example
 * ```ts
 * const videos = await fetchChannelRssFeed('UCxxxxxxxxxxxxx');
 * console.log(videos[0].title);
 * ```
 */
export async function fetchChannelRssFeed(
  channelId: string
): Promise<RssVideo[]> {
  // Fetch RSS feed from YouTube
  const response = await fetch(`${YOUTUBE_RSS_BASE_URL}${channelId}`, {
    next: { revalidate: CACHE_REVALIDATE_TIME },
  });

  // Handle fetch errors
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`RSS fetch failed (${response.status}): ${errorText}`);
  }

  // Parse XML response
  const xml = await response.text();
  const data = parseRssXml(xml);

  // Extract channel ID from feed (use provided as fallback)
  const feedChannelId = extractChannelId(data) ?? channelId;

  // Normalize entries to array
  const entries = normalizeEntries(data);

  console.log(entries);

  // Transform entries to RssVideo objects
  const videos = entries
    .map((entry) => formatRssEntry(entry, feedChannelId))
    .filter((video): video is RssVideo => video !== null)
    .filter((video) => !video.url.includes("shorts"));

  return videos;
}
