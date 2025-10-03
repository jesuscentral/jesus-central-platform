/**
 * Represents a video from a YouTube RSS feed
 */
export interface RssVideo {
  /** YouTube video ID */
  videoId: string;
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** ISO timestamp of when video was published */
  publishedAt: string;
  /** URL to video thumbnail image */
  thumbnailUrl: string;
  /** YouTube channel ID */
  channelId: string;
  /** Full YouTube video URL */
  url: string;
}

/**
 * Raw RSS feed entry structure from YouTube
 * @internal
 */
export interface RssFeedEntry {
  "yt:videoId"?: string;
  id?: string;
  title?: string;
  published?: string;
  link?: RssFeedLink | RssFeedLink[];
  "media:group"?: {
    "media:description"?: string;
    "media:thumbnail"?: {
      url?: string;
    };
  };
  "media:thumbnail"?: {
    url?: string;
  };
}

/**
 * RSS feed link structure
 * @internal
 */
export interface RssFeedLink {
  href?: string;
}

/**
 * Raw RSS feed structure from YouTube
 * @internal
 */
export interface RssFeed {
  feed?: {
    "yt:channelId"?: string;
    entry?: RssFeedEntry | RssFeedEntry[];
  };
}
