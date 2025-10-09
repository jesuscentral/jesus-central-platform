"use server";

import { getStoryblokApi, storyblokApiConfig } from "@/features/storyblok/api";
import { SbEventList } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";
import { getLanguageConfig } from "../../utils";
import StoryScrollList from "./StoryScrollList";
import { Heading } from "@/components/ui/atoms/Heading";
import FilterableList from "./FilterableList";

export default async function EventList({ blok }: { blok: SbEventList }) {
  const storyblok = getStoryblokApi();
  const language = await getLanguageConfig();

  const { data: eventsData } = await storyblok.get("cdn/stories/", {
    ...storyblokApiConfig,
    starts_with: `${process.env.NEXT_PUBLIC_BASE_PATH}/agenda/`,
    language,
    filter_query: {
      date: {
        gte: new Date().toISOString(), // only events todday or later
      },
    },
    sort_by: "content.date:asc",
  });

  const { stories: events } = eventsData;

  return (
    <>
      {blok.showStoryScroll && (
        <section
          {...storyblokEditable(blok as SbBlokData)}
          className={cn(
            "relative overflow-hidden",
            `bg-${blok.backgroundColor}`,
            "py-12"
          )}
          {...storyblokEditable(blok as SbBlokData)}
        >
          <div className="container px-4 mx-auto">
            <Heading variant="h2" className={cn(`text-${blok.titleColor}`)}>
              {blok.storyScrollTitle || "Aankomende evenementen"}
            </Heading>
          </div>
          <StoryScrollList
            events={events.map((event: SbBlokData) => event.content)}
            title={blok.storyScrollTitle}
            titleColor={blok.textColor as string}
          />
        </section>
      )}
      <section
        {...storyblokEditable(blok as SbBlokData)}
        className={cn(
          "relative overflow-hidden",
          `bg-${blok.backgroundColor}`,
          "py-12"
        )}
        {...storyblokEditable(blok as SbBlokData)}
      >
        <div className="container px-4 mx-auto">
          <Heading variant="h2" className={cn(`text-${blok.textColor}`)}>
            {blok.title || "Aankomende evenementen"}
          </Heading>
          <FilterableList
            events={events.map((event: SbBlokData) => event.content)}
          />
        </div>
      </section>
    </>
  );
}
