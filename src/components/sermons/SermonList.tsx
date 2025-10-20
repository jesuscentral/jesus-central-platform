'use client'

import { RssVideo } from '@/features/youtube'
import SermonCard from './SermonCard'
import SermonModal from './SermonModal'
import { useState } from 'react'
import SermonHighlight from '../ui/organisms/SermonHighlight'

export default function SermonList({ sermons }: { sermons: RssVideo[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const sortedSermons = sermons.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  const latestSermon = sortedSermons[0]

  return (
    <>
      <SermonHighlight
        youtubeUrl={latestSermon.url}
        title={latestSermon.title}
        date={latestSermon.publishedAt}
        thumbnail={{ src: latestSermon.thumbnailUrl, alt: latestSermon.title }}
      />
      <section className="2 container mx-auto grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedSermons.slice(1).map((item) => (
          <SermonCard key={item.videoId} video={item} onOpen={setOpen} />
        ))}

        <SermonModal videoId={open} onClose={() => setOpen(null)} />
      </section>
    </>
  )
}
