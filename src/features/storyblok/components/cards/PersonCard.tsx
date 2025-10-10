"use client";

import { cn } from "@/utils/cn";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { SbPersonCard } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scaleRotateVariants } from "@/lib/animations";
import { useState } from "react";
import { RichTextRenderer } from "../content/RichTextRenderer";
import { StoryblokRichtext } from "@storyblok/types/storyblok";

export default function PersonCard({ blok }: { blok: SbPersonCard }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map background colors to proper brand colors
  const getBackgroundColorClass = (color?: string) => {
    const colorMap: Record<string, string> = {
      boldness: "bg-boldness",
      freedom: "bg-freedom",
      "strategy-red": "bg-strategy-red",
      "strategy-gold": "bg-strategy-gold",
      "strategy-green": "bg-strategy-green",
    };
    return colorMap[color || "freedom"] || "bg-freedom";
  };

  const bgColorClass = getBackgroundColorClass(blok.backgroundColor as string);
  const textColorClass = `text-${blok.textColor as string}`;
  const hasAbout =
    blok.about && blok.about.content && blok.about.content.length > 0;

  return (
    <motion.article
      {...storyblokEditable(blok as SbBlokData)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={scaleRotateVariants}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-boldness/10 shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] transition-all",
        !isExpanded && "hover:shadow-[0_30px_80px_-32px_rgba(17,17,17,0.55)]",
        isExpanded && "shadow-[0_35px_90px_-32px_rgba(17,17,17,0.65)]",
        bgColorClass
      )}
    >
      {/* Image Container with Overlay */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isExpanded ? "min-h-[500px] md:aspect-[3/4]" : "aspect-[3/4]"
        )}
      >
        {/* Image Layer */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isExpanded ? 1.05 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <Image
            className="h-full w-full object-cover"
            src={blok.image.filename!}
            fill
            alt={blok.image.alt || blok.name || "Person image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </motion.div>

        {/* Cinematic gradient overlay */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-t from-boldness via-boldness/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 0.96 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* About content overlay - appears on image (MOBILE: takes full space) */}
        <AnimatePresence>
          {isExpanded && hasAbout && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-0 z-20 flex flex-col p-4 pb-16 pt-14 md:justify-end md:p-8 md:pb-8 md:pt-8"
            >
              {/* Mobile: scrollable container with better touch targets */}
              <div className="flex-1 overflow-y-hidden overscroll-contain md:flex-none md:max-h-[70%]">
                {/* Add extra padding for mobile scroll comfort */}
                <div className="prose prose-sm prose-invert max-w-none pb-4 font-body text-[13px] leading-relaxed text-freedom md:pb-0 md:text-base">
                  <RichTextRenderer
                    document={blok.about as unknown as StoryblokRichtext}
                    className="space-y-2"
                  />
                </div>
              </div>

              {/* Scroll indicator for mobile (bottom fade) */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-boldness to-transparent md:hidden" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse button - always visible on mobile when has content */}
        {hasAbout && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300 md:right-4 md:top-4 md:h-12 md:w-12",
              isExpanded
                ? "border-freedom/50 bg-freedom/25 text-freedom shadow-lg hover:bg-freedom/35"
                : "border-boldness/30 bg-white/30 text-boldness shadow-md md:opacity-0 md:group-hover:opacity-100 hover:bg-white/50"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isExpanded ? "Minder lezen" : "Meer lezen"}
          >
            <motion.svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        )}
      </div>

      {/* Info Section - only shows when NOT expanded */}
      {!isExpanded && (
        <motion.div
          className={cn("relative p-5 md:p-8")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3
              className={cn(
                "font-heading text-2xl uppercase tracking-wide md:text-4xl",
                textColorClass
              )}
            >
              {blok.name}
            </h3>
            {blok.role && (
              <p
                className={cn(
                  "font-body text-sm leading-relaxed md:text-lg",
                  textColorClass.replace("text-", "text-") + "/80"
                )}
              >
                {blok.role}
              </p>
            )}

            {/* Read more hint - only shows if there's about content */}
            {hasAbout && !isExpanded && (
              <motion.button
                onClick={() => setIsExpanded(true)}
                className={cn(
                  "mt-3 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2.5 font-body text-xs uppercase tracking-wider transition-all active:scale-95 md:text-sm md:hover:scale-105",
                  textColorClass === "text-boldness"
                    ? "border-boldness/20 bg-boldness/5 text-boldness/70 hover:border-boldness/40 hover:bg-boldness/10"
                    : "border-freedom/20 bg-freedom/5 text-freedom/70 hover:border-freedom/40 hover:bg-freedom/10"
                )}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Lees meer</span>
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="md:h-4 md:w-4"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Decorative accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-strategy-red via-strategy-gold to-strategy-green"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.article>
  );
}
