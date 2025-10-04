import { getStory, getStoryblokApi, storyblokApiConfig } from "@/lib/storyblok";
import FilterBar from "@/features/events/filter-bar";
import { SbPage } from "@storyblok/types/287435740670216/storyblok-components";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import EventList from "@/features/events/event-list";
import { connection } from "next/server";
import { getWebsiteConfig } from "@/lib/getWebsiteConfig";
import { notFound } from "next/navigation";
import { Navigation } from "@/features/storyblok/components";

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: {
    tab: "alles" | "diensten" | "events";
  };
}) {
  await connection();
  const { tab } = await searchParams;

  const storyblok = getStoryblokApi();

  const [story, websiteConfig] = await Promise.all([
    getStory(["agenda"]),
    getWebsiteConfig(),
  ]);

  if (!story) {
    notFound();
  }

  const blok = story.content as SbPage;

  const { data: eventsData } = await storyblok.get("cdn/stories/", {
    ...storyblokApiConfig,
    starts_with: `${process.env.NEXT_PUBLIC_BASE_PATH}/agenda/`,
    filter_query: {
      date: {
        gt_date: new Date().toISOString(),
      },
    },
  });

  const { stories: events } = eventsData;

  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <Navigation config={websiteConfig?.content} />
      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <main className="bg-cream">
        <FilterBar _tab={tab} />
        <EventList events={events} />
      </main>
      {blok?.global_footer &&
        (blok.global_footer as unknown as SbBlokData[]).map((global, index) => (
          <StoryblokServerComponent blok={global.content} key={index} />
        ))}
    </div>
  );
}
