import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { SbBadge } from "@storyblok/types/287325821225947/storyblok-components";
import Link from "next/link";

export default function Badge({ blok }: { blok: SbBadge }) {
  if (blok.link) {
    return (
      <Link
        {...storyblokEditable(blok as SbBlokData)}
        href={blok.link.url}
        className="rounded-full bg-brand-black/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
      >
        {blok.text}
      </Link>
    );
  }
  return (
    <span className="rounded-full bg-brand-black/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
      {blok.text}
    </span>
  );
}
