"use client";

import { cn } from "@/utils/cn";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { SbPersonCard } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleRotateVariants } from "@/lib/animations";

export default function PersonCard({ blok }: { blok: SbPersonCard }) {
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

  const bgColorClass = getBackgroundColorClass(blok.backgroundColor);
  const textColorClass = getTextColorClass(blok.backgroundColor);

  return (
    <motion.article
      {...storyblokEditable(blok as SbBlokData)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={scaleRotateVariants}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-boldness/10 p-6 shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] transition-all hover:shadow-[0_30px_80px_-32px_rgba(17,17,17,0.55)]",
        bgColorClass
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            className="h-full w-full object-cover"
            src={blok.image.filename!}
            fill
            alt={blok.image.alt || blok.name || "Person image"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-6 flex flex-col gap-1"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3
          className={cn(
            "font-heading text-3xl uppercase tracking-wide",
            textColorClass
          )}
        >
          {blok.name}
        </h3>
        {blok.role && (
          <p
            className={cn(
              "font-body text-base leading-relaxed",
              textColorClass.replace("text-", "text-") + "/80"
            )}
          >
            {blok.role}
          </p>
        )}
      </motion.div>
    </motion.article>
  );
}
