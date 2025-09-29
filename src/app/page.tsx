import { getStory, getStoryblokSeoParameters } from "@/lib/storyblok";
import { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug : "home";

  const story = await getStory(slug);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function Home() {
  const story = await getStory("home");

  return <StoryblokStory story={story} />;
}
