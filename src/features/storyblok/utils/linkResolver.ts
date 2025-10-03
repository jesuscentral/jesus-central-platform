import { StoryblokMultilink } from "@storyblok/types/storyblok";

export const linkResolver = (link: StoryblokMultilink | undefined): string => {
  if (!link) return "";

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  if (!basePath) {
    return link?.story?.full_slug || link.cached_url || link.url || "";
  }

  let correctUrl = link?.story?.full_slug || link.cached_url || link.url || "";

  // Remove base path if link is to the homepage
  if (correctUrl === `${basePath}/`) {
    correctUrl = correctUrl.replace(basePath, "");
  } else {
    correctUrl = correctUrl.replace(`${basePath}/`, "");
  }

  return correctUrl;
};
