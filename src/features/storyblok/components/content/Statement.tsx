"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SbStatement } from "@storyblok/types/287435740670216/storyblok-components";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";

export type ScriptureRef = {
  ref: string;
  content?: string;
};

export type JccBeliefProps = {
  stelling: string;
  uitleg: string;
  scriptures?: ScriptureRef[];
  className?: string;
};

export default function Statement({ blok }: { blok: SbStatement }) {
  return (
    <motion.section
      {...storyblokEditable(blok as SbBlokData)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        `relative isolate overflow-hidden bg-cream p-6 sm:p-8 md:p-10`,
        `bg-${blok.backgroundColor}`
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative grid gap-6 md:grid-cols-12 md:items-end"
      >
        <div className="md:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-md bg-bold-dark px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
            Wat wij geloven
          </div>
          <h2 className="mt-3 text-4xl leading-[1.05] tracking-wide text-bold-dark sm:text-5xl">
            {blok.statement}
          </h2>
          <div className="mt-4 rounded-2xl border border-bold-dark/10 bg-white/70 p-4 sm:p-5">
            <div className="mb-2 inline-flex items-center gap-2 text-bold-dark/70">
              <Quote className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">
                Waarom we dit geloven
              </span>
            </div>
            <p className="text-bold-dark/90">{blok.explanation}</p>
          </div>
        </div>

        {blok.scriptures?.map((blok) => (
          <StoryblokServerComponent key={blok._uid} blok={blok} />
        ))}
      </motion.div>
    </motion.section>
  );
}
