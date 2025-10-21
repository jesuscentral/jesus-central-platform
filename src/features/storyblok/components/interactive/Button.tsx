import { storyblokEditable } from '@storyblok/react/rsc'
import React from 'react'
import { SbButton } from '@storyblok/types/287435740670216/storyblok-components'
import { SbBlokData } from '@storyblok/js'
import { linkResolver } from '@/features/storyblok/utils/linkResolver'
import UIButton, {
  ButtonType,
  ButtonVariant,
  ButtonSize,
} from '@/components/ui/atoms/Button'

interface ButtonProps {
  blok: SbButton
}

export default function Button({ blok }: ButtonProps) {
  return (
    <UIButton
      {...storyblokEditable(blok as SbBlokData)}
      href={linkResolver(blok.link)}
      type={blok.type as ButtonType}
      variant={blok.variant as ButtonVariant}
      size={blok.size as ButtonSize}
      showArrowIcon={blok.showArrowIcon}
      className={blok.tailwindClasses}
    >
      {blok.text}
    </UIButton>
  )
}
