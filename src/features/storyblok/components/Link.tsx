import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { SbLink } from "@storyblok/types/287325821225947/storyblok-components";
import Link from "next/link";

interface LinkProps {
  blok: SbLink;
}

export default function LinkBlok({ blok }: LinkProps) {
  return blok.link.linktype === "email" ? (
    <Link
      {...storyblokEditable(blok as SbBlokData)}
      className="underline-offset-4 hover:underline"
      href={`mailto:${blok.link.email}`}
    >
      {blok.text!}
    </Link>
  ) : (
    <Link
      {...storyblokEditable(blok as SbBlokData)}
      className="underline-offset-4 hover:underline"
      href={blok.link.url}
    >
      {blok.text!}
    </Link>
  );
}
