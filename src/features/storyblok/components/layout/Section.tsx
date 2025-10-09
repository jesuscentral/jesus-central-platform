"use client";

import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbSection } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData } from "@storyblok/react";
import SectionUI from "@/components/ui/atoms/Section";
export default function Section({ blok }: { blok: SbSection }) {
  return (
    <SectionUI
      backgroundColor={blok.backgroundColor?.toString() || "cream"}
      color={blok.color?.toString() || "bold-dark"}
      {...storyblokEditable(blok as SbBlokData)}
    >
      {blok.block?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </SectionUI>
  );
}
