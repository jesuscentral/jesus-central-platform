"use client";

import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbStaticGrid } from "@storyblok/types/287435740670216/storyblok-components";
import { cn } from "@/utils/cn";

export default function StaticGrid({ blok }: { blok: SbStaticGrid }) {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn("relative overflow-hidden", `bg-${blok.backgroundColor}`)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {blok.items?.map((column) => (
            <StoryblokServerComponent key={column._uid} blok={column} />
          ))}
        </div>
      </div>
    </section>
  );
}
