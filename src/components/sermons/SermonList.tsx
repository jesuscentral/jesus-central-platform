"use client";

import { RssVideo } from "@/lib/youtube";
import SermonCard from "./SermonCard";
import SermonModal from "./SermonModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Play } from "lucide-react";

function formatDate(value: string) {
  const d = new Date(value);
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default function SermonList({ sermons }: { sermons: RssVideo[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const sortedSermons = sermons.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const latestSermon = sortedSermons[0];

  return (
    <>
      <section className="relative isolate overflow-hidden rounded-[2.5rem] bg-cream px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <motion.a
            href={`https://www.youtube.com/watch?v=${latestSermon.videoId}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative col-span-12 overflow-hidden rounded-[2rem] border border-bold-dark/10 bg-bold-dark shadow-2xl md:col-span-7"
          >
            <motion.img
              src={latestSermon.thumbnailUrl}
              alt=""
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.02 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full object-cover"
              style={{ aspectRatio: "21/9" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-orange shadow-xl transition-transform group-hover:scale-110">
                  <Play className="h-7 w-7 text-white" />
                </div>
                <span className="font-['Fira Sans',system-ui,sans-serif] text-base text-white/95">
                  Bekijk de preek
                </span>
              </div>
            </div>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="col-span-12 flex flex-col justify-center gap-5 rounded-[2rem] border border-bold-dark/10 bg-white/70 p-6 backdrop-blur-sm sm:p-8 md:col-span-5"
          >
            <span className="w-fit rounded-md bg-bold-dark px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
              Laatste video
            </span>
            <h1 className="font-['TGS Perfect Condensed',Oswald,Impact,sans-serif] text-5xl leading-[1.02] tracking-wide text-bold-dark sm:text-6xl md:text-7xl">
              {latestSermon.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-base text-bold-dark/85">
              <CalendarDays className="h-5 w-5 text-strategy-gold" />
              <span>{formatDate(latestSermon.publishedAt)}</span>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4 container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {sortedSermons.slice(1).map((item) => (
          <SermonCard key={item.videoId} video={item} onOpen={setOpen} />
        ))}

        <SermonModal videoId={open} onClose={() => setOpen(null)} />
      </section>
    </>
  );
}
