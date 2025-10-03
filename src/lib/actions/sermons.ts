"use server";

import { fetchChannelRssFeed } from "@/features/youtube";

export const getSermons = async () => {
  const videos = await fetchChannelRssFeed(
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? ""
  );

  return videos;
};
