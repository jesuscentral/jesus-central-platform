import { getSitemapEntries } from '@/features/storyblok/api'
import { stringLinkResolver } from '@/features/storyblok/utils/linkResolver'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const links = await getSitemapEntries()

  return links
    .filter((link) => link.is_folder === false)
    .filter((link) => stringLinkResolver(link.real_path) !== '/ui')
    .map((link) => ({
      url: `${baseUrl}${stringLinkResolver(link.real_path)}`,
    }))
}
