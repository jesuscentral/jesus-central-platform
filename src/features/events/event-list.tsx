import { SbEvent } from "@storyblok/types/287325821225947/storyblok-components";
import Image from "next/image";
import { ISbStoryData } from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";

function fmtDate(date: string) {
  console.log(date);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

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
              <ul className="space-y-4">
                {events.map((event) => (
                  <li
                    key={event.content._uid}
                    className="overflow-hidden rounded-2xl border border-bold-dark/10 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {event.content.thumbnail && (
                        <div className="relative h-48 w-full overflow-hidden sm:h-auto sm:w-1/3">
                          <Image
                            src={event.content.thumbnail.filename!}
                            alt={event.content.thumbnail.alt!}
                            width={100}
                            height={100}
                            priority
                            className="h-full w-full object-cover"
                          />
                          <span
                            className={cn(
                              "absolute left-3 top-3 inline-flex items-center rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-bold-dark",
                              "bg-cream"
                            )}
                          >
                            {event.content.type === "service"
                              ? "Dienst"
                              : "Event"}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <h3 className="text-xl font-semibold text-bold-dark">
                            {event.content.title} met {event.content.speaker}
                          </h3>
                          <p className="mt-1 text-sm text-bold-dark/70">
                            {fmtDate(event.content.date.toString())}
                          </p>
                          {event.content.description && (
                            <p className="mt-3 text-bold-dark/85">
                              {event.content.description}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-bold-dark/80">
                          {event.content.speaker && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-strategy-green/10 px-3 py-1 text-xs font-medium">
                              🎤 {event.content.speaker}
                            </span>
                          )}
                          {event.content.location && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-strategy-gold/25 px-3 py-1 text-xs font-medium">
                              📍 {event.content.location}
                            </span>
                          )}
                          {event.content.pillar && (
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-black/5"
                              style={{
                                background: `color-mix(in oklab, var(--${event.content.pillar}) 18%, white)`,
                                color: "var(--boldness)",
                              }}
                            >
                              {event.content.pillar}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
