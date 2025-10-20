import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { ISbStoryData } from '@storyblok/react/rsc'
import EventCard from './event-card'
import Button from '@/components/ui/atoms/Button'
import { ArrowRight } from 'lucide-react'

export default function EventList({
  events,
}: {
  events: ISbStoryData<SbEvent>[]
}) {
  const getMonthOfEvent = (event: ISbStoryData<SbEvent>) => {
    return new Intl.DateTimeFormat('nl-NL', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(event.content.date))
  }

  const groupedEvents = events
    .sort(
      (a, b) =>
        new Date(a.content.date).getTime() - new Date(b.content.date).getTime(),
    )
    .reduce(
      (
        acc: Record<string, ISbStoryData<SbEvent>[]>,
        event: ISbStoryData<SbEvent>,
      ) => {
        const month = getMonthOfEvent(event)
        if (!acc[month]) {
          acc[month] = []
        }
        acc[month].push(event)

        return acc
      },
      {} as Record<string, ISbStoryData<SbEvent>[]>,
    )

  return (
    <>
      <div className="from-strategy-green to-strategy-green/70 relative h-96 overflow-hidden rounded-2xl bg-gradient-to-l">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h2 className="text-boldness mb-4 text-5xl font-bold md:text-6xl">
            Word lid van onze <span className="text-freedom">FAMILIE</span>
          </h2>
          <p className="text-boldness/90 mb-8 max-w-2xl text-xl">
            Bekijk alle diensten en events om te zien hoe je onze familie kunt
            ontdekken en deel kunt nemen aan deze vrije kerk.
          </p>
          <Button href="/lid-worden" type="freedom">
            Bekijk alle diensten en events
            <ArrowRight />
          </Button>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-4 pb-24">
        {events.length === 0 ? (
          <div className="border-boldness/10 mt-10 rounded-2xl border bg-white/70 p-10 text-center">
            <p className="text-boldness/70">
              Geen resultaten voor je selectie.
            </p>
          </div>
        ) : (
          <div className="space-y-10 py-8">
            {Object.entries(groupedEvents).map(([month, events]) => (
              <div key={month}>
                <h2 className="text-boldness mb-4 text-2xl font-bold">
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
    </>
  )
}
