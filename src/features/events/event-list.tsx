import { SbEvent } from "@storyblok/types/287325821225947/storyblok-components";
import { ISbStoryData } from "@storyblok/react/rsc";
import EventCard from "./event-card";

export default function EventList({
  events,
}: {
  events: ISbStoryData<SbEvent>[];
}) {
  const getMonthOfEvent = (event: ISbStoryData<SbEvent>) => {
    return new Intl.DateTimeFormat("nl-NL", {
      month: "long",
      year: "numeric",
    }).format(new Date(event.content.date));
  };

  const groupedEvents = events
    .sort(
      (a, b) =>
        new Date(a.content.date).getTime() - new Date(b.content.date).getTime()
    )
    .reduce(
      (
        acc: Record<string, ISbStoryData<SbEvent>[]>,
        event: ISbStoryData<SbEvent>
      ) => {
        const month = getMonthOfEvent(event);
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(event);

        return acc;
      },
      {} as Record<string, ISbStoryData<SbEvent>[]>
    );

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      {events.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-bold-dark/10 bg-white/70 p-10 text-center">
          <p className="text-bold-dark/70">Geen resultaten voor je selectie.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {Object.entries(groupedEvents).map(([month, events]) => (
            <div key={month}>
              <h2 className="mb-4 text-2xl font-bold text-bold-dark">
                {month}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {events.map((event) => (
                  <EventCard event={event} key={event.content._uid} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
