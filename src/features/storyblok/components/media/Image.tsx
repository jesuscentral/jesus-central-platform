"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { cn } from "@/utils/cn";
import { SbImage } from "@storyblok/types/287435740670216/storyblok-components";
import StaticImage from "@/components/ui/atoms/Image";
import AnimatedImage from "@/components/ui/molecules/AnimatedImage";

interface ImageProps {
  blok: SbImage & SbBlokData;
  className?: string;
  imageClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Image({
  blok,
  className,
  imageClassName,
  ...additionalProps
}: ImageProps) {
  if (!blok.image?.filename) {
    return null;
  }

  const loadingStrategy = blok.loading === "" ? "lazy" : blok.loading;

  if (blok.animated) {
    return (
      <div {...storyblokEditable(blok as SbBlokData)} {...additionalProps}>
        <AnimatedImage
          src={blok.image.filename}
          alt={blok.image.alt || ""}
          side={blok.side as "left" | "right"}
          delay={blok.delay ? parseFloat(blok.delay) : 0}
          className={className}
          imageClassName={imageClassName}
          priority={blok.priority}
          loading={loadingStrategy as "lazy" | "eager" | undefined}
        />
      </div>
    );
  }

  const objectFit = (blok.objectFit || "cover") as
    | "cover"
    | "contain"
    | "fill"
    | "none"
    | "scale-down";

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={cn("relative w-full aspect-[4/3]", className)}
      {...additionalProps}
    >
      <StaticImage
        src={blok.image.filename}
        alt={blok.image.alt || ""}
        fill
        objectFit={objectFit}
        priority={blok.priority}
        loading={blok.loading as "lazy" | "eager" | undefined}
        className={cn("rounded-lg overflow-hidden shadow-lg", imageClassName)}
      />
    </div>
  );
}
