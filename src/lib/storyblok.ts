import {
  apiPlugin,
  ISbStoriesParams,
  ISbStoryData,
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
import BlokHero from "@/features/storyblok/components/BlokHero";
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
import SermonHighlight from "@/features/storyblok/components/SermonHighlight";
import Statement from "@/features/storyblok/components/Statement";
import StatementScripture from "@/features/storyblok/components/StatementScripture";
import ScriptureReferences from "@/features/storyblok/components/ScriptureReferences";
import RichText from "@/features/storyblok/components/RichText";
import { StoryblokMultilink } from "@storyblok/types/storyblok";
import SpotifyEmbed from "@/features/storyblok/components/SpotifyEmbed";
import Section from "@/features/storyblok/components/Section";

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
    blokHero: BlokHero,
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
    sermonHighlight: SermonHighlight,
    statement: Statement,
    statementScripture: StatementScripture,
    scriptureReferences: ScriptureReferences,
    richText: RichText,
    spotifyEmbed: SpotifyEmbed,
    section: Section,
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

    const { data } = await storyblok.get(
      `cdn/stories/${process.env.NEXT_PUBLIC_BASE_PATH}/${finalSlug}`,
      {
        ...storyblokApiConfig,
        resolve_relations: resolveRelations,
      }
    );

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

export const linkResolver = (link: StoryblokMultilink | undefined) => {
  if (!link) return "";

  if (!!process.env.NEXT_PUBLIC_BASE_PATH) {
    let correctUrl = link?.story?.full_slug || link.cached_url || link.url;

    // Remove base path if link is to the homepage
    if (correctUrl === `${process.env.NEXT_PUBLIC_BASE_PATH}/`) {
      correctUrl = correctUrl.replace(
        `${process.env.NEXT_PUBLIC_BASE_PATH}`,
        ""
      );
    } else {
      correctUrl = correctUrl.replace(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/`,
        ""
      );
    }

    return correctUrl;
  }

  return link?.story?.full_slug || link.cached_url || link.url;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStoryblokSeoParameters = (story: ISbStoryData<any>) => {
  if (!story.content?.seo) {
    return {};
  }

  const title = story.content?.seo?.title || story.name;
  const description = story.content?.seo?.description;
  const twitterTitle = story.content?.seo?.twitter_title || title;
  const twitterDescription =
    story.content?.seo?.twitter_description || description;
  const ogTitle = story.content?.seo?.og_title || title;
  const ogDescription = story.content?.seo?.og_description || description;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
    title: `${title} · Jesus Central Church`,
    description: description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `/${story.slug}`,
      images: [
        {
          url:
            story.content?.seo?.og_image ??
            story.content?.seo?.twitter_image ??
            "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: [
        {
          url:
            story.content?.seo?.twitter_image ??
            story.content?.seo?.og_image ??
            "",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};
