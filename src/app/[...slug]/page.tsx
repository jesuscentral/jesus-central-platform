import { getStory, getStoryblokSeoParameters } from "@/features/storyblok/api";
import { getWebsiteConfig } from "@/features/storyblok/utils";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/features/storyblok/components";
import Footer from "@/features/storyblok/components/navigation/Footer";
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

  const story = await getStory(params.slug);

  if (!story) {
    return notFound();
  }

  return (
    <>
      <StoryblokStory story={story} />
    </>
  );
}
