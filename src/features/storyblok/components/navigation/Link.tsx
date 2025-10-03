import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { SbLink } from "@storyblok/types/287435740670216/storyblok-components";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface LinkProps {
  blok: SbLink;
}

export default function LinkBlok({ blok }: LinkProps) {
  return blok.link.linktype === "email" ? (
    <Link
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "underline-offset-4 hover:underline",
        `text-${blok.textColor}`
      )}
      href={`mailto:${blok.link.email}`}
    >
      {blok.text!}
    </Link>
  ) : (
    <Link
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "underline-offset-4 hover:underline",
        `text-${blok.textColor}`
      )}
      href={blok.link.url}
    >
      {blok.text!}
    </Link>
  );
}
