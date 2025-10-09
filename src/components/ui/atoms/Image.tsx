"use client";

import NextImage from "next/image";
import { cn } from "@/utils/cn";

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  quality?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export default function Image({
  src,
  alt,
  fill = true,
  className,
  objectFit = "cover",
  quality = 60,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  loading = "lazy",
}: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      fill={fill}
      className={cn(
        objectFit === "cover" && "object-cover",
        objectFit === "contain" && "object-contain",
        objectFit === "fill" && "object-fill",
        objectFit === "none" && "object-none",
        objectFit === "scale-down" && "object-scale-down",
        className
      )}
      quality={quality}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
    />
  );
}
