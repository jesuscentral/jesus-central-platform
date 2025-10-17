import { getStory, getStoryblokSeoParameters } from "@/features/storyblok/api";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export async function generateMetadata(): Promise<Metadata> {
  const story = await getStory(["ui"]);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function UI() {
  if (process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW !== "true") {
    return notFound();
  }

  await connection();

  const story = await getStory(["ui"]);

  if (!story) {
    return notFound();
  }

  return <StoryblokStory story={story} />;
}
