import { getStory } from "@/lib/storyblok";
import { SbPage } from "@storyblok/types/287435740670216/storyblok-components";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import SermonList from "@/components/sermons/SermonList";
import { getSermons } from "@/lib/actions/sermons";
import { connection } from "next/server";
import { getWebsiteConfig } from "@/lib/getWebsiteConfig";
import { Navigation } from "@/features/storyblok/components";

export default async function PrekenPage() {
  const [sermons, websiteConfig, story] = await Promise.all([
    getSermons(),
    getWebsiteConfig(),
    getStory(["preken"]),
    connection(),
  ]);

  if (!story) {
    notFound();
  }

  const blok = story.content as SbPage;

  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <Navigation config={websiteConfig?.content} />

      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <main className="bg-cream">
        <SermonList sermons={sermons} />
      </main>
      {blok?.global_footer &&
        (blok.global_footer as unknown as SbBlokData[]).map((global, index) => (
          <StoryblokServerComponent blok={global.content} key={index} />
        ))}
    </div>
  );
}
