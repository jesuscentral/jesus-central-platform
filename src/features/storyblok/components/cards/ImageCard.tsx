"use client";

import { SbImageCard } from "@storyblok/types/287435740670216/storyblok-components";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function ImageCard({ blok }: { blok: SbImageCard }) {
  // Map text colors to proper brand colors with proper contrast
  const getTextColorClasses = (color?: string) => {
    const colorMap: Record<string, { text: string; border: string }> = {
      boldness: { text: "text-boldness", border: "border-boldness/10" },
      freedom: { text: "text-freedom", border: "border-freedom/10" },
      "strategy-red": {
        text: "text-strategy-red",
        border: "border-strategy-red/10",
      },
      "strategy-gold": {
        text: "text-strategy-gold",
        border: "border-strategy-gold/10",
      },
      "strategy-green": {
        text: "text-strategy-green",
        border: "border-strategy-green/10",
      },
    };
    return colorMap[color || "boldness"] || colorMap.boldness;
  };

  const colorClasses = getTextColorClasses(blok.textColor as string);

  const backgroundColorClass = `bg-${blok.backgroundColor}`;

  return (
    <article
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] transition-all hover:shadow-[0_30px_80px_-32px_rgba(17,17,17,0.55)]",
        colorClasses.border,
        colorClasses.text,
        backgroundColorClass
      )}
    >
      {blok.image?.filename && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-boldness/5">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.title || "Card image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-8">
        <h3 className="font-heading text-3xl uppercase tracking-wide">
          {blok.title}
        </h3>
        {blok.description && (
          <p
            className={cn(
              "flex-1 font-body text-base leading-relaxed",
              colorClasses.text.replace("text-", "text-") + "/85"
            )}
          >
            {blok.description}
          </p>
        )}
        {blok.actions && blok.actions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {blok.actions.map((action) => (
              <StoryblokServerComponent key={action._uid} blok={action} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
