import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  availableLanguages,
  defaultLanguage,
} from '@/features/storyblok/utils/languageConstants'

export function middleware(request: NextRequest) {
  // Language handling logic
  const { pathname } = request.nextUrl

  // Check if the pathname starts with a language prefix
  const pathnameHasLocale = availableLanguages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  let language = defaultLanguage

  // If URL has language prefix, extract it and redirect without prefix
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    if (availableLanguages.includes(locale)) {
      language = locale
      // Remove language prefix from pathname for redirect
      const newPathname = pathname.replace(`/${locale}`, '') || '/'
      const url = request.nextUrl.clone()
      url.pathname = newPathname

      const response = NextResponse.redirect(url)

      // Set language cookie
      response.cookies.set('language', language, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      })

      return response
    }
  }

  // For requests without language prefix, just set cookie from existing or default
  const existingLanguage =
    request.cookies.get('language')?.value || defaultLanguage

  const response = NextResponse.next()
  response.cookies.set('language', existingLanguage, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
