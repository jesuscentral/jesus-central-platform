import { getStory, getStoryblokSeoParameters } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ? params.slug : "home";
  const story = await getStory(slug);

  if (!story) {
    return {};
  }

  return getStoryblokSeoParameters(story);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const story = await getStory(slug);

  if (!story) {
    return notFound();
  }

  return <StoryblokStory story={story} />;
}
