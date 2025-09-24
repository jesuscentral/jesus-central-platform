import {
  apiPlugin,
  ISbStoriesParams,
  SbBlokData,
  storyblokInit,
} from "@storyblok/react/rsc";
import Page from "@/features/storyblok/components/Page";
import Teaser from "@/features/storyblok/components/Teaser";
import Button from "@/features/storyblok/components/Button";
import VideoHero from "@/features/storyblok/components/VideoHero";
import ImageHero from "@/features/storyblok/components/ImageHero";
import Image from "@/features/storyblok/components/Image";
import Content from "@/features/storyblok/components/Content";
import Grid from "@/features/storyblok/components/Grid";
import FullGrid from "@/features/storyblok/components/FullGrid";
import Badge from "@/features/storyblok/components/Badge";
import Scripture from "@/features/storyblok/components/Scripture";
import Footer from "@/features/storyblok/components/Footer";
import Link from "@/features/storyblok/components/Link";
import Global from "@/features/storyblok/components/Global";
import InformationItem from "@/features/storyblok/components/informationItem";
import Card from "@/features/storyblok/components/Card";
import ScrollingText from "@/features/storyblok/components/ScrollingText";
import ImageCard from "@/features/storyblok/components/ImageCard";
import StaticGrid from "@/features/storyblok/components/StaticGrid";
import PersonCard from "@/features/storyblok/components/PersonCard";
import Donation from "@/features/storyblok/components/Donation";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  bridge:
    process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW === "true" ? false : true,
  apiOptions: {
    region: "eu",
  },
  components: {
    page: Page,
    teaser: Teaser,
    button: Button,
    videoHero: VideoHero,
    imageHero: ImageHero,
    image: Image,
    content: Content,
    grid: Grid,
    fullGrid: FullGrid,
    badge: Badge,
    scripture: Scripture,
    footer: Footer,
    link: Link,
    global: Global,
    informationItem: InformationItem,
    card: Card,
    scrollingText: ScrollingText,
    imageCard: ImageCard,
    staticGrid: StaticGrid,
    personCard: PersonCard,
    donation: Donation,
  },
});

export const storyblokApiConfig: ISbStoriesParams = {
  version:
    process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW === "true"
      ? "draft"
      : "published",
  resolve_links: "url",
};

export const getStory = async (slug: string) => {
  const storyblok = getStoryblokApi();

  const finalSlug =
    slug === "/" || slug === "" || slug === undefined ? "home" : slug;
  try {
    const resolveRelations = ["global_footer"];

    console.log(process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW);

    const { data } = await storyblok.get(`cdn/stories/${finalSlug}`, {
      ...storyblokApiConfig,
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
