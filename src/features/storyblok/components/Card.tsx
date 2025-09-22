import { SbCard } from "@storyblok/types/287325821225947/storyblok-components";
import { motion, Variants } from "framer-motion";

type CardProps = {
  blok: SbCard;
};

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

export default function Card({ blok }: CardProps) {
  return (
    <motion.article
      variants={cardVariants}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`rounded-3xl px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] bg-${blok.backgroundColor}`}
    >
      <h3 className="text-3xl font-extrabold uppercase tracking-wide">
        {blok.title}
      </h3>
      <p className="mt-4 text-md leading-relaxed text-bold/85 font-bold">
        {blok.content}
      </p>
    </motion.article>
  );
}
