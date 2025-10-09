import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbSection } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData } from "@storyblok/react";
import { cn } from "@/utils/cn";

export default function Section({ blok }: { blok: SbSection }) {
  const getBackgroundClass = () => {
    if (!blok.backgroundColor) return "";
    return `bg-${blok.backgroundColor}`;
  };

  const getColorClass = () => {
    if (!blok.color) return "";
    return `text-${blok.color}`;
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        getBackgroundClass(),
        getColorClass(),
        "py-12"
      )}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <div className="container px-4 mx-auto">
        {blok.block?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
