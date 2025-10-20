import { storyblokEditable, SbBlokData } from '@storyblok/react/rsc'
import { SbInformationItem } from '@storyblok/types/287435740670216/storyblok-components'

type InformationItemProps = {
  blok: SbInformationItem
}

export default function InformationItem({ blok }: InformationItemProps) {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <dt className="text-sm tracking-wider text-white/70 uppercase">
        {blok.title}
      </dt>
      <dd className="text-base">{blok.text}</dd>
    </div>
  )
}
