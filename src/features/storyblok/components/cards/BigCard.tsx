'use client'

import { SbBigCard } from '@storyblok/types/287435740670216/storyblok-components'
import Link from 'next/link'
import Image from 'next/image'
import { linkResolver } from '../../utils'

type BigCardProps = {
  blok: SbBigCard
}

export default function BigCard({ blok }: BigCardProps) {
  return (
    <div className="px-2 sm:px-4">
      <Link
        href={linkResolver(blok.link)}
        className="group block"
        draggable={false}
      >
        {/* Card */}
        <div className="duration-base relative mx-auto !aspect-[390/466] aspect-[1] overflow-hidden rounded-2xl object-cover shadow-none transition-all hover:shadow-2xl sm:!aspect-[1200/514]">
          {/* Image */}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={blok.image.filename || ''}
              alt={blok.title || ''}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 640px) 94vw, (max-width: 768px) 90vw, (max-width: 1024px) 84vw, 80vw"
              draggable={false}
            />
            {/* Gradient Overlay */}
            <div className="from-boldness/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end">
              <div className="w-full px-6 py-6 sm:px-8 sm:py-8">
                <h3 className="text-freedom font-heading mb-4 text-3xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
                  {blok.title}
                </h3>
                {blok.description && (
                  <p className="text-freedom/80 text-base leading-relaxed sm:text-lg">
                    {blok.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
