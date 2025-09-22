import { SbGlobal } from "@storyblok/types/287325821225947/storyblok-components";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Global({ blok }: { blok: SbGlobal }) {
  return (
    <>
      {blok.item.map((item, index) => (
        <StoryblokServerComponent blok={item} key={index} />
      ))}
    </>
  );
}
