"use client";

import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface Props {
  event: SbEvent;
  formattedDate: string;
  googleCalendarUrl: string;
}

export default function EventDetailPage({
  event,
  formattedDate,
  googleCalendarUrl,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // --- Parallax magic ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const blurHero = useTransform(scrollYProgress, [0, 1], ["0px", "6px"]);

  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-[var(--freedom)] text-[var(--boldness)]"
    >
      {/* ---- HERO SECTION ---- */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: yHero, scale: scaleHero, filter: `blur(${blurHero})` }}
          className="absolute inset-0"
        >
          {event.video?.filename ? (
            <video
              src={event.video.filename}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover brightness-[0.6]"
              poster={event.thumbnail?.filename || "/og-image.png"}
            />
          ) : (
            <Image
              src={event.thumbnail?.filename || "/og-image.png"}
              alt={event.title}
              fill
              priority
              className="object-cover brightness-[0.6]"
            />
          )}
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[var(--freedom)]/70" />

        {/* Text overlay */}
        <div className="absolute bottom-24 left-0 right-0 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-heading uppercase font-bold text-white tracking-tight"
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-sm sm:text-lg text-[var(--freedom)]/90"
          >
            {formattedDate} — {event.location}
          </motion.p>

          {event.speaker && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-2 text-[var(--strategy-gold)] italic"
            >
              Speaker: {event.speaker}
            </motion.p>
          )}
        </div>
      </div>

      {/* ---- ACTION BAR ---- */}
      <div className="sticky top-0 z-20 bg-[var(--boldness)] py-3 text-center backdrop-blur-md bg-opacity-90">
        <div className="flex justify-center items-center gap-4">
          <Link
            href={googleCalendarUrl}
            target="_blank"
            className="rounded-full bg-[var(--strategy-gold)] px-5 py-2 text-sm font-semibold uppercase text-[var(--freedom)] hover:bg-[var(--strategy-green)] transition"
          >
            ➕ Add to Calendar
          </Link>
          <Link
            href="/events"
            className="text-sm font-semibold uppercase text-[var(--freedom)]/80 hover:text-[var(--strategy-gold)] transition"
          >
            ← Back to Events
          </Link>
        </div>
      </div>

      {/* ---- DESCRIPTION SECTION ---- */}
      <section className="relative mx-auto max-w-4xl px-6 py-16 sm:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-2xl font-heading uppercase text-[var(--boldness)]"
        >
          About this Event
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg leading-relaxed text-[var(--boldness)]/80"
        >
          {event.description || "No description provided yet."}
        </motion.p>
      </section>

      {/* ---- PARALLAX BACKGROUND GRADIENT ---- */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]) }}
        className="pointer-events-none absolute top-0 left-0 right-0 -z-10 h-[120vh] bg-gradient-to-b from-[var(--freedom)] via-[var(--strategy-gold)]/10 to-[var(--freedom)]"
      />
    </motion.main>
  );
}
