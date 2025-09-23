import { apiPlugin, SbBlokData, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/features/storyblok/components/Page";
import Teaser from "@/features/storyblok/components/Teaser";
import Button from "@/features/storyblok/components/Button";
import VideoHero from "@/features/storyblok/components/VideoHero";
import Content from "@/features/storyblok/components/Content";
import Grid from "@/features/storyblok/components/Grid";
import Badge from "@/features/storyblok/components/Badge";
import Scripture from "@/features/storyblok/components/Scripture";
import Footer from "@/features/storyblok/components/Footer";
import Link from "@/features/storyblok/components/Link";
import Global from "@/features/storyblok/components/Global";
import InformationItem from "@/features/storyblok/components/informationItem";
import Card from "@/features/storyblok/components/Card";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  bridge: true,
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
    footer: Footer,
    link: Link,
    global: Global,
    informationItem: InformationItem,
    card: Card,
  },
});

export const getStory = async (slug: string) => {
  const storyblok = getStoryblokApi();

  console.log("slug", slug);
  const finalSlug =
    slug === "/" || slug === "" || slug === undefined ? "home" : slug;

  try {
    const resolveRelations = ["global_footer"];

    const { data } = await storyblok.get(`cdn/stories/${finalSlug}`, {
      version: "draft",
      resolve_relations: resolveRelations,
    });

    if (!data?.story) {
      return null;
    }

    const resolvedRelations = data?.rels;

    const updatedStory = updateStory(data?.story, resolvedRelations);

    return updatedStory;
  } catch {
    return null;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateStory = (story: any, global_footer: SbBlokData[]) => {
  if (story.content && "global_footer" in story.content) {
    story.content.global_footer = global_footer;
  }

  return story;
};
