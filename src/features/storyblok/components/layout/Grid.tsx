"use client";

import { customContainerVariants, fadeInUp } from "@/lib/animations";
import { cn } from "@/utils/cn";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokComponent,
} from "@storyblok/react";
import { SbGrid } from "@storyblok/types/287435740670216/storyblok-components";
import { motion } from "framer-motion";

export default function Grid({ blok }: { blok: SbGrid }) {
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

  // Container animation - stagger children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Simple, reliable fade-up animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section
      className={cn("relative overflow-hidden", getBackgroundClass(), "py-12")}
      {...storyblokEditable(blok as SbBlokData)}
    >
      <motion.div
        variants={customContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px", amount: 0.1 }}
        className={cn(
          "container px-4",
          "grid",
          colCountClass,
          "gap-6",
          "mx-auto"
        )}
      >
        {blok.columns?.map((nestedBlok) => (
          <motion.div
            key={nestedBlok._uid}
            variants={fadeInUp}
            className="h-full"
          >
            <StoryblokComponent blok={nestedBlok} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
