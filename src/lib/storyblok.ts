import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/features/storyblok/components/Page";
import Teaser from "@/features/storyblok/components/Teaser";
import Button from "@/features/storyblok/components/Button";
import VideoHero from "@/features/storyblok/components/VideoHero";
import Content from "@/features/storyblok/components/Content";
import Grid from "@/features/storyblok/components/Grid";
import Badge from "@/features/storyblok/components/Badge";
import Scripture from "@/features/storyblok/components/Scripture";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    page: Page,
    teaser: Teaser,
    button: Button,
    videoHero: VideoHero,
    content: Content,
    grid: Grid,
    badge: Badge,
    scripture: Scripture,
  },
});

export const getStory = async (slug: string) => {
  const storyblok = getStoryblokApi();

  try {
    const { data } = await storyblok.get(`cdn/stories/${slug}`, {
      version: "draft",
    });

    return data?.story;
  } catch {
    return null;
  }
};
