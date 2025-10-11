import { getStory, getStoryblokSeoParameters } from "@/features/storyblok/api";
import { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

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

  const story = await getStory(slug);

  if (!story) {
    return notFound();
  }

  return (
    <>
      <StoryblokStory story={story} />
    </>
  );
}
