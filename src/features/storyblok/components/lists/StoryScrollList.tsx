"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/utils/cn";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { useCallback } from "react";
import Badge from "@/components/ui/atoms/Badge";
import Button from "@/components/ui/atoms/Button";
import { linkResolver } from "../../utils";
import { ArrowRight } from "lucide-react";
import { generateNextImageUrl } from "@/lib/general";
interface Props {
  events: SbEvent[];
  title?: string;
  titleColor?: string;
}
export default function StoryScrollList({ events }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Responsive card dimensions - full-screen on mobile, cinematic on desktop
  const getCardDimensions = useCallback(() => {
    if (typeof window === "undefined")
      return { width: 360, height: 640, gap: 20 };

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isMobile) {
      // Full-screen cinematic on mobile - fill most of viewport
      return {
        width: Math.min(window.innerWidth * 0.85, 400),
        height: Math.min(window.innerHeight * 0.75, 720),
        gap: 16,
      };
    } else if (isTablet) {
      // Larger cards on tablet
      return { width: 340, height: 600, gap: 20 };
    } else {
      // Desktop - cinematic portrait
      return { width: 380, height: 680, gap: 24 };
    }
  }, []);

  const [dimensions, setDimensions] = useState(getCardDimensions());
  const ITEM_SIZE = dimensions.width + dimensions.gap;

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => setDimensions(getCardDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCardDimensions]);

  // Calculate offset to position the active card
  const getCenterOffset = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return -(index * ITEM_SIZE);

      const windowWidth = window.innerWidth;
      const isDesktop = windowWidth >= 1024;

      if (isDesktop) {
        // On desktop: keep first card at left edge, center subsequent cards
        if (index === 0) {
          // First card starts at left edge (0 offset)
          return 0;
        } else {
          // Center other cards when selected
          const centerOffset = windowWidth / 2 - dimensions.width / 2;
          return centerOffset - index * ITEM_SIZE;
        }
      } else {
        // On mobile/tablet, always center the card
        const centerOffset = windowWidth / 2 - dimensions.width / 2;
        return centerOffset - index * ITEM_SIZE;
      }
    },
    [ITEM_SIZE, dimensions.width]
  );

  // Initialize position on mount
  useEffect(() => {
    const initialX = getCenterOffset(0);
    x.set(initialX);
  }, [getCenterOffset, x]);

  // Auto-scroll functionality
  useEffect(() => {
    if (events.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % events.length;
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
  }, [getCenterOffset, events.length, x]);

  // Snap to nearest card on drag end with smooth cinematic animation
  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Calculate which card to snap to - more sensitive for better mobile UX
    let newIndex = currentIndex;
    if (Math.abs(velocity) > 300) {
      // Lower threshold for velocity-based swipe
      newIndex =
        velocity > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(events.length - 1, currentIndex + 1);
    } else if (Math.abs(offset) > dimensions.width / 4) {
      // Quarter-width swipe triggers change
      newIndex =
        offset > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(events.length - 1, currentIndex + 1);
    }

    setCurrentIndex(newIndex);
    const targetX = getCenterOffset(newIndex);

    animate(x, targetX, {
      type: "spring",
      stiffness: 260,
      damping: 28,
      mass: 0.8,
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
    <div className="-mx-4 sm:-mx-6 lg:mx-0">
      <div className="relative w-full overflow-visible lg:container lg:mx-auto lg:px-4">
        <motion.div
          drag="x"
          dragConstraints={{
            left: -(events.length - 1) * ITEM_SIZE,
            right: 0,
          }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
          style={{ x }}
          className={cn(
            "flex items-center h-full cursor-grab touch-pan-y select-none",
            `gap-[${dimensions.gap}px]`
          )}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
        >
          {events.map((event, i) => {
            const isCentered = i === currentIndex;
            const distance = Math.abs(i - currentIndex);

            return (
              <div
                key={event._uid || i}
                className="relative flex-shrink-0"
                style={{
                  width: `${dimensions.width}px`,
                  height: `${dimensions.height}px`,
                  zIndex: isCentered ? 50 : Math.max(10 - distance, 1),
                }}
              >
                <motion.div
                  onClick={() => handleCardClick(i)}
                  animate={{
                    scale: isCentered ? 1 : 0.78 - distance * 0.05,
                    opacity: isCentered
                      ? 1
                      : Math.max(0.3, 1 - distance * 0.25),
                    rotateY: isCentered ? 0 : i < currentIndex ? -12 : 12,
                    z: isCentered ? 0 : -100 * distance,
                    filter: isCentered
                      ? "blur(0px)"
                      : `blur(${distance * 2}px)`,
                  }}
                  whileHover={{
                    scale: isCentered ? 1.02 : 0.8,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{
                    scale: isCentered ? 0.98 : 0.75,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 0.8,
                  }}
                  className={cn(
                    "relative w-full h-full overflow-hidden cursor-pointer backdrop-blur-sm",
                    "rounded-2xl md:rounded-3xl lg:rounded-[2rem]",
                    "shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                  )}
                  style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Video/Image Background */}
                  {event.video?.filename ? (
                    <motion.video
                      src={event.video.filename!}
                      autoPlay={isCentered}
                      loop
                      muted
                      playsInline
                      animate={{
                        scale: isCentered ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "object-cover absolute inset-0 w-full h-full transition-all duration-1000",
                        isCentered
                          ? "brightness-100 saturate-110"
                          : "brightness-40 saturate-50"
                      )}
                      poster={
                        event.thumbnail?.filename
                          ? generateNextImageUrl(event.thumbnail.filename, 1000)
                          : "/og-image.png"
                      }
                      style={{ zIndex: 0 }}
                    />
                  ) : (
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: isCentered ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={event.thumbnail?.filename || "/og-image.png"}
                        alt={event.title}
                        fill
                        priority={i <= 2}
                        className={cn(
                          "object-cover transition-all duration-1000",
                          isCentered
                            ? "brightness-100 saturate-110"
                            : "brightness-40 saturate-50"
                        )}
                      />
                    </motion.div>
                  )}

                  {/* Cinematic Gradient Overlays */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                    animate={{
                      opacity: isCentered ? 0.95 : 0.6,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{ zIndex: 1 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[var(--strategy-red)]/30 via-transparent to-transparent"
                    animate={{
                      opacity: isCentered ? [0.4, 0.7, 0.4] : 0.1,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ zIndex: 2 }}
                  />
                  {/* Vignette effect for centered card */}
                  {isCentered && (
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
                  )}

                  {/* Top badge with enhanced design */}
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{
                      y: isCentered ? 0 : -10,
                      opacity: isCentered ? 1 : 0.6,
                    }}
                    transition={{
                      delay: i * 0.08,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="absolute top-5 left-5 right-5 z-20"
                  >
                    <Badge
                      text={event.type || "Event"}
                      backgroundColor="freedom"
                      textColor="boldness"
                    >
                      {event.type || "Event"}
                    </Badge>
                  </motion.div>

                  {/* Enhanced text overlay at bottom */}
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                      y: isCentered ? 0 : 20,
                      opacity: isCentered ? 1 : 0.5,
                    }}
                    transition={{ delay: i * 0.08 + 0.15, type: "spring" }}
                    className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8"
                  >
                    {/* Date and time with modern design */}
                    <motion.div
                      animate={{
                        scale: isCentered ? 1 : 0.9,
                      }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <span className="text-xs md:text-sm text-white/90 font-medium">
                          {new Date(event.date).toLocaleDateString("nl-NL", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="px-3 py-1.5 rounded-full bg-[var(--strategy-gold)]/20 backdrop-blur-md border border-[var(--strategy-gold)]/30">
                        <span className="text-xs md:text-sm text-[var(--strategy-gold)] font-bold">
                          {new Date(event.date).toLocaleTimeString("nl-NL", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>

                    {/* Title with stunning typography */}
                    <motion.h4
                      animate={{
                        scale: isCentered ? 1 : 0.9,
                      }}
                      className={cn(
                        "font-bold leading-tight text-white mb-3 drop-shadow-2xl",
                        "text-2xl md:text-3xl lg:text-4xl"
                      )}
                    >
                      {event.title}
                    </motion.h4>

                    {/* Speaker with elegant styling */}
                    {event.speaker && (
                      <motion.p
                        animate={{
                          opacity: isCentered ? 1 : 0.6,
                        }}
                        className="text-base md:text-lg text-[var(--strategy-gold)] italic font-medium mb-4 drop-shadow-lg"
                      >
                        {event.speaker}
                      </motion.p>
                    )}

                    {/* "Meer info" button - only shown on centered card */}
                    {isCentered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <Button
                          href={linkResolver(event.slug as string)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Meer info</span>
                          <ArrowRight />
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Enhanced shine effect for centered card */}
                  {isCentered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
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
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
