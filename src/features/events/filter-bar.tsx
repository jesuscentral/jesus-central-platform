"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function FilterBar({
  _tab,
  enableFilters = false,
}: {
  _tab: "alles" | "diensten" | "events";
  enableFilters?: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"alles" | "diensten" | "events">(_tab);

  const saveToQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    params.set("tab", tab);

    router.push(`?${params.toString()}`);
  }, [tab, router]);

  useEffect(() => {
    if (!enableFilters) return;
    saveToQueryParams();
  }, [tab, saveToQueryParams, enableFilters]);

  return (
    <header className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-gradient-to-b from-bold-dark/10 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight text-bold-dark sm:text-5xl"
        >
          Events & Diensten
        </motion.h1>
        <p className="mt-3 max-w-2xl text-bold-dark/80">
          Overzicht van alle samenkomsten, trainingen en outreaches bij Jesus
          Central Church.
        </p>

        {enableFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Tabs */}
            <div className="inline-flex rounded-full bg-white/70 p-1 ring-1 ring-bold-dark/10 backdrop-blur">
              {[
                { k: "alles", label: "Alles" },
                { k: "diensten", label: "Diensten" },
                { k: "events", label: "Events" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as "alles" | "diensten" | "events")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition ${
                    tab === (t.k as "alles" | "diensten" | "events")
                      ? "bg-bold-dark text-cream"
                      : "text-bold-dark/80 hover:bg-black/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
