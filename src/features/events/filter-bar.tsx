'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function FilterBar({
  _tab,
  enableFilters = false,
}: {
  _tab: 'alles' | 'diensten' | 'events'
  enableFilters?: boolean
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'alles' | 'diensten' | 'events'>(_tab)

  const saveToQueryParams = useCallback(() => {
    const params = new URLSearchParams()
    params.set('tab', tab)

    router.push(`?${params.toString()}`)
  }, [tab, router])

  useEffect(() => {
    if (!enableFilters) return
    saveToQueryParams()
  }, [tab, saveToQueryParams, enableFilters])

  return (
    <header className="bg-freedom relative overflow-hidden">
      <div className="from-boldness/10 absolute inset-0 bg-gradient-to-b to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-boldness text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          Events & Diensten
        </motion.h1>
        <p className="text-boldness/80 mt-3 max-w-2xl">
          Overzicht van alle samenkomsten, trainingen en outreaches bij Jesus
          Central Church.
        </p>

        {enableFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Tabs */}
            <div className="ring-boldness/10 inline-flex rounded-full bg-white/70 p-1 ring-1 backdrop-blur">
              {[
                { k: 'alles', label: 'Alles' },
                { k: 'diensten', label: 'Diensten' },
                { k: 'events', label: 'Events' },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k as 'alles' | 'diensten' | 'events')}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    tab === (t.k as 'alles' | 'diensten' | 'events')
                      ? 'bg-boldness text-freedom'
                      : 'text-boldness/80 hover:bg-black/5'
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
  )
}
