import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbSection } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData } from "@storyblok/react";

export default function Section({ blok }: { blok: SbSection }) {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={`relative overflow-hidden bg-${blok.backgroundColor} py-20`}
    >
      {blok.block?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </section>
  );
}
