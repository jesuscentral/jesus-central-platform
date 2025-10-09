"use client";

import { SbRichText as SbRichTextBlok } from "@storyblok/types/287435740670216/storyblok-components";
import { RichTextRenderer } from "./RichTextRenderer";
import { cn } from "@/utils/cn";

export default function RichText({ blok }: { blok: SbRichTextBlok }) {
  return (
    <RichTextRenderer
      className={cn(`text-${blok.color}`)}
      document={blok.content!}
    />
  );
}
