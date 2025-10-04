"use client";

import { getStoryblokApi } from "@/features/storyblok/api";

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  getStoryblokApi();
  return children;
}
