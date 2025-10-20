'use client'

import Button, { ButtonType } from '@/components/ui/atoms/Button'
import {
  FilloutFullScreenEmbed,
  FilloutPopupEmbed,
  FilloutSliderEmbed,
  FilloutStandardEmbed,
} from '@fillout/react'
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc'
import { SbFilloutForm } from '@storyblok/types/287435740670216/storyblok-components'
import { useState } from 'react'

export default function FilloutForm({ blok }: { blok: SbFilloutForm }) {
  if (!blok.id) return null

  if (blok.type === 'standard') {
    return (
      <div
        {...storyblokEditable(blok as SbBlokData)}
        className="h-full min-h-[200px] w-full"
      >
        <FilloutStandardEmbed
          dynamicResize
          inheritParameters
          filloutId={blok.id}
        />
      </div>
    )
  }

  if (blok.type === 'fullscreen') {
    return (
      <div {...storyblokEditable(blok as SbBlokData)}>
        <FilloutFullScreenEmbed filloutId={blok.id} />
      </div>
    )
  }

  if (blok.type === 'popup') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button
          variant="primary"
          type={blok.buttonColor as ButtonType}
          onClick={() => setOpen(true)}
        >
          {blok.buttonText}
        </Button>

        <FilloutPopupEmbed
          filloutId={blok.id}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    )
  }

  if (blok.type === 'slider') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button
          variant="primary"
          type={blok.buttonColor as ButtonType}
          onClick={() => setOpen(true)}
        >
          {blok.buttonText}
        </Button>

        <FilloutSliderEmbed
          filloutId={blok.id}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    )
  }

  return null
}
