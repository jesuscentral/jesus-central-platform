"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { SbGrid } from "@storyblok/types/287435740670216/storyblok-components";
import { customContainerVariants, scaleRotateVariants } from "@/lib/animations";

export default function Grid({ blok }: { blok: SbGrid }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%",
    amount: 0.2,
  });

  const getBackgroundClass = () => {
    if (!blok.backgroundColor) return "";
    return `bg-${blok.backgroundColor}`;
  };

  const colCount = Math.min(blok.columns?.length ?? 2, 3);
  const colCountClass =
    colCount === 1
      ? "md:grid-cols-1"
      : colCount === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", getBackgroundClass(), "py-12")}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <motion.div
        variants={customContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn(
          "container px-4",
          "grid",
          colCountClass,
          "gap-6",
          "mx-auto"
        )}
      >
        {blok.columns?.map((nestedBlok, index) => (
          <motion.div
            key={nestedBlok._uid}
            variants={scaleRotateVariants}
            custom={index}
            className="h-full"
          >
            <StoryblokComponent blok={nestedBlok} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
