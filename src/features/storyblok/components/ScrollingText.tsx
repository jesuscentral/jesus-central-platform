"use client";

import { SbScrollingText } from "@storyblok/types/287325821225947/storyblok-components";
import { motion } from "framer-motion";
import { SbBlokData } from "@storyblok/react";
import { storyblokEditable } from "@storyblok/react";

export default function ScrollingText({ blok }: { blok: SbScrollingText }) {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="relative py-12 bg-jcc-boldness"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="overflow-hidden">
        <motion.div
          initial={{ x: "0%" }}
          whileInView={{ x: "-50%" }}
          viewport={{ once: true }}
          transition={{ duration: 18, ease: "linear" }}
          className="whitespace-nowrap"
        >
          <span className="mx-8 text-xl md:text-2xl text-jcc-freedom/80 uppercase tracking-wider">
            {blok.text}
          </span>
          <span className="mx-8 text-xl md:text-2xl text-jcc-freedom/80 uppercase tracking-wider">
            {blok.text}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
