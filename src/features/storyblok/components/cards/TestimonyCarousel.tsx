import { SbTestimonyCarousel } from '@storyblok/types/287435740670216/storyblok-components'
import UITestimonyCarousel from '@/components/ui/molecules/TestimonyCarousel'
import { cn } from '@/utils/cn'
import { SbBlokData, storyblokEditable } from '@storyblok/react'
export default function TestimonyCarousel({
  blok,
}: {
  blok: SbTestimonyCarousel
}) {
  const mappedTestimonials =
    blok.testimonials?.map((testimonial) => ({
      name: testimonial.name,
      designation: testimonial.designation,
      quote: testimonial.quote,
      image: testimonial.image.filename,
      alt: testimonial.image.alt,
    })) ?? []

  return (
    <UITestimonyCarousel
      {...storyblokEditable(blok as SbBlokData)}
      title={blok.title}
      testimonials={mappedTestimonials}
      autoplay={blok?.autplay ?? false}
      textColorClasses={cn(`text-${blok.textColor as string}`)}
    />
  )
}
