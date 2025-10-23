import { getStory, getStoryblokSeoParameters } from '@/features/storyblok/api'
import { Metadata } from 'next'
import { StoryblokStory } from '@storyblok/react/rsc'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const slug = ['home']

  const story = await getStory(slug)

  if (!story) {
    return {}
  }

  return getStoryblokSeoParameters(story)
}

export default async function Index() {
  const slug = ['home']

  const story = await getStory(slug)

  if (!story) {
    return notFound()
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://jesuscentral.church'

  // Organization structured data for Google
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': `${baseUrl}/#organization`,
    name: 'Jesus Central Church',
    alternateName: 'JCC',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      'Jesus Central Church is een levendige christelijke gemeenschap in het hart van Nederland. Als ANBI-erkende organisatie zijn wij toegewijd aan het verkondigen van het evangelie en het dienen van onze gemeenschap.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rijsselseweg 1',
      addressLocality: 'Gouda',
      postalCode: '2803PZ',
      addressRegion: 'Zuid-Holland',
      addressCountry: 'NL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Contact',
      email: 'church@jesuscentral.nl',
    },
    sameAs: [
      'https://www.facebook.com/jesuscentralchurch',
      'https://www.instagram.com/jesuscentralchurch',
      'https://www.youtube.com/@jesuscentralchurch',
    ],
    nonprofitStatus: 'NonprofitANBI',
    foundingDate: '2018-09-21',
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
  }

  return (
    <>
      <StoryblokStory story={story} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
