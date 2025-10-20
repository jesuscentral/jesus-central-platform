'use server'

import { cookies } from 'next/headers'
import { defaultLanguage } from './languageConstants'

export const setLanguageConfig = async (language: string) => {
  const cookieStore = await cookies()
  cookieStore.set('language', language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
  return language
}

/**
 * Get the current language from cookies (server-side)
 * Returns the language code or undefined if default language (for Storyblok API)
 */
export async function getLanguageConfig() {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || defaultLanguage

  // Return undefined for default language (Storyblok convention)
  return language === defaultLanguage ? undefined : language
}

/**
 * Get the current language code from cookies (server-side)
 * Always returns a language code
 */
export async function getCurrentLanguage(): Promise<string> {
  const cookieStore = await cookies()
  return cookieStore.get('language')?.value || defaultLanguage
}
