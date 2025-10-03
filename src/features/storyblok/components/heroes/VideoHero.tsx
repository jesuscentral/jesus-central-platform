"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { SbVideoHero } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

interface VideoHeroProps {
  blok: SbVideoHero & SbBlokData;
}

export default function VideoHero({ blok }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Attempt to autoplay muted background video on supported browsers
    const v = videoRef.current;
    if (!v) return;

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.load();
            v.play().catch(() => {
              /* ignore autoplay blocks */
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(v);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      {...storyblokEditable(blok as SbBlokData)}
      className="relative h-[min(100vh,760px)] overflow-hidden"
    >
      {/* Background video with optimizations */}
      {blok.background_video && blok.background_video.filename && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={blok.fallback_image.filename!}
          onError={() => setVideoError(true)}
          style={{ display: videoError ? "none" : "block" }}
        >
          <source
            src={blok.background_video?.filename ?? "/videoclip-short.mp4"}
            type="video/mp4"
          />
        </video>
      )}

      {/* Fallback image if video fails */}
      {videoError && (
        <Image
          src={blok.fallback_image.filename!}
          alt={blok.fallback_image.alt!}
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
            {blok.buttons && (
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
