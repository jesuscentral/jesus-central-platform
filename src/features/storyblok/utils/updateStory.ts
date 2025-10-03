import { SbBlokData } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStory = (story: any, global_footer: SbBlokData[]) => {
  if (story.content && "global_footer" in story.content) {
    story.content.global_footer = global_footer;
  }

  return story;
};
