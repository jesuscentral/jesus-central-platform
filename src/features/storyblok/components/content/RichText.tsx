"use client";

import { SbRichText as SbRichTextBlok } from "@storyblok/types/287435740670216/storyblok-components";
import { RichTextRenderer } from "./RichTextRenderer";
import Section from "@/components/ui/atoms/Section";

export default function RichText({ blok }: { blok: SbRichTextBlok }) {
  return (
    <Section
      backgroundColor={blok.backgroundColor?.toString() || "cream"}
      color={blok.color?.toString() || "bold-dark"}
    >
      <RichTextRenderer document={blok.content!} />
    </Section>
  );
}
