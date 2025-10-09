/**
 * Calendar Helper Functions
 * Generates ICS files and calendar links for cross-platform support
 */

import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";

/**
 * Format date to ICS format (YYYYMMDDTHHMMSS)
 */
function formatICSDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Escape special characters for ICS format
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

interface ICSEventData {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  url?: string;
}

/**
 * Generate ICS file content
 */
export function generateICS(data: ICSEventData): string {
  const {
    title,
    description = "",
    location = "",
    startDate,
    endDate,
    url = "",
  } = data;

  const startDateFormatted = formatICSDate(startDate);
  const endDateFormatted = formatICSDate(endDate);
  const timestamp = formatICSDate(new Date());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jesus Central Church//Event//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${timestamp}@jesuscentral.nl`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${startDateFormatted}`,
    `DTEND:${endDateFormatted}`,
    `SUMMARY:${escapeICS(title)}`,
    description ? `DESCRIPTION:${escapeICS(description)}` : "",
    location ? `LOCATION:${escapeICS(location)}` : "",
    url ? `URL:${url}` : "",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return icsContent;
}

/**
 * Create ICS file from event data and trigger download
 */
export function downloadICS(data: ICSEventData): void {
  const icsContent = generateICS(data);
  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  const filename = `${data.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;

  // Create download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup
  URL.revokeObjectURL(link.href);
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(data: ICSEventData): string {
  const { title, description = "", location = "", startDate, endDate } = data;

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: location,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook.com Calendar URL
 */
export function generateOutlookUrl(data: ICSEventData): string {
  const { title, description = "", location = "", startDate, endDate } = data;

  const formatOutlookDate = (date: Date) => {
    return date.toISOString();
  };

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: title,
    body: description,
    location: location,
    startdt: formatOutlookDate(startDate),
    enddt: formatOutlookDate(endDate),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
/**
 * Helper to convert SbEvent to ICSEventData
 */
export function eventToICSData(
  event: SbEvent,
  baseUrl: string = ""
): ICSEventData {
  const startDate = new Date(event.date);

  // Default to 2 hours duration if no end time specified
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);

  const url = baseUrl
    ? `${baseUrl}/activiteiten/${event.slug || event._uid}`
    : "";

  return {
    title: event.title,
    description: event.description || `${event.title} - Jesus Central Church`,
    location: event.location || "Jesus Central Church",
    startDate,
    endDate,
    url,
  };
}

/**
 * Generate all calendar links for an event
 */
export function generateAllCalendarLinks(event: SbEvent, baseUrl?: string) {
  const icsData = eventToICSData(event, baseUrl);

  return {
    google: generateGoogleCalendarUrl(icsData),
    outlook: generateOutlookUrl(icsData),
    ics: () => downloadICS(icsData),
  };
}
