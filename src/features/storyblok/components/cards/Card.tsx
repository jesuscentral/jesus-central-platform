"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { SbCard } from "@storyblok/types/287435740670216/storyblok-components";
import { RichTextRenderer } from "../content/RichTextRenderer";
import { StoryblokRichtext } from "@storyblok/types/storyblok";
import { cn } from "@/utils/cn";
type CardProps = {
  blok: SbCard;
};

export default function Card({ blok }: CardProps) {
  return (
    <article
      {...storyblokEditable(blok as SbBlokData)}
      className={`flex flex-col h-full rounded-3xl px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] bg-${blok.backgroundColor}`}
    >
      <h3
        className={cn(
          "text-3xl font-extrabold uppercase tracking-wide",
          `text-${blok.titleColor}`
        )}
      >
        {blok.title}
      </h3>

      <div
        className={cn(
          "mt-4 text-md leading-relaxed text-bold/85 font-bold flex-1",
          `text-${blok.textColor}`
        )}
      >
        <RichTextRenderer
          document={blok.content as unknown as StoryblokRichtext}
        />
      </div>
    </article>
  );
}
