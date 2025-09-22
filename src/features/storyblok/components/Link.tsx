import { SbLink } from "@storyblok/types/287325821225947/storyblok-components";
import Link from "next/link";

interface LinkProps {
  blok: SbLink;
}

export default function LinkBlok({ blok }: LinkProps) {
  return blok.link.linktype === "email" ? (
    <Link
      className="underline-offset-4 hover:underline"
      href={`mailto:${blok.link.email}`}
    >
      {blok.text!}
    </Link>
  ) : (
    <Link className="underline-offset-4 hover:underline" href={blok.link.url}>
      {blok.text!}
    </Link>
  );
}
