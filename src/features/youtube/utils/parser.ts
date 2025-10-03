import { XMLParser } from "fast-xml-parser";
import type { RssFeed } from "../types";

/**
 * XML Parser configuration for YouTube RSS feeds
 */
const XML_PARSER_CONFIG = {
  ignoreAttributes: false,
  attributeNamePrefix: "",
  // RSS uses coloned names (media:group, yt:videoId). fast-xml-parser keeps them as-is.
};

/**
 * Create and configure an XML parser for YouTube RSS feeds
 */
export function createXmlParser(): XMLParser {
  return new XMLParser(XML_PARSER_CONFIG);
}

/**
 * Parse raw XML string into structured RSS feed data
 * @param xml - Raw XML string from YouTube RSS feed
 * @returns Parsed RSS feed structure
 */
export function parseRssXml(xml: string): RssFeed {
  const parser = createXmlParser();
  return parser.parse(xml);
}

/**
 * Normalize RSS feed entries to always return an array
 * Handles cases where feed.entry might be undefined, a single object, or an array
 * @param feed - Parsed RSS feed data
 * @returns Array of feed entries
 */
export function normalizeEntries(feed: RssFeed) {
  const feedData = feed?.feed;
  if (!feedData) return [];

  const entry = feedData.entry;

  if (Array.isArray(entry)) {
    return entry;
  }

  if (entry) {
    return [entry];
  }

  return [];
}

/**
 * Extract channel ID from the RSS feed
 * @param feed - Parsed RSS feed data
 * @returns Channel ID or undefined
 */
export function extractChannelId(feed: RssFeed): string | undefined {
  return feed?.feed?.["yt:channelId"];
}
