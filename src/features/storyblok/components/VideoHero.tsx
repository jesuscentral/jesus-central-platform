"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { SbVideoHero } from "../../../../.storyblok/types/287325821225947/storyblok-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

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
      {...storyblokEditable(blok)}
      className="relative h-[min(100vh,760px)] overflow-hidden bg-black"
    >
      {/* Background video with optimizations */}
      {blok.background_video?.filename && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={blok.fallback_image?.filename || ""}
          onError={() => setVideoError(true)}
        >
          <source src={blok?.background_video?.filename} type="video/mp4" />
        </video>
      )}

      {/* Fallback image if video fails or doesn't exist */}
      {(videoError || !blok.background_video?.filename) &&
        blok.fallback_image?.filename && (
          <Image
            src={blok.fallback_image.filename}
            alt={blok.fallback_image.alt || blok.title || "Hero background"}
            fill
            className="object-cover"
            priority
          />
        )}

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

      <div className="relative z-10 flex h-full items-start justify-center pt-24 sm:pt-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4">
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
                <Button key={button._uid} blok={button} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
