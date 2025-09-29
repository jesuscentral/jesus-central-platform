"use client";
import { SbSermonHighlight } from "@storyblok/types/287325821225947/storyblok-components";
import { motion } from "framer-motion";
import { Play, Youtube, CalendarDays, Mic2, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function SermonHighlight({ blok }: { blok: SbSermonHighlight }) {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        `relative isolate overflow-hidden bg-cream px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16`,
        `bg-${blok.backgroundColor}`
      )}
    >
      <div className="grid items-stretch gap-8 md:grid-cols-12">
        <motion.a
          href={blok.youtubeUrl.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="group relative col-span-12 overflow-hidden rounded-[2rem] border border-bold-dark/10 bg-bold-dark shadow-2xl md:col-span-7"
        >
          <motion.img
            src={blok.thumbnail?.filename ?? ""}
            alt=""
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.02 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full object-cover"
            style={{ aspectRatio: "21/9" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-orange shadow-xl transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 text-white" />
              </div>
              <span className="text-base text-white/95">Bekijk de preek</span>
            </div>
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={cn(
            "col-span-12 flex flex-col justify-center gap-5 rounded-[2rem] border border-bold-dark/10 bg-white/70 p-6 backdrop-blur-sm sm:p-8 md:col-span-5",
            `bg-${blok.primaryColor}`,
            `border-${blok.secondaryColor}/10`
          )}
        >
          <div className="inline-flex items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2.5 py-1 text-sm font-semibold uppercase tracking-wider",
                `bg-${blok.secondaryColor}`,
                `text-${blok.primaryColor}`
              )}
            >
              Laatste preek
            </span>
          </div>
          <h2
            className={cn(
              "text-5xl leading-[1.02] tracking-wide text-bold-dark sm:text-6xl md:text-7xl",
              `text-${blok.secondaryColor}`
            )}
          >
            {blok.title}
          </h2>
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 text-base text-bold-dark/85",
              `text-${blok.secondaryColor}/85`
            )}
          >
            <div className="inline-flex items-center gap-1.5">
              <Mic2 className={cn("h-5 w-5", `text-${blok.secondaryColor}`)} />
              <span className={cn("truncate", `text-${blok.secondaryColor}`)}>
                {blok.speaker}
              </span>
            </div>
            <span className={cn(`text-${blok.secondaryColor}`)}>•</span>
            <div className="inline-flex items-center gap-1.5">
              <CalendarDays
                className={cn("h-5 w-5", `text-${blok.secondaryColor}`)}
              />
              <span className={cn("truncate", `text-${blok.secondaryColor}`)}>
                {formatDate(blok.date)}
              </span>
            </div>
            {blok.duration && (
              <>
                <span className={cn(`text-${blok.secondaryColor}`)}>•</span>
                <div className="inline-flex items-center gap-1.5">
                  <Clock
                    className={cn("h-5 w-5", `text-${blok.secondaryColor}`)}
                  />
                  <span
                    className={cn("truncate", `text-${blok.secondaryColor}`)}
                  >
                    {blok.duration}
                  </span>
                </div>
              </>
            )}
          </div>
          {blok.series && (
            <div
              className={cn(
                "text-xs uppercase text-bold-dark/60 tracking-wide",
                `text-${blok.secondaryColor} opacity-60`
              )}
            >
              Serie: {blok.series}
            </div>
          )}
          <div
            className={cn(
              "flex flex-wrap items-center gap-2 text-xs",
              `text-${blok.secondaryColor} opacity-70`
            )}
          >
            {blok.language && (
              <span
                className={cn(
                  "rounded-full border border-bold-dark/10 bg-white/80 px-2.5 py-1",
                  `border-${blok.secondaryColor}/10`,
                  `bg-${blok.secondaryColor} bg-opacity-80`
                )}
              >
                Taal: {blok.language}
              </span>
            )}
            {blok.translationAvailable && (
              <span
                className={cn(
                  "rounded-full border border-bold-dark/10 px-2.5 py-1",
                  `border-${blok.secondaryColor}/10`,
                  `bg-${blok.secondaryColor}/5`,
                  `text-${blok.secondaryColor}/70`
                )}
              >
                {blok.translationAvailable
                  ? "Vertaling beschikbaar"
                  : "Geen vertaling"}
              </span>
            )}
          </div>
          <div className="pt-2">
            <Link
              href={blok.youtubeUrl.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-brand-orange px-6 py-4 text-lg font-semibold tracking-wide text-white shadow-xl transition-transform hover:scale-[1.015] hover:shadow-2xl"
            >
              <Youtube className="h-6 w-6" />
              <span>Watch on YouTube</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
