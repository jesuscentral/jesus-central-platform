import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get('webhook-secret')

  if (secret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Get story slug from webhook payload
    const storySlug = body.full_slug || body.story?.full_slug

    if (storySlug) {
      // Revalidate specific page
      await revalidatePath(`/${storySlug}`)
      console.log(`Revalidated: /${storySlug}`)
    }

    // Revalidate by tags
    await revalidateTag('storyblok-stories')

    // If it's an event, revalidate events tag
    if (body.story?.content_type === 'event') {
      await revalidateTag('events')
    }

    return NextResponse.json({
      revalidated: true,
      slug: storySlug,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
