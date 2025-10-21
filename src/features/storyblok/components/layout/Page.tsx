import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import React from 'react'
import { SbPage } from '@storyblok/types/287435740670216/storyblok-components'
import { cn } from '@/utils/cn'

interface PageProps {
  blok: SbPage & {
    body: SbBlokData[]
  }
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  const backgroundColorClassName = cn(
    'bg-freedom',
    blok.backgroundColor ? `bg-${blok.backgroundColor}` : '',
  )
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={backgroundColorClassName}
    >
      <main>
        {blok.body?.map((nestedBlok: SbBlokData) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
    </div>
  )
}

export default Page
