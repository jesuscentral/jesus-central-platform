import { getSermons } from '@/lib/actions/sermons'

export default async function JesusCentralStream() {
  const sermons = await getSermons()

  const randomSermon = sermons[Math.floor(Math.random() * sermons.length)]
  return (
    <iframe
      title={randomSermon.title}
      id="ytplayer"
      width="100%"
      height="600"
      src={`https://www.youtube.com/embed/${randomSermon.videoId}?autoplay=1`}
    ></iframe>
  )
}
