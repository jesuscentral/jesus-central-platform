"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { motion } from "framer-motion";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { SbBlokHero } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";

// Define the BlokHero type

export default function BlokHero({ blok }: { blok: SbBlokHero }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-jcc-slate-900 to-jcc-slate-800"
    >
      <div className="absolute inset-0">
        <Image
          src={blok.image.filename!}
          alt={blok.image.alt || "Afbeelding Jesus Central"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>
      <div className="relative z-10 grid min-h-[60vh] gap-6 px-4 pb-8 pt-20 sm:px-6 sm:pt-24 md:min-h-[70vh] md:grid-cols-2 md:gap-12 md:px-12 md:pb-12 md:pt-16 lg:gap-16">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center space-y-4 md:space-y-6">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-heading text-4xl tracking-tight text-jcc-freedom sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ letterSpacing: "0.02em" }}
          >
            {blok.title}
          </motion.h1>

          {blok.subtitle && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.15, duration: 0.6 },
              }}
              className="max-w-2xl font-body text-base text-jcc-freedom/90 sm:text-lg md:text-xl"
            >
              {blok.subtitle}
            </motion.p>
          )}

          {blok.buttons && blok.buttons.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.3, duration: 0.6 },
              }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:gap-4">
                {blok.buttons.map((button) => (
                  <StoryblokServerComponent blok={button} key={button._uid} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Custom Blok Content */}
        {blok.block && blok.block.length > 0 && (
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2, duration: 0.6 },
            }}
            className="flex items-center justify-center py-8 md:py-12"
          >
            {blok.block.map((nestedBlok) => (
              <StoryblokServerComponent
                blok={nestedBlok}
                key={nestedBlok._uid}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
