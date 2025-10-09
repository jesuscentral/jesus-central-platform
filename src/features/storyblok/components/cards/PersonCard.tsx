"use client";

import { cn } from "@/utils/cn";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { SbPersonCard } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";

export default function PersonCard({ blok }: { blok: SbPersonCard }) {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "rounded-2xl overflow-hidden  p-4",
        `bg-${blok.backgroundColor}`
      )}
    >
      <Image
        className="rounded-xl h-56 w-full object-cover"
        src={blok.image.filename!}
        width={600}
        height={400}
        alt={blok.image.alt!}
      />

      <div className="mt-4">
        <h3 className="font-heading text-2xl">{blok.name}</h3>
        <p className="font-body text-jcc-freedom/80">{blok.role}</p>
      </div>
    </div>
  );
}
