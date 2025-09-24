"use client";

import { SbScrollingText } from "@storyblok/types/287325821225947/storyblok-components";
import { motion } from "framer-motion";

export default function ScrollingText({ blok }: { blok: SbScrollingText }) {
  return (
    <div className="relative py-12 bg-jcc-boldness">
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
          {/* <span className="mx-8 font-accent text-xl md:text-2xl text-jcc-freedom/80 uppercase tracking-wider">
            Marcus 3:13–15 (HSV) • En Hij klom de berg op en riep bij Zich wie
            Hij wilde; en zij kwamen naar Hem toe • Om bij Hem te zijn • Om uit
            te zenden om te prediken • Macht over ziekten en demonen •
          </span>
          <span className="mx-8 font-accent text-xl md:text-2xl text-jcc-freedom/80 uppercase tracking-wider">
            Marcus 3:13–15 (HSV) • En Hij klom de berg op en riep bij Zich wie
            Hij wilde; en zij kwamen naar Hem toe • Om bij Hem te zijn • Om uit
            te zenden om te prediken • Macht over ziekten en demonen •
          </span> */}
        </motion.div>
      </div>
    </div>
  );
}
