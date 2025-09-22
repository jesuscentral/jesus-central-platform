"use client";

import { cn } from "@/utils/cn";
import { SbScripture } from "@storyblok/types/287325821225947/storyblok-components";
import { motion, Variants } from "framer-motion";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ScriptureSection({ blok }: { blok: SbScripture }) {
  const getBackgroundAndTextColor = () => {
    if (
      ["bold-dark", "strategy-charcoal", "brand-black"].includes(
        blok.backgroundColor as string
      )
    ) {
      return `bg-${blok.backgroundColor} text-white`;
    }

    if (
      ["strategy-gold", "strategy-green", "strategy-red", "cream"].includes(
        blok.backgroundColor as string
      )
    ) {
      return `bg-${blok.backgroundColor} text-brand-black`;
    }

    return `bg-${blok.backgroundColor} text-black`;
  };
  return (
    <section className={cn("py-20", getBackgroundAndTextColor())}>
      <div className="mx-auto max-w-5xl px-4 text-center">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          {blok.badge && (
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em]">
              {blok.badge}
            </span>
          )}
          <blockquote className="text-balance text-2xl font-semibold leading-relaxed sm:text-3xl">
            &quot;{blok.scripture}&quot;
          </blockquote>
          <p className="text-sm font-medium uppercase tracking-[0.3em]">
            {blok.reference}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
