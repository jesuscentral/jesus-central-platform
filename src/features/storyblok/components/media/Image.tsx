"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import NextImage from "next/image";
import { cn } from "@/utils/cn";
import { SbImage } from "@storyblok/types/287435740670216/storyblok-components";

interface ImageProps {
  blok: SbImage & SbBlokData;
  className?: string;
}

export default function Image({ blok, className }: ImageProps) {
  if (!blok.image?.filename) {
    return null;
  }

  const objectFit = blok.objectFit || "cover";
  const isFullHeight = blok.fullHeight ?? false;

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "relative w-full",
        isFullHeight ? "h-full" : "aspect-[4/3] py-20",
        className
      )}
    >
      <NextImage
        src={blok.image.filename}
        alt={blok.image.alt!}
        width={blok.image.width ?? 800}
        height={blok.image.height ?? 400}
        className={cn(
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
          "rounded-lg overflow-hidden shadow-lg"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
