"use server";

import { getStoryblokApi, storyblokApiConfig } from "@/features/storyblok/api";
import { SbEventList } from "@storyblok/types/287435740670216/storyblok-components";
import UiEventList from "@/features/events/event-list";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";
import { getLanguageConfig } from "../../utils";

export default async function EventList({ blok }: { blok: SbEventList }) {
  const storyblok = getStoryblokApi();
  const language = await getLanguageConfig();

  const { data: eventsData } = await storyblok.get("cdn/stories/", {
    ...storyblokApiConfig,
    starts_with: `${process.env.NEXT_PUBLIC_BASE_PATH}/agenda/`,
    filter_query: {
      date: {
        gt_date: new Date().toISOString(),
      },
    },
    language: language,
  });

  const { stories: events } = eventsData;

  return (
    <section
      className={cn("px-4 pb-24", `bg-${blok.backgroundColor}`)}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <UiEventList events={events} />
    </section>
  );
}
