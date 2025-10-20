'use client'

import { storyblokEditable, SbBlokData } from '@storyblok/react/rsc'
import { SbCard } from '@storyblok/types/287435740670216/storyblok-components'
import { RichTextRenderer } from '../content/RichTextRenderer'
import { StoryblokRichtext } from '@storyblok/types/storyblok'

type CardProps = {
  blok: SbCard
}

export default function Card({ blok }: CardProps) {
  return (
    <article
      {...storyblokEditable(blok as SbBlokData)}
      className="flex h-full flex-col rounded-3xl px-8 py-10"
      style={{
        backgroundColor: `var(--${blok.backgroundColor})`,
      }}
    >
      <h3
        className="text-3xl font-extrabold tracking-wide uppercase"
        style={{
          color: `var(--${blok.titleColor})`,
        }}
      >
        {blok.title}
      </h3>

      <div
        className="text-md text-bold/85 mt-4 flex-1 leading-relaxed font-bold"
        style={{
          color: `var(--${blok.textColor})`,
        }}
      >
        <RichTextRenderer
          document={blok.content as unknown as StoryblokRichtext}
        />
      </div>
    </article>
  )
}
