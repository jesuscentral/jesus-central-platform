import { getSitemapEntries } from '@/features/storyblok/api'
import { stringLinkResolver } from '@/features/storyblok/utils/linkResolver'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const links = await getSitemapEntries()

  const staticPages = ['/nieuw-begin']

  const ignoreLinks = ['/ui', '/website-config', '/home']

  const dynamicLinks = links
    .filter((link) => link.is_folder === false)
    .filter((link) => !ignoreLinks.includes(stringLinkResolver(link.real_path)))
    .filter((link) => stringLinkResolver(link.real_path) !== '/ui')
    .map((link) => ({
      url: `${baseUrl}${stringLinkResolver(link.real_path)}`,
    }))

  return [
    ...dynamicLinks,
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
    })),
  ]
}
