import { getStory, getStoryblokSeoParameters } from "@/features/storyblok/api";
import { getWebsiteConfig } from "@/features/storyblok/utils";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/features/storyblok/components";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const story = await getStory(params.slug);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function Page(props: Props) {
  const params = await props.params;

  const [story, websiteConfig] = await Promise.all([
    getStory(params.slug),
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
