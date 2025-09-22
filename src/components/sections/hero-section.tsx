"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
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
    <header className="relative h-[min(100vh,760px)] overflow-hidden">
      {/* Background video with optimizations */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/og-image.png"
        onError={() => setVideoError(true)}
        style={{ display: videoError ? "none" : "block" }}
      >
        <source src="/videoclip-short.mp4" type="video/mp4" />
        {/* Add WebM version for better compression if available */}
        {/* <source src="/videoclip-short.webm" type="video/webm" /> */}
      </video>

      {/* Fallback image if video fails */}
      {videoError && (
        <Image
          src="/og-image.png"
          alt="Jesus Central Church"
          fill
          className="object-cover"
          priority
        />
      )}
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bold" />

      <div className="relative z-10 flex h-full flex-col">
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Jesus Central Church"
              width={200}
              height={60}
              priority
              className="h-10 w-auto"
            />
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
            <a
              href="#visie"
              className="hidden rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 sm:inline-flex"
            >
              Missie & Visie
            </a>
            <Link
              href="https://godcentregouda.nl"
              className="hidden group md:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-black shadow-lg shadow-black/20 transition hover:brightness-95 sm:text-sm"
            >
              Ga naar website
              <svg
                className="transition-transform group-hover:translate-x-0.5"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </nav>

        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-16 pt-6 sm:gap-8 sm:pb-24">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-3xl text-pretty text-4xl font-black leading-tight sm:text-6xl"
            >
              Jij bent welkom!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
            >
              Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem
              aanbidden en elkaar ontmoeten. We bidden dat dit een plek is waar
              je God ontmoet en mooie momenten beleeft in Zijn aanwezigheid.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row"
            >
              <Link
                href="https://godcentregouda.nl"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-black shadow-lg shadow-black/20 transition hover:brightness-110"
              >
                Ga naar website
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#visie"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                Leer onze missie kennen
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
