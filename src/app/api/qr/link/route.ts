import { getWebsiteConfig } from '@/features/storyblok'
import { linkResolver } from '@/features/storyblok/api'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const websiteConfig = await getWebsiteConfig()
  if (!websiteConfig) {
    return NextResponse.json(
      { error: 'Website config not found' },
      { status: 404 },
    )
  }

  return NextResponse.redirect(
    new URL(linkResolver(websiteConfig.content?.qrPageLink?.cached_url) || ''),
    { status: 302 },
  )
}
