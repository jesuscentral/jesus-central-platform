import { getStory, getStoryblokSeoParameters } from '@/features/storyblok/api'
import { StoryblokStory } from '@storyblok/react/rsc'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
type Props = {
  params: Promise<{ slug: string[] }>
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

// Generate static paths at build time for main pages
export async function generateStaticParams() {
  // Add your main pages here for static generation at build time
  return [
    { slug: [] }, // home
    { slug: ['over-ons'] },
    { slug: ['agenda'] },
    { slug: ['preken'] },
    { slug: ['geven'] },
    { slug: ['contact'] },
  ]
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const story = await getStory(params.slug)
  if (!story) {
    return {}
  }

  return getStoryblokSeoParameters(story)
}

export default async function Page(props: Props) {
  const params = await props.params

  const story = await getStory(params.slug)

  if (!story) {
    return notFound()
  }

  return (
    <>
      <StoryblokStory story={story} />
    </>
  )
}
