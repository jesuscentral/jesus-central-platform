import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { SbTeaser } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData } from "@storyblok/js";

interface TeaserProps {
  blok: SbTeaser;
}

export default function Teaser({ blok }: TeaserProps) {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              {blok.headline}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
