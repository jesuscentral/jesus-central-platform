"use client";

import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import Badge from "../ui/atoms/Badge";
import Button from "../ui/atoms/Button";

interface Props {
  event: SbEvent;
  formattedDate: string;
  googleCalendarUrl: string;
}

export default function EventDetailPage({
  event,
  formattedDate,
  googleCalendarUrl,
}: Props) {
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

      {/* Back Button - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-24 left-6 z-20 md:left-12"
      >
        <Button type="strategy-gold" variant="outline" href="/activiteiten">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Terug</span>
        </Button>
      </motion.div>

      {/* Event Type Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        className="absolute top-24 right-6 z-20 md:right-12"
      >
        <Badge
          text={event.type || "Event"}
          backgroundColor="freedom"
          textColor="boldness"
        >
          {event.type || "Event"}
        </Badge>
      </motion.div>

      {/* Main Content - Bottom Center */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Info Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            {/* Date */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Calendar className="w-4 h-4 text-white/90" />
              <span className="text-sm md:text-base text-white/90 font-medium">
                {formattedDate}
              </span>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <MapPin className="w-4 h-4 text-white/90" />
                <span className="text-sm md:text-base text-white/90 font-medium">
                  {event.location}
                </span>
              </div>
            )}

            {/* Speaker */}
            {event.speaker && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--strategy-gold)]/20 backdrop-blur-md border border-[var(--strategy-gold)]/30">
                <User className="w-4 h-4 text-[var(--strategy-gold)]" />
                <span className="text-sm md:text-base text-[var(--strategy-gold)] font-bold">
                  {event.speaker}
                </span>
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-center mb-6 drop-shadow-2xl"
          >
            {event.title}
          </motion.h1>

          {/* Description */}
          {event.description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg text-white/80 text-center leading-relaxed mb-8 max-w-2xl mx-auto line-clamp-3"
            >
              {event.description}
            </motion.p>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            className="flex justify-center"
          >
            <Button
              href={googleCalendarUrl}
              target="_blank"
              type="strategy-gold"
              variant="primary"
              rel="noopener noreferrer"
            >
              <Calendar className="w-5 h-5" />
              <span>Toevoegen aan Agenda</span>
            </Button>
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
