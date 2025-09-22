import { SbContent } from "@storyblok/types/287325821225947/storyblok-components";
import { RichTextRenderer } from "./RichTextRenderer";
import { cn } from "@/utils/cn";

export default function Content({ blok }: { blok: SbContent }) {
  return (
    <section className={cn("relative overflow-hidden")}>
      <RichTextRenderer document={blok.content!} />
    </section>
  );
}
