'use client'

import { Quote } from 'lucide-react'
import { SbStatement } from '@storyblok/types/287435740670216/storyblok-components'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'

export type ScriptureRef = {
  ref: string
  content?: string
}

export type JccBeliefProps = {
  stelling: string
  uitleg: string
  scriptures?: ScriptureRef[]
  className?: string
}

export default function Statement({ blok }: { blok: SbStatement }) {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="relative container mx-auto grid gap-6 px-4 md:grid-cols-12 md:items-end"
    >
      <div className="md:col-span-5">
        <div className="bg-boldness text-freedom inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase">
          Wat wij geloven
        </div>
        <h2 className="text-boldness mt-3 text-4xl leading-[1.05] tracking-wide sm:text-5xl">
          {blok.statement}
        </h2>
        <div className="border-boldness/10 mt-4 rounded-2xl border bg-white/70 p-4 sm:p-5">
          <div className="text-boldness/70 mb-2 inline-flex items-center gap-2">
            <Quote className="h-4 w-4" />
            <span className="text-xs tracking-wide uppercase">
              Waarom we dit geloven
            </span>
          </div>
          <p className="text-boldness/90">{blok.explanation}</p>
        </div>
      </div>

      {blok.scriptures?.map((blok) => (
        <StoryblokServerComponent key={blok._uid} blok={blok} />
      ))}
    </div>
  )
}
