"use client";

import { useEffect, useState } from "react";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/atoms/Button";
import { cn } from "@/utils/cn";
import { SbLivestreamCard } from "@storyblok/types/287435740670216/storyblok-components";

type LiveStreamCardProps = {
  blok: SbLivestreamCard;
};

interface LiveStatus {
  live: boolean;
  url: string | null;
}

export default function LiveStreamCard({ blok }: LiveStreamCardProps) {
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch("/api/youtube/live");
        const data = await response.json();
        setLiveStatus(data);
      } catch (error) {
        console.error("Failed to fetch live status:", error);
        setLiveStatus({ live: false, url: null });
      }
    };

    checkLiveStatus();
    // Check every 60 seconds for live status updates
    const interval = setInterval(checkLiveStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  // Only render when live
  const isLive = liveStatus?.live ?? false;

  if (!isLive) {
    return null;
  }

  // Extract video ID from URL
  const getVideoId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(liveStatus?.url || null);

  return (
    <AnimatePresence>
      <motion.div
        {...storyblokEditable(blok as SbBlokData)}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative w-full py-12 px-4",
          `bg-${blok.backgroundColor || "freedom"}`
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-gradient-to-br from-boldness via-boldness to-boldness/90",
            "border border-strategy-red/20"
          )}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-strategy-red/40 via-transparent to-strategy-gold/30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
            {/* Live indicator */}
            <AnimatePresence>
              {isLive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Pulsing outer ring */}
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-strategy-red"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    {/* Solid center dot */}
                    <div className="relative w-3 h-3 rounded-full bg-strategy-red" />
                  </motion.div>
                  <span className="text-sm font-bold uppercase tracking-wider text-strategy-red">
                    Live Now
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-freedom mb-4 font-heading">
              {blok.title || "Live Stream"}
            </h3>

            {/* Description */}
            {blok.description && (
              <p className="text-base sm:text-lg text-freedom/85 leading-relaxed mb-6 max-w-2xl">
                {blok.description}
              </p>
            )}

            {/* Embedded YouTube Player */}
            {videoId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full"
              >
                {/* Video container with aspect ratio */}
                <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 border-2 border-strategy-red/30">
                  {/* Glow effect around video */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-strategy-red/50 via-strategy-gold/30 to-strategy-red/50 blur-xl opacity-75 animate-pulse" />

                  {/* Video wrapper */}
                  <div
                    className="relative bg-boldness"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                      title="Live Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Watch on YouTube link */}
                <div className="mt-4 flex items-center justify-center">
                  <Button
                    href={liveStatus?.url || "#"}
                    type="strategy-red"
                    variant="outline"
                    size="small"
                    className="text-xs"
                  >
                    Open in YouTube
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Decorative accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-strategy-red to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: isLive ? [0, 1, 0] : 1,
                opacity: isLive ? [0, 1, 0] : 0.3,
              }}
              transition={{
                duration: isLive ? 3 : 0.6,
                repeat: isLive ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Corner glow effect when live */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-strategy-red/20 blur-3xl rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
