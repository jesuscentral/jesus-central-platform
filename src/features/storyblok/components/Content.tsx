"use client";

import { SbContent } from "@storyblok/types/287325821225947/storyblok-components";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { RichTextRenderer } from "./RichTextRenderer";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export default function Content({ blok }: { blok: SbContent }) {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={cn(
        "w-full",
        `text-${blok.color}`,
        `bg-${blok.backgroundColor}`,
        `py-20`
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        {...storyblokEditable(blok as SbBlokData)}
        className={cn(
          "relative overflow-hidden mx-auto text-center container",
          blok.containerized ? "px-12 md:px-16 xl:px-24" : ""
        )}
      >
        <RichTextRenderer document={blok.content!} />
      </motion.section>
    </div>
  );
}
