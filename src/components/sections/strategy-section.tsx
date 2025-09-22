"use client";

import { motion, Variants } from "framer-motion";

interface StrategyCardProps {
  title: string;
  description: string;
  colorClass: string;
  delay?: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
      delay,
    },
  }),
};

function StrategyCard({
  title,
  description,
  colorClass,
  delay = 0,
}: StrategyCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`rounded-3xl px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] ${colorClass}`}
    >
      <h3 className="text-3xl font-extrabold uppercase tracking-wide">
        {title}
      </h3>
      <p className="mt-4 text-md leading-relaxed text-bold/85 font-bold">
        {description}
      </p>
    </motion.article>
  );
}

export default function StrategySection() {
  const strategies = [
    {
      title: "Huis van herstel",
      description:
        "We zijn een huis waar we mensen bij Jezus brengen waardoor ze genezing, vergeving en innerlijk herstel ontvangen, zodat zij in vrijheid en kracht kunnen leven.",
      colorClass: "bg-strategy-gold",
      delay: 0,
    },
    {
      title: "Huis van training",
      description:
        "In dit huis rusten we mensen toe om als discipelen van Jezus te groeien in geloof, karakter en bediening.",
      colorClass: "bg-strategy-green",
      delay: 0.08,
    },
    {
      title: "Huis van zending",
      description:
        "Vanuit dit huis zenden wij toegewijde volgelingen uit om het evangelie te brengen in onze stad, regio, land en wereldwijd.",
      colorClass: "bg-strategy-red",
      delay: 0.12,
    },
  ];

  return (
    <section className="border-y border-white/5 bg-cream py-20 text-bold">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {strategies.map((strategy, index) => (
            <StrategyCard
              key={index}
              title={strategy.title}
              description={strategy.description}
              colorClass={strategy.colorClass}
              delay={strategy.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
