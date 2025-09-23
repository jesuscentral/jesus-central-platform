"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { SbImageHero } from "@storyblok/types/287325821225947/storyblok-components";

// Define the ImageHero type based on VideoHero structure
interface ImageHeroProps {
  blok: SbImageHero & SbBlokData;
}

export default function ImageHero({ blok }: ImageHeroProps) {
  return (
    <header
      {...storyblokEditable(blok as SbBlokData)}
      className="relative h-[min(100vh,760px)] overflow-hidden"
    >
      {/* Background image */}
      {blok.image && blok.image.filename && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt || "Afbeelding Jesus Central"}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bold" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-16 pt-6 sm:gap-8 sm:pb-24">
            {blok.title && (
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="max-w-3xl text-pretty text-4xl font-black leading-tight sm:text-6xl"
              >
                {blok.title}
              </motion.h1>
            )}
            {blok.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
              >
                {blok.subtitle}
              </motion.p>
            )}
            {blok.buttons && blok.buttons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row"
              >
                {blok.buttons.map((button) => (
                  <StoryblokServerComponent blok={button} key={button._uid} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
