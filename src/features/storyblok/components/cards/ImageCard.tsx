"use client";

import { SbImageCard } from "@storyblok/types/287435740670216/storyblok-components";
import { motion } from "framer-motion";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";

export default function ImageCard({ blok }: { blok: SbImageCard }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      {...storyblokEditable(blok as SbBlokData)}
      variants={fadeUp}
      className={cn(
        "rounded-2xl overflow-hidden border",
        `border-${blok.textColor}/50`,
        `text-${blok.textColor}`
      )}
    >
      {blok.image?.filename && (
        <div
          className="h-48 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${blok.image.filename})`,
          }}
        />
      )}
      <div className="p-6 space-y-2">
        <h3 className="font-heading text-2xl">{blok.title}</h3>
        <p className={`mt-2 font-body text-${blok.textColor}/85`}>
          {blok.description}
        </p>
        <div className="flex gap-2 wrap">
          {blok.actions?.map((action) => (
            <StoryblokServerComponent key={action._uid} blok={action} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
