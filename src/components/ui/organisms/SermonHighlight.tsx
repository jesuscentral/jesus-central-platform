"use client";

import { motion } from "framer-motion";
import { Play, Youtube, CalendarDays, Mic2, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface SermonHighlightProps {
  primaryColor?: string;
  secondaryColor?: string;
  youtubeUrl: string;
  thumbnail: {
    src: string;
    alt?: string;
  };
  title: string;
  speaker?: string;
  date: string | Date;
  duration?: string;
  series?: string;
  language?: string;
  translationAvailable?: boolean;
  playButtonText?: string;
  watchButtonText?: string;
  badgeText?: string;
  seriesLabel?: string;
  languageLabel?: string;
  translationAvailableText?: string;
  translationNotAvailableText?: string;
  className?: string;
}

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function SermonHighlight({
  primaryColor = "white",
  secondaryColor = "boldness",
  youtubeUrl,
  thumbnail,
  title,
  speaker,
  date,
  duration,
  series,
  language,
  translationAvailable,
  playButtonText = "Bekijk de preek",
  watchButtonText = "Watch on YouTube",
  badgeText = "Laatste preek",
  seriesLabel = "Serie:",
  languageLabel = "Taal:",
  translationAvailableText = "Vertaling beschikbaar",
  translationNotAvailableText = "Geen vertaling",
  className,
}: SermonHighlightProps) {
  return (
    <div
      className={cn(
        "grid items-stretch gap-4 sm:gap-6 md:gap-8 md:grid-cols-12",
        className
      )}
    >
      <motion.a
        href={youtubeUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="group relative col-span-12 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-boldness/10 bg-boldness shadow-xl sm:shadow-2xl md:col-span-7"
      >
        {/* Mobile-friendly aspect ratio */}
        <motion.div
          initial={{ scale: 1.02 }}
          animate={{ scale: 1.02 }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video sm:aspect-[21/9] h-full w-full"
        >
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt || ""}
            fill
            quality={90}
            priority
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 grid place-items-center p-2 sm:p-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur-md">
            <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-strategy-red shadow-xl transition-transform group-hover:scale-110">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-white/95">
              {playButtonText}
            </span>
          </div>
        </div>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className={cn(
          // Mobile-first padding and spacing
          "col-span-12 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 rounded-2xl sm:rounded-[2rem] border border-boldness/10 bg-white/70 p-4 sm:p-6 md:p-8 backdrop-blur-sm md:col-span-5",
          `bg-${primaryColor}`,
          `border-${secondaryColor}/10`
        )}
      >
        <div className="inline-flex items-center gap-2">
          <span
            className={cn(
              "rounded-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider",
              `bg-${secondaryColor}`,
              `text-${primaryColor}`
            )}
          >
            {badgeText}
          </span>
        </div>
        <h2
          className={cn(
            // Mobile-first text sizing
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-wide text-boldness",
            `text-${secondaryColor}`
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            // Mobile-optimized metadata layout
            "flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base text-boldness/85",
            `text-${secondaryColor}/85`
          )}
        >
          {speaker && (
            <div className="inline-flex items-center gap-1.5">
              <Mic2
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                  `text-${secondaryColor}`
                )}
              />
              <span className={cn("", `text-${secondaryColor}`)}>
                {speaker}
              </span>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5">
            <CalendarDays
              className={cn(
                "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                `text-${secondaryColor}`
              )}
            />
            <span className={cn("", `text-${secondaryColor}`)}>
              {formatDate(date)}
            </span>
          </div>
          {duration && (
            <>
              <span
                className={cn("hidden sm:inline", `text-${secondaryColor}`)}
              >
                •
              </span>
              <div className="inline-flex items-center gap-1.5">
                <Clock
                  className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                    `text-${secondaryColor}`
                  )}
                />
                <span className={cn("", `text-${secondaryColor}`)}>
                  {duration}
                </span>
              </div>
            </>
          )}
        </div>
        {series && (
          <div
            className={cn(
              "text-xs uppercase text-boldness/60 tracking-wide",
              `text-${secondaryColor} opacity-60`
            )}
          >
            {seriesLabel} {series}
          </div>
        )}
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 text-xs",
            `text-${secondaryColor} opacity-70`
          )}
        >
          {language && (
            <span
              className={cn(
                "rounded-full border border-boldness/10 bg-white/80 px-2 py-0.5 sm:px-2.5 sm:py-1",
                `border-${secondaryColor}/10`,
                `bg-${secondaryColor} bg-opacity-80`
              )}
            >
              {languageLabel} {language}
            </span>
          )}
          {translationAvailable !== undefined && (
            <span
              className={cn(
                "rounded-full border border-boldness/10 px-2 py-0.5 sm:px-2.5 sm:py-1",
                `border-${secondaryColor}/10`,
                `bg-${secondaryColor}/5`,
                `text-${secondaryColor}/70`
              )}
            >
              {translationAvailable
                ? translationAvailableText
                : translationNotAvailableText}
            </span>
          )}
        </div>
        <div className="pt-2">
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-strategy-red px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide text-white shadow-lg sm:shadow-xl transition-transform hover:scale-[1.015] hover:shadow-2xl w-full sm:w-auto justify-center sm:justify-start"
          >
            <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>{watchButtonText}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
