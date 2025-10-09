"use client";

import {
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbSection } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData } from "@storyblok/react";
import { scaleRotateVariants } from "@/lib/animations";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";
import { useRef } from "react";

export default function Section({ blok }: { blok: SbSection }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%",
    amount: 0.2,
  });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative overflow-hidden",
        `bg-${blok.backgroundColor}`,
        `text-${blok.color}`,
        "py-12",
        "space-y-24"
      )}
      {...storyblokEditable(blok as SbBlokData)}
    >
      {blok.block?.map((nestedBlok, index) => (
        <motion.div
          key={nestedBlok._uid}
          variants={scaleRotateVariants}
          custom={index}
          className="h-full container px-4 mx-auto"
        >
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        </motion.div>
      ))}
    </motion.section>
  );
}
