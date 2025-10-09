"use client";

import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import Button from "../ui/atoms/Button";
import AddToCalendar from "../ui/molecules/AddToCalendar";

interface Props {
  event: SbEvent;
  formattedDate: string;
}

export default function EventDetailPage({ event, formattedDate }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video/Image Background with Ken Burns effect */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        {event.video?.filename ? (
          <video
            src={event.video.filename}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover brightness-90 saturate-110"
            poster={event.thumbnail?.filename || "/og-image.png"}
          />
        ) : (
          <Image
            src={event.thumbnail?.filename || "/og-image.png"}
            alt={event.title}
            fill
            priority
            className="object-cover brightness-90 saturate-110"
          />
        )}
      </motion.div>

      {/* Cinematic Gradient Overlays - inspired by StoryScrollList */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        style={{ zIndex: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[var(--strategy-red)]/30 via-transparent to-transparent"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ zIndex: 2 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70"
        style={{ zIndex: 3 }}
      />

      {/* Back Button - Top Left - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-4 z-20 sm:left-6 md:left-12 sm:top-24"
      >
        <Button type="strategy-gold" variant="primary" href="/activiteiten" size="small">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Terug</span>
        </Button>
      </motion.div>

      {/* Church Logo - Top Center - Mobile Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 z-20 sm:top-20"
      >
        <div className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-boldness shadow-2xl">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-strategy-gold/20 rounded-xl sm:rounded-2xl" />
          <div className="relative w-32 h-12 sm:w-48 sm:h-16 md:w-64 md:h-20">
            <Image
              src="/logo.svg"
              alt="Jesus Central Church"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(235,55,0,0.5)]"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Event Type Badge - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        className="absolute top-20 right-4 z-20 sm:right-6 md:right-12 sm:top-24"
      >
        <div className="relative">
          {/* Glow effect behind badge */}
          <div className="relative rounded-full bg-strategy-gold p-[2px] sm:p-[3px]">
            <div className="rounded-full bg-strategy-gold backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-3">
              <span className="text-xs sm:text-sm md:text-lg font-bold uppercase tracking-wider text-boldness drop-shadow-lg">
                <h3>{event.type || "Event"}</h3>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Bottom Center - Mobile Optimized */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 px-4 sm:pb-12 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Speaker Section - Mobile Responsive */}
          {event.speaker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center mb-4 sm:mb-6"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl bg-strategy-gold scale-150" />
                <div className="relative flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-strategy-gold">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-boldness flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-freedom font-semibold">
                      Spreker
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-boldness drop-shadow-lg">
                      {event.speaker}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Pills - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            {/* Date */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base text-white font-semibold whitespace-nowrap">
                {formattedDate}
              </span>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-white font-semibold whitespace-nowrap">
                  {event.location}
                </span>
              </div>
            )}
          </motion.div>

          {/* Title - Mobile Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-center mb-3 sm:mb-6 drop-shadow-2xl px-2"
          >
            {event.title}
          </motion.h1>

          {/* Description - Mobile Responsive */}
          {event.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-sm sm:text-base md:text-lg text-white/80 text-center leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto line-clamp-2 sm:line-clamp-3 px-2"
            >
              {event.description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <AddToCalendar
              event={event}
              baseUrl={
                typeof window !== "undefined"
                  ? window.location.origin
                  : process.env.NEXT_PUBLIC_BASE_URL || ""
              }
              buttonType="strategy-gold"
              buttonVariant="primary"
              buttonSize="large"
            />

            {/* YouTube Button */}
            {event.youtubeLink?.cached_url && (
              <Button
                href={event.youtubeLink.cached_url}
                type="strategy-red"
                variant="primary"
                size="large"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Bekijk op YouTube
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        style={{ zIndex: 25 }}
      />
    </motion.main>
  );
}
