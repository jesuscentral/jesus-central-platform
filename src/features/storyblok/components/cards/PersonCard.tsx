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

  // Determine text color based on background
  const getTextColorClass = (bgColor?: string) => {
    // Dark backgrounds need light text
    if (bgColor === "boldness" || bgColor === "strategy-green") {
      return "text-freedom";
    }
    // Light backgrounds need dark text
    return "text-boldness";
  };

  const bgColorClass = getBackgroundColorClass(blok.backgroundColor as string);
  const textColorClass = getTextColorClass(blok.backgroundColor as string);
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
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-boldness/10 transition-all",
        bgColorClass
      )}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          animate={{
            scale: isExpanded ? 1.1 : 1,
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

          {/* Cinematic gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-boldness via-boldness/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 0.95 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* About content overlay - appears on image */}
          <AnimatePresence>
            {isExpanded && hasAbout && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
              >
                <div className="max-h-full overflow-y-auto scrollbar-thin">
                  <div className="prose prose-sm prose-invert max-w-none font-body text-sm leading-relaxed text-freedom/90 md:text-base">
                    <RichTextRenderer
                      document={blok.about as unknown as StoryblokRichtext}
                      className="space-y-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expand/Collapse button - only shows if there's about content */}
        {hasAbout && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 backdrop-blur-md transition-all duration-300 md:h-12 md:w-12",
              isExpanded
                ? "border-freedom/40 bg-freedom/20 text-freedom hover:bg-freedom/30"
                : "border-boldness/20 bg-white/20 text-boldness opacity-0 group-hover:opacity-100 hover:bg-white/40"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isExpanded ? "Minder lezen" : "Meer lezen"}
          >
            <motion.svg
              width="20"
              height="20"
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

      {/* Info Section - slides up when expanded */}
      <motion.div
        className="relative p-6 md:p-8"
        animate={{
          y: isExpanded ? -20 : 0,
          opacity: isExpanded ? 0.3 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3
            className={cn(
              "font-heading text-3xl uppercase tracking-wide md:text-4xl",
              textColorClass
            )}
          >
            {blok.name}
          </h3>
          {blok.role && (
            <p
              className={cn(
                "font-body text-base leading-relaxed md:text-lg",
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
                "mt-3 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 font-body text-sm uppercase tracking-wider transition-all hover:scale-105",
                textColorClass === "text-boldness"
                  ? "border-boldness/20 bg-boldness/5 text-boldness/70 hover:border-boldness/40 hover:bg-boldness/10"
                  : "border-freedom/20 bg-freedom/5 text-freedom/70 hover:border-freedom/40 hover:bg-freedom/10"
              )}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>Lees meer</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
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
