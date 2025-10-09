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

  // Generate calendar links
  const calendarTitle = encodeURIComponent(event.title);
  const calendarDetails = encodeURIComponent(event.description || "");
  const calendarLocation = encodeURIComponent(
    event.location || "Jesus Central Church, Gouda"
  );

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=${eventDate
    .toISOString()
    .replace(/-|:|\.\d+/g, "")}/${eventDate
    .toISOString()
    .replace(
      /-|:|\.\d+/g,
      ""
    )}&details=${calendarDetails}&location=${calendarLocation}`;

  return (
    <EventDetailPage
      event={event}
      formattedDate={formattedDate}
      googleCalendarUrl={googleCalendarUrl}
    />
  );
}
