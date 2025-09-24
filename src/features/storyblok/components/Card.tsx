import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { SbCard } from "@storyblok/types/287325821225947/storyblok-components";
import { motion, Variants } from "framer-motion";
import { RichTextRenderer } from "./RichTextRenderer";
import { StoryblokRichtext } from "@storyblok/types/storyblok";
import { cn } from "@/utils/cn";
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
      {...storyblokEditable(blok as SbBlokData)}
      variants={cardVariants}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col h-full rounded-3xl px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)] bg-${blok.backgroundColor}`}
    >
      <h3
        className={cn(
          "text-3xl font-extrabold uppercase tracking-wide",
          `text-${blok.titleColor}`
        )}
      >
        {blok.title}
      </h3>

      <div
        className={cn(
          "mt-4 text-md leading-relaxed text-bold/85 font-bold flex-1",
          `text-${blok.textColor}`
        )}
      >
        <RichTextRenderer
          document={blok.content as unknown as StoryblokRichtext}
        />
      </div>
    </motion.article>
  );
}
