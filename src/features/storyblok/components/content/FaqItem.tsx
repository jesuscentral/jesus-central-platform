"use client";

import { SbFaqItem } from "@storyblok/types/287435740670216/storyblok-components";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RichTextRenderer } from "./RichTextRenderer";
import { StoryblokRichtext } from "@storyblok/types/storyblok";
import { cn } from "@/utils/cn";

interface FaqItemProps {
  blok: SbFaqItem;
  index?: number;
}

export default function FaqItem({ blok, index = 0 }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      {...storyblokEditable(blok as SbBlokData)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer",
          isOpen
            ? "border-strategy-red/20 bg-freedom"
            : "border-boldness/10 bg-white/70 backdrop-blur-sm hover:border-boldness/20 hover:shadow-[0_15px_40px_-15px_rgba(17,17,17,0.2)]"
        )}
      >
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4 p-6 text-left md:p-8">
          <motion.h3
            className={cn(
              "flex-1 font-heading text-xl uppercase tracking-wide transition-colors duration-300 md:text-2xl",
              isOpen ? "text-strategy-red" : "text-boldness"
            )}
            layout
          >
            {blok.question}
          </motion.h3>

          {/* Animated Icon */}
          <motion.div
            className={cn(
              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-10 md:w-10",
              isOpen
                ? "border-strategy-red bg-strategy-red"
                : "border-boldness/20 bg-white group-hover:border-boldness/40"
            )}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={cn(
                "transition-colors duration-300",
                isOpen ? "text-white" : "text-boldness/60"
              )}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
        </div>

        {/* Answer Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
                  opacity: { duration: 0.3, delay: 0.1 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
                  opacity: { duration: 0.2 },
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="border-t border-strategy-red/10 bg-gradient-to-b from-strategy-red/5 to-transparent px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-6"
              >
                <div className="prose prose-lg max-w-none font-body text-base leading-relaxed text-boldness/85 md:text-lg">
                  <RichTextRenderer
                    document={blok.answer as unknown as StoryblokRichtext}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
