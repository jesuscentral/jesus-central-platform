"use client";

import { cn } from "@/utils/cn";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbGrid } from "@storyblok/types/287325821225947/storyblok-components";
import { Variants, motion } from "framer-motion";

export default function Grid({ blok }: { blok: SbGrid }) {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  };
  // Background color handling - for Tailwind classes to work, they need to be complete strings
  const getBackgroundClass = () => {
    if (!blok.backgroundColor) return "";
    // Map common color values to Tailwind classes
    return `bg-${blok.backgroundColor}`;
  };

  // Maximum 3 columns, items will wrap to next row if more than 3
  const colCount = Math.min(blok.columns?.length ?? 2, 3);
  const colCountClass =
    colCount === 1
      ? "md:grid-cols-1"
      : colCount === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      className={cn("relative overflow-hidden", getBackgroundClass())}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div
          className={cn("grid grid-cols-1 items-start gap-10", colCountClass)}
        >
          {blok.columns?.map((nestedBlok) => (
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={nestedBlok._uid}
            >
              <StoryblokServerComponent blok={nestedBlok} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
