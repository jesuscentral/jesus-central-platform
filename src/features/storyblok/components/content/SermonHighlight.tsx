import { SbSermonHighlight } from "@storyblok/types/287435740670216/storyblok-components";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import SermonHighlightUI from "@/components/ui/organisms/SermonHighlight";

export default function SermonHighlight({ blok }: { blok: SbSermonHighlight }) {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <SermonHighlightUI
        primaryColor={blok.primaryColor?.toString()}
        secondaryColor={blok.secondaryColor?.toString()}
        youtubeUrl={blok.youtubeUrl?.url || ""}
        thumbnail={{
          src: blok.thumbnail?.filename || "",
          alt: blok.thumbnail?.alt || "",
        }}
        title={blok.title || ""}
        speaker={blok.speaker || ""}
        date={blok.date || new Date()}
        duration={blok.duration}
        series={blok.series}
        language={blok.language}
        translationAvailable={blok.translationAvailable}
      />
    </div>
  );
}
