import { getStory, getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return notFound();
  }

  return <StoryblokStory story={story} />;
}

export async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, { version: "draft" });
}
