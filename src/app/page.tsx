import { getStory, getStoryblokSeoParameters } from "@/features/storyblok/api";
import { getWebsiteConfig } from "@/features/storyblok/utils";
import { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { Navigation } from "@/features/storyblok/components";

export async function generateMetadata(): Promise<Metadata> {
  const slug = ["home"];

  const story = await getStory(slug);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function Index() {
  const slug = ["home"];

  const [story, websiteConfig] = await Promise.all([
    getStory(slug),
    getWebsiteConfig(),
  ]);

  if (!story) {
    return notFound();
  }

  return (
    <>
      <Navigation config={websiteConfig?.content} />
      <StoryblokStory story={story} />
    </>
  );
}
