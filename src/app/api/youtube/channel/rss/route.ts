import { getSermons } from '@/lib/actions/sermons'

// Cache this route for 1 hour (3600 seconds)
export const revalidate = 3600

// Enable static rendering for better performance
export const dynamic = 'force-static'

export const GET = async () => {
  const videos = getSermons()

  // Add cache headers for browser caching
  return new Response(JSON.stringify(videos), {
    status: 200,
  })
}
