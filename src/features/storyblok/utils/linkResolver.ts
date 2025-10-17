import { StoryblokMultilink } from "@storyblok/types/storyblok";

export const linkResolver = (
  link: StoryblokMultilink | string | undefined
): string => {
  if (!link) return "";

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH!;

  if (typeof link === "string") {
    return link.replace(`${basePath}/`, "");
  }

  if (!basePath) {
    return "/"
      .concat(link?.story?.full_slug || link.cached_url || link.url || "")
      .replaceAll("//", "/");
  }

  let correctUrl = "/"
    .concat(link?.story?.full_slug || link.cached_url || link.url || "")
    .replaceAll("//", "/");

  // Remove base path if link is to the homepage
  if (correctUrl === `${basePath}/`) {
    correctUrl = correctUrl.replace(basePath, "");
  } else {
    correctUrl = correctUrl.replace(`${basePath}/`, "");
  }

  return correctUrl;
};
