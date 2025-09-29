import { XMLParser } from "fast-xml-parser";

const BASE_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

export type RssVideo = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string; // ISO
  thumbnailUrl: string;
  channelId: string;
  url: string;
};

export const fetchChannelRssFeed = async (channelId: string) => {
  const res = await fetch(`${BASE_URL}${channelId}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`RSS fetch failed (${res.status}): ${txt}`);
  }

  const xml = await res.text();

  // Keep attributes (e.g., thumbnail url)
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    // RSS uses coloned names (media:group, yt:videoId). fast-xml-parser keeps them as-is.
  });

  const data = parser.parse(xml);

  const feed = data?.feed;
  if (!feed) return [];

  const entries = Array.isArray(feed.entry)
    ? feed.entry
    : feed.entry
      ? [feed.entry]
      : [];
  const channelIdFromFeed: string | undefined = feed["yt:channelId"];

  const videos: RssVideo[] = entries
    .map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (entry: any) => {
        const rawVideoId: string | undefined = entry["yt:videoId"];
        const videoId =
          rawVideoId ??
          (typeof entry.id === "string" && entry.id.includes(":")
            ? entry.id.split(":").pop()
            : entry.id);

        if (!videoId) return null;

        // link can be object or array; prefer first link href
        const link =
          (Array.isArray(entry.link)
            ? entry.link[0]?.href
            : entry.link?.href) || `https://www.youtube.com/watch?v=${videoId}`;

        const thumb =
          entry["media:group"]?.["media:thumbnail"]?.url ||
          entry["media:thumbnail"]?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        return {
          videoId,
          title: entry.title ?? "",
          description:
            entry["media:group"]?.["media:description"]?.toString() ?? "",
          publishedAt: entry.published ?? new Date().toISOString(),
          thumbnailUrl: thumb,
          channelId: channelIdFromFeed ?? channelId,
          url: link,
        } as RssVideo;
      }
    )
    .filter(Boolean);

  return videos;
};
