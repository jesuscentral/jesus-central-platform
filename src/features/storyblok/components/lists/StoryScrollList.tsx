"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { linkResolver } from "../../utils";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface Props {
  events: SbEvent[];
  title?: string;
  titleColor?: string;
}

export default function StoryScrollList({ events, title, titleColor }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentEvent = events[currentIndex];

  // Auto-scroll functionality
  useEffect(() => {
    if (events.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 7000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [events.length]);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    const newIndex =
      newDirection > 0
        ? (currentIndex + 1) % events.length
        : (currentIndex - 1 + events.length) % events.length;
    setCurrentIndex(newIndex);

    // Reset auto-scroll
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full overflow-hidden bg-freedom py-12 md:py-20">
      {/* Title Section */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 md:px-6 mb-8 md:mb-12"
        >
          <h2
            className={cn(
              "font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide",
              titleColor ? `text-${titleColor}` : "text-freedom"
            )}
          >
            {title}
          </h2>
        </motion.div>
      )}

      {/* Main Content */}
      <div
        ref={containerRef}
        className="relative h-[600px] md:h-[700px] lg:h-[800px]"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
            }}
            className="absolute inset-0"
          >
            {/* Card Container */}
            <div className="relative h-full mx-auto max-w-5xl px-4 md:px-6">
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-freedom/10">
                {/* Background Media */}
                <div className="absolute inset-0">
                  {currentEvent.video?.filename ? (
                    <video
                      key={`video-${currentIndex}`}
                      src={currentEvent.video.filename}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={currentEvent.thumbnail?.filename || "/og-image.png"}
                      alt={currentEvent.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-boldness via-boldness/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-boldness/40 via-transparent to-boldness/40" />

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                  {/* Type Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border-2 border-strategy-gold bg-strategy-gold/20 px-4 py-2 backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-strategy-gold animate-pulse" />
                      <span className="font-heading text-sm uppercase tracking-wider text-strategy-gold md:text-base">
                        {currentEvent.type || "Event"}
                      </span>
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-heading text-4xl uppercase tracking-wide text-freedom md:text-5xl lg:text-6xl mb-4"
                  >
                    {currentEvent.title}
                  </motion.h3>

                  {/* Speaker */}
                  {currentEvent.speaker && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-body text-lg text-strategy-gold md:text-xl mb-6"
                    >
                      Door {currentEvent.speaker}
                    </motion.p>
                  )}

                  {/* Event Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4 mb-8"
                  >
                    <div className="flex items-center gap-2 rounded-full border border-freedom/20 bg-freedom/10 px-4 py-2 backdrop-blur-sm">
                      <Calendar className="h-4 w-4 text-freedom" />
                      <span className="font-body text-sm text-freedom md:text-base">
                        {new Date(currentEvent.date).toLocaleDateString(
                          "nl-NL",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-freedom/20 bg-freedom/10 px-4 py-2 backdrop-blur-sm">
                      <Clock className="h-4 w-4 text-freedom" />
                      <span className="font-body text-sm text-freedom md:text-base">
                        {new Date(currentEvent.date).toLocaleTimeString(
                          "nl-NL",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    {currentEvent.location && (
                      <div className="flex items-center gap-2 rounded-full border border-freedom/20 bg-freedom/10 px-4 py-2 backdrop-blur-sm">
                        <MapPin className="h-4 w-4 text-freedom" />
                        <span className="font-body text-sm text-freedom md:text-base">
                          {currentEvent.location}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    href={linkResolver(currentEvent.slug as string)}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-strategy-red px-8 py-4 font-heading text-sm uppercase tracking-wider text-freedom shadow-lg transition-all hover:scale-105 hover:bg-strategy-red/90 hover:shadow-xl md:text-base mb-12 md:mb-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Meer informatie</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {events.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-boldness/30 bg-boldness/10 backdrop-blur-md transition-all hover:border-boldness/50 hover:bg-boldness/20 hover:scale-110 md:left-4 md:h-14 md:w-14 cursor-pointer"
              aria-label="Vorige"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-freedom md:h-7 md:w-7" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(1)}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-boldness/30 bg-boldness/10 backdrop-blur-md transition-all hover:border-boldness/50 hover:bg-boldness/20 hover:scale-110 md:right-4 md:h-14 md:w-14 cursor-pointer"
              aria-label="Volgende"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-freedom md:h-7 md:w-7" />
            </motion.button>
          </>
        )}

        {/* Progress Indicators */}
        {events.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6"
          >
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  if (autoScrollTimer.current)
                    clearInterval(autoScrollTimer.current);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-strategy-red"
                    : "w-2 bg-freedom/30 hover:bg-freedom/50"
                )}
                aria-label={`Ga naar event ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator - Shows there's more content below */}
      <Link href="#events-filtered">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center gap-3 pt-6 pb-8 md:pb-6"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="font-body text-sm text-boldness/70 md:text-base">
              Bekijk alle evenementen
            </p>
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-boldness/50"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
