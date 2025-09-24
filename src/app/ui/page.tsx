import { getStory } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export default async function UI() {
  if (!process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW) {
    return notFound();
  }

  const story = await getStory("ui");

  return <StoryblokStory story={story} />;
}
