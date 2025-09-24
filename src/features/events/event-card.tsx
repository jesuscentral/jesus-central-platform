"use client";
import { ISbStoryData } from "@storyblok/react";
import { SbEvent } from "@storyblok/types/287325821225947/storyblok-components";
import { motion } from "framer-motion";
import {
  Mic2,
  Languages,
  Headphones,
  CalendarDays,
  ChevronRight,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatDateParts(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  const day = new Intl.DateTimeFormat("nl-NL", { day: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("nl-NL", { month: "short" }).format(
    date
  );
  const weekday = new Intl.DateTimeFormat("nl-NL", { weekday: "short" }).format(
    date
  );
  const time = new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return { day, month, weekday, time };
}

export default function EventCard({ event }: { event: ISbStoryData<SbEvent> }) {
  const { day, month, weekday, time } = formatDateParts(event.content.date);
  const isService = event.content.type === "service";
  const typeColor = isService
    ? "bg-brand-orange text-white"
    : "bg-strategy-gold text-bold-dark";

  const card = (
    <Link href={event.full_slug}>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-brand-black shadow-2xl h-full flex flex-col justify-between"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={event.content.thumbnail?.filename ?? ""}
            alt=""
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <div
              className={`rounded-xl px-2 py-1 text-xs font-semibold uppercase tracking-wide ${typeColor}`}
            >
              {isService ? "Dienst" : "Event"}
            </div>
          </div>
          <div className="absolute right-4 top-4 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
            <div className="text-center leading-none">
              <div className="text-xs uppercase tracking-wide text-cream/80">
                {month}
              </div>
              <div className="text-2xl font-bold text-cream">{day}</div>
              <div className="text-[10px] uppercase tracking-wide text-cream/70">
                {weekday}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-cream/70">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{time}</span>
            <span>•</span>
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${isService ? "bg-brand-orange/15 text-brand-orange" : "bg-strategy-gold/20 text-strategy-gold"}`}
            >
              <Ticket className="h-3 w-3" />
              <span className="uppercase">
                {isService ? "Dienst" : "Event"}
              </span>
            </div>
          </div>
          <h3 className="line-clamp-2 font-['TGS Perfect Condensed',Oswald,Impact,sans-serif] text-2xl tracking-wide text-cream sm:text-3xl">
            {event.content.title}
          </h3>
          <small className="text-xs text-cream/70">
            {event.content.location}
          </small>
          <p className="mt-2 line-clamp-3 font-['Fira Sans',system-ui,sans-serif] text-sm leading-relaxed text-cream/80">
            {event.content.description}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {event.content.speaker && (
              <div className="flex items-center gap-2 text-sm text-cream">
                <Mic2 className="h-4 w-4 text-strategy-gold" />
                <span className="truncate">{event.content.speaker}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-cream">
              <Languages className="h-4 w-4 text-strategy-gold" />
              <span className="truncate">{event.content.language}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-cream">
              <Headphones
                className={`h-4 w-4 ${event.content.translationAvailable ? "text-strategy-green" : "text-cream/40"}`}
              />
              <span
                className={
                  event.content.translationAvailable ? "" : "text-cream/60"
                }
              >
                {event.content.translationAvailable
                  ? "Vertaling beschikbaar"
                  : "Geen vertaling"}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-cream/60">
              {isService ? "Samenkomst" : "Activiteit"}
            </div>
            <div className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-cream transition-colors group-hover:border-white/20">
              <span>Meer info</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );

  return card;
}
