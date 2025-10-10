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
  backgroundColor?: string;
}

export default function StoryScrollList({
  events,
  title,
  titleColor,
  backgroundColor,
}: Props) {
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

  // Swipe detection thresholds
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={cn("relative w-full overflow-hidden", `bg-boldness`)}>
      {/* Full-Screen Cinematic Hero */}
      <div ref={containerRef} className="relative h-screen flex flex-col">
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                navigate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                navigate(-1);
              }
            }}
            className="absolute inset-0"
          >
            {/* Full-Screen Background Media */}
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

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-boldness via-boldness/80 to-boldness/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-boldness/70 via-transparent to-boldness/70" />

            {/* Hero Content Container */}
            <div className="relative h-full w-full flex flex-col">
              {/* Main Event Content - Centered/Bottom */}
              <div className="flex-1 flex flex-col justify-center md:justify-end px-6 md:px-12 lg:px-16 pb-24 md:pb-32 max-w-6xl">
                {/* Type Badge - Cinematic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 md:mb-6"
                >
                  <span className="inline-flex items-center gap-3 rounded-full border-2 border-strategy-gold bg-strategy-gold/25 px-6 py-3 md:px-8 md:py-4 backdrop-blur-lg shadow-2xl">
                    <span className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-strategy-gold animate-pulse shadow-lg shadow-strategy-gold/50" />
                    <span className="font-heading text-lg uppercase tracking-widest text-strategy-gold md:text-xl">
                      {currentEvent.type || "Event"}
                    </span>
                  </span>
                </motion.div>

                {/* Title - Massive Hero Size */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-heading text-6xl uppercase tracking-wide text-freedom md:text-7xl lg:text-8xl xl:text-9xl mb-6 md:mb-8 drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] leading-[0.9]"
                >
                  {currentEvent.title}
                </motion.h2>

                {/* Speaker - Prominent */}
                {currentEvent.speaker && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-body text-2xl text-strategy-gold md:text-3xl lg:text-4xl mb-8 md:mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-medium"
                  >
                    Door {currentEvent.speaker}
                  </motion.p>
                )}

                {/* Event Details - Glassmorphic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 md:gap-5 mb-10 md:mb-12"
                >
                  <div className="flex items-center gap-3 rounded-full border-2 border-strategy-green bg-strategy-green px-5 py-3 md:px-6 md:py-4 backdrop-blur-lg shadow-xl">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-boldness" />
                    <span className="font-body text-base text-boldness md:text-lg lg:text-xl font-medium">
                      {new Date(currentEvent.date).toLocaleDateString("nl-NL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border-2 border-strategy-green bg-strategy-green px-5 py-3 md:px-6 md:py-4 backdrop-blur-lg shadow-xl">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-boldness" />
                    <span className="font-body text-base text-boldness md:text-lg lg:text-xl font-medium">
                      {new Date(currentEvent.date).toLocaleTimeString("nl-NL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {currentEvent.location && (
                    <div className="flex items-center gap-3 rounded-full border-2 border-strategy-green bg-strategy-green px-5 py-3 md:px-6 md:py-4 backdrop-blur-lg shadow-xl">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-boldness" />
                      <span className="font-body text-base text-boldness md:text-lg lg:text-xl font-medium">
                        {currentEvent.location}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* CTA Button - Cinematic */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  href={linkResolver(currentEvent.slug as string)}
                  className="inline-flex items-center justify-center gap-3 md:gap-4 self-start rounded-full bg-strategy-red px-10 py-5 md:px-12 md:py-6 font-heading text-lg uppercase tracking-widest text-freedom  transition-all hover:scale-105 hover:bg-strategy-red/90  md:text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Meer informatie</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="md:w-7 md:h-7"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Aligned with content on all screens */}
        {events.length > 1 && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="relative h-full w-full flex items-center justify-between">
              {/* Left side container */}
              <div className="flex items-center pl-2 md:pl-8 lg:pl-12">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate(-1)}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-freedom/50 bg-freedom/15 backdrop-blur-xl transition-all hover:border-freedom/70 hover:bg-freedom/25 active:scale-95 md:h-20 md:w-20 md:hover:scale-110 cursor-pointer shadow-2xl"
                  aria-label="Vorige"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6 text-freedom md:h-10 md:w-10" />
                </motion.button>
              </div>

              {/* Right side container */}
              <div className="flex items-center pr-2 md:pr-8 lg:pr-12">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate(1)}
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-freedom/50 bg-freedom/15 backdrop-blur-xl transition-all hover:border-freedom/70 hover:bg-freedom/25 active:scale-95 md:h-20 md:w-20 md:hover:scale-110 cursor-pointer shadow-2xl"
                  aria-label="Volgende"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6 text-freedom md:h-10 md:w-10" />
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicators - Bottom center */}
        {events.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:bottom-8"
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
                  "h-3 rounded-full transition-all duration-300 cursor-pointer",
                  index === currentIndex
                    ? "w-12 bg-strategy-red "
                    : "w-3 bg-freedom/50 hover:bg-freedom/70 hover:w-6"
                )}
                aria-label={`Ga naar event ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Prominent Scroll to All Events CTA */}
      <Link href="#events-filtered">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative bg-gradient-to-b from-transparent via-boldness/50 to-boldness py-12 md:py-16 cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Divider line */}
            <motion.div
              className="h-px w-32 bg-gradient-to-r from-transparent via-freedom/50 to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Call to action text */}
            <div className="flex flex-col items-center gap-4">
              <p className="font-heading text-2xl md:text-3xl uppercase tracking-widest text-freedom/90 group-hover:text-freedom transition-colors">
                Alle Evenementen
              </p>
              <p className="font-body text-base md:text-lg text-freedom/60 group-hover:text-freedom/80 transition-colors">
                Ontdek ons volledige programma
              </p>
            </div>

            {/* Animated arrow */}
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-freedom/70 group-hover:text-freedom transition-colors"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
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
