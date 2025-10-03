import { getStory, getStoryblokSeoParameters } from "@/lib/storyblok";
import { getWebsiteConfig } from "@/lib/getWebsiteConfig";
import { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { Navigation } from "@/features/storyblok/components";

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

export default async function Index() {
  const slug = "home";

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
