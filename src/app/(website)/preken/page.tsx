import { getStory } from '@/features/storyblok/api'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { notFound } from 'next/navigation'
import SermonList from '@/components/sermons/SermonList'
import { getSermons } from '@/lib/actions/sermons'
import { connection } from 'next/server'
import Section from '@/components/ui/atoms/Section'

export default async function PrekenPage() {
  const [sermons, story] = await Promise.all([
    getSermons(),
    getStory(['preken']),
    connection(),
  ])

  if (!story) {
    notFound()
  }

  const blok = story.content

  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok: SbBlokData) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <Section backgroundColor="freedom" color="boldness">
        <SermonList sermons={sermons} />
      </Section>
    </div>
  )
}
