"use server";

import EventDetailPage from "@/components/events/EventDetailPage";

import { getStory } from "@/features/storyblok";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = await getStory(["activiteiten", slug]);

  if (!story) {
    notFound();
  }

  const event = story?.content as SbEvent | undefined;

  if (!event) {
    notFound();
  }

  // Format event date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <EventDetailPage event={event} formattedDate={formattedDate} />;
}
