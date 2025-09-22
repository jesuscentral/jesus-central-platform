"use client";

import { motion, Variants } from "framer-motion";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export default function MissionVisionSection() {
  return (
    <section id="visie" className="relative overflow-hidden bg-strategy-green">
      <div className="pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="rounded-full bg-brand-black/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Missie
            </span>
            <h2 className="mt-4 text-pretty text-3xl font-extrabold sm:text-4xl">
              Jezus volgen en verkondigen in de kracht van de Heilige Geest
            </h2>
            <p className="mt-4 text-white/85">
              Wij bestaan om, in de kracht van de Heilige Geest, Jezus te
              verkondigen in de wereld; zodat mensen zich tot Jezus bekeren,
              eeuwig leven ontvangen en Hem toegewijd navolgen in alle facetten
              van het dagelijks leven.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="rounded-full bg-brand-black/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Visie
            </span>
            <h2 className="mt-4 text-pretty text-3xl font-extrabold sm:text-4xl">
              Een huis van herstel, training en zending.
            </h2>
            <p className="mt-4 text-white/85">
              We verlangen een kerk te zijn gevormd door volgelingen van Jezus,
              vol van Gods Woord en Geest. Een actief gemeenteleven dat mensen
              bereikt met het Evangelie, herstel brengt in de naam van Jezus en
              toelegt op toewijding en discipelschap.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
