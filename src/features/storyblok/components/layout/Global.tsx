import { SbGlobal } from '@storyblok/types/287435740670216/storyblok-components'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'

export default function Global({ blok }: { blok: SbGlobal }) {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      {blok.item.map((item, index) => (
        <StoryblokServerComponent blok={item} key={index} />
      ))}
    </div>
  )
}
