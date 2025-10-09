"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/utils/cn";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { useCallback } from "react";
interface Props {
  events: SbEvent[];
  title?: string;
  titleColor?: string;
}
export default function StoryScrollList({ events }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // --- Events happening in the next 30 days ---
  const thisMonthEvents = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    return events.filter((event: SbEvent) => {
      const date = new Date(event.date);
      console.log(date);
      return date >= now && date <= thirtyDaysFromNow;
    });
  }, [events]);

  // Card width + gap
  const CARD_WIDTH = 240;
  const GAP = 16;
  const ITEM_SIZE = CARD_WIDTH + GAP;

  // Calculate offset to center the active card
  const getCenterOffset = useCallback(
    (index: number) => {
      // Get window width to calculate center position
      if (typeof window === "undefined") return -(index * ITEM_SIZE);
      const windowWidth = window.innerWidth;
      const centerOffset = windowWidth / 2 - CARD_WIDTH / 2;
      return centerOffset - index * ITEM_SIZE;
    },
    [ITEM_SIZE, CARD_WIDTH]
  );

  // Initialize position on mount
  useEffect(() => {
    const initialX = getCenterOffset(0);
    x.set(initialX);
  }, [getCenterOffset, x]);

  // Auto-scroll functionality
  useEffect(() => {
    if (thisMonthEvents.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % thisMonthEvents.length;
          const targetX = getCenterOffset(next);
          animate(x, targetX, {
            type: "spring",
            stiffness: 300,
            damping: 30,
          });
          return next;
        });
      }, 5000); // 5 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [getCenterOffset, thisMonthEvents.length, x]);

  // Snap to nearest card on drag end
  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Calculate which card to snap to
    let newIndex = currentIndex;
    if (Math.abs(velocity) > 500) {
      newIndex =
        velocity > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(thisMonthEvents.length - 1, currentIndex + 1);
    } else if (Math.abs(offset) > CARD_WIDTH / 3) {
      newIndex =
        offset > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(thisMonthEvents.length - 1, currentIndex + 1);
    }

    setCurrentIndex(newIndex);
    const targetX = getCenterOffset(newIndex);

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });

    // Reset auto-scroll timer
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  // Handle card click - scroll to and highlight
  const handleCardClick = (index: number) => {
    if (index === currentIndex) return; // Already centered

    setCurrentIndex(index);
    const targetX = getCenterOffset(index);

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });

    // Reset auto-scroll timer
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  return (
    <div className="mb-14 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
      <div className="relative h-[520px] w-full overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{
            left: -(thisMonthEvents.length - 1) * ITEM_SIZE,
            right: 0,
          }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
          style={{ x }}
          className="flex gap-4 items-center h-full cursor-grab"
        >
          {thisMonthEvents.map((event, i) => {
            const isCentered = i === currentIndex;

            return (
              <motion.div
                key={event._uid || i}
                onClick={() => handleCardClick(i)}
                animate={{
                  scale: isCentered ? 1 : 0.85,
                  opacity: isCentered ? 1 : 0.5,
                  rotateY: isCentered ? 0 : i < currentIndex ? -10 : 10,
                  zIndex: isCentered ? 20 : 10,
                }}
                whileHover={{
                  scale: isCentered ? 1.03 : 0.88,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{
                  scale: isCentered ? 0.98 : 0.83,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-3xl shadow-2xl cursor-pointer",
                  "w-[240px] h-[420px]", // Portrait/shorts size
                  isCentered && "shadow-[0_0_60px_rgba(235,55,0,0.4)]"
                )}
                style={{
                  perspective: "1000px",
                }}
              >
                {event.thumbnail?.filename?.includes(".mp4") ? (
                  <video
                    src={event.thumbnail?.filename}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={cn(
                      "object-cover absolute inset-0 w-full h-full transition-all duration-700",
                      isCentered ? "brightness-90" : "brightness-50"
                    )}
                    style={{ zIndex: 0 }}
                  />
                ) : (
                  <Image
                    src={event.thumbnail?.filename || "/og-image.png"}
                    alt={event.title}
                    fill
                    priority
                    className={cn(
                      "object-cover transition-all duration-700",
                      isCentered ? "brightness-90" : "brightness-50"
                    )}
                  />
                )}

                {/* Gradient overlays */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                  animate={{
                    opacity: isCentered ? 1 : 0.8,
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[var(--strategy-red)]/20 via-transparent to-transparent"
                  animate={{
                    opacity: isCentered ? [0.3, 0.5, 0.3] : 0.05,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Top badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute top-4 left-4 right-4 z-10"
                >
                  <div className="inline-block rounded-full bg-[var(--strategy-gold)]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase text-[var(--boldness)] shadow-lg">
                    {event.type || "Event"}
                  </div>
                </motion.div>

                {/* Text overlay at bottom */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="absolute bottom-0 left-0 right-0 z-10 p-5"
                >
                  <h4 className="text-xl font-bold leading-tight text-white mb-2">
                    {event.title}
                  </h4>
                  {event.speaker && (
                    <p className="text-sm text-[var(--strategy-gold)] mb-2 italic">
                      {event.speaker}
                    </p>
                  )}
                  <p className="text-xs text-white/80 mb-1">
                    {new Date(event.date).toLocaleDateString("nl-NL", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="text-xs text-[var(--strategy-gold)] font-semibold">
                    {new Date(event.date).toLocaleTimeString("nl-NL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </motion.div>

                {/* Shine effect for centered card */}
                {isCentered && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
