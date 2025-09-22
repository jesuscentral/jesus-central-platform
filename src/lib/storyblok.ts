import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/features/storyblok/components/Page";
import Teaser from "@/features/storyblok/components/Teaser";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    page: Page,
    teaser: Teaser,
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
