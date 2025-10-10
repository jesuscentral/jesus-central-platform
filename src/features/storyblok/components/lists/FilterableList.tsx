"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import Link from "next/link";
import { linkResolver } from "../../utils";

interface Props {
  events: SbEvent[];
}

export default function FilterableList({ events }: Props) {
  const [filter, setFilter] = useState<"all" | "service" | "event">("all");

  // --- Filter logic ---
  const filtered = useMemo(() => {
    if (filter === "all") return events;
    if (filter === "service" || filter === "event")
      return events.filter((e) => e.type === filter);
    return events.filter((e) => e.language === filter);
  }, [filter, events]);

  const filters = ["all", "service", "event"];

  return (
    <section
      id="events-filtered"
      className="relative min-h-screen bg-[var(--freedom)] text-[var(--boldness)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as "all" | "service" | "event")}
              className={cn(
                "rounded-full border border-black/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition cursor-pointer",
                filter === f
                  ? "bg-[var(--strategy-green)] text-[var(--freedom)]"
                  : "bg-white text-[var(--boldness)] hover:bg-[var(--strategy-gold)]/10"
              )}
            >
              {f === "all" ? "Alle" : f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((event) => (
              <Link href={linkResolver(event.slug as string)} key={event._uid}>
                <motion.article
                  key={event._uid}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden">
                    {event.video?.filename ? (
                      <video
                        src={event.video.filename!}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ background: "#000" }}
                        tabIndex={-1}
                        poster={"/og-image.png"}
                        onMouseEnter={(e) => {
                          e.currentTarget.play();
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    ) : (
                      <Image
                        src={event.thumbnail?.filename || "/og-image.png"}
                        alt={event.title ?? "Event thumbnail"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    {event.type && (
                      <div className="absolute left-3 top-3 rounded-full bg-[var(--strategy-green)] px-3 py-1 text-xs font-semibold uppercase text-[var(--freedom)] shadow-sm">
                        {event.type}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[var(--boldness)]">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--strategy-green)]">
                      {new Date(event.date).toLocaleDateString("nl-NL", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {event.location && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {event.location}
                      </p>
                    )}
                    {event.speaker && (
                      <p className="mt-1 text-sm italic text-[var(--strategy-red)]">
                        {event.speaker}
                      </p>
                    )}
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-700">
                      {event.description}
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
