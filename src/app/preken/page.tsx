import { getStory } from "@/features/storyblok/api";
import { getWebsiteConfig } from "@/features/storyblok/utils";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import SermonList from "@/components/sermons/SermonList";
import { getSermons } from "@/lib/actions/sermons";
import { connection } from "next/server";
import { Navigation } from "@/features/storyblok/components";
import Section from "@/components/ui/atoms/Section";

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

  const blok = story.content;

  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <Navigation config={websiteConfig?.content} />

      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok: SbBlokData) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <Section backgroundColor="cream" color="bold-dark">
        <SermonList sermons={sermons} />
      </Section>
      {blok?.global_footer &&
        (blok.global_footer as unknown as SbBlokData[]).map((global, index) => (
          <StoryblokServerComponent blok={global.content} key={index} />
        ))}
    </div>
  );
}
