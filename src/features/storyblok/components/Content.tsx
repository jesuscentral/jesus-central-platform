import { SbContent } from "@storyblok/types/287325821225947/storyblok-components";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { RichTextRenderer } from "./RichTextRenderer";
import { cn } from "@/utils/cn";

export default function Content({ blok }: { blok: SbContent }) {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn("relative overflow-hidden")}
    >
      <RichTextRenderer document={blok.content!} />
    </section>
  );
}
