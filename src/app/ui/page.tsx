import { getStory, getStoryblokSeoParameters } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug : "ui";

  const story = await getStory(slug);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function UI() {
  if (process.env.NEXT_PUBLIC_STORYBLOK_IS_PREVIEW !== "true") {
    return notFound();
  }

  const story = await getStory("ui");

  if (!story) {
    return notFound();
  }

  return <StoryblokStory story={story} />;
}
