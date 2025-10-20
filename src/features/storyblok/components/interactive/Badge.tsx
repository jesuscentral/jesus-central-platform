import { storyblokEditable, SbBlokData } from '@storyblok/react/rsc'
import { SbBadge } from '@storyblok/types/287435740670216/storyblok-components'
import UIBadge from '@/components/ui/atoms/Badge'

export default function Badge({ blok }: { blok: SbBadge }) {
  return (
    <UIBadge
      link={blok.link?.url}
      text={blok.text}
      textColor={blok.textColor}
      backgroundColor={blok.backgroundColor}
      {...storyblokEditable(blok as SbBlokData)}
    />
  )
}
