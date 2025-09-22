"use client";

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

export default function ScriptureSection() {
  return (
    <section className="bg-bold-dark py-20">
      <div className="mx-auto max-w-5xl px-4 text-center text-white">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
            Kerntekst
          </span>
          <blockquote className="text-balance text-2xl font-semibold leading-relaxed sm:text-3xl">
            &quot;En Hij klom de berg op en riep bij Zich wie Hij wilde; en zij
            kwamen naar Hem toe. En Hij stelde er twaalf aan om bij Hem te zijn,
            en om hen uit te zenden om te prediken, en macht te hebben om de
            ziekten te genezen en de demonen uit te drijven.&quot;
          </blockquote>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">
            Marcus 3:13-15
          </p>
        </motion.div>
      </div>
    </section>
  );
}
