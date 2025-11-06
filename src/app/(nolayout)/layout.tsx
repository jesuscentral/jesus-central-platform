import Script from 'next/script'
import newrelic from 'newrelic'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/app/globals.css'
import StoryblokProvider from '@/components/StoryblokProvider'
import { MotionProvider } from '@/components/MotionProvider'

const headingFont = localFont({
  src: './../../assets/fonts/TGSPerfectCondensed.otf',
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = localFont({
  src: './../../assets/fonts/FiraSans-Regular.ttf',
  variable: '--font-body',
  display: 'swap',
})

const siteUrl = 'https://jesuscentral.church'

export const metadata: Metadata = {
  title: 'Jesus Central Church',
  description:
    'Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten. We bidden dat dit een plek is waar je God ontmoet en mooie momenten beleeft in Zijn aanwezigheid.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Jesus Central Church',
    description:
      'Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten.',
    url: siteUrl,
    siteName: 'Jesus Central Church',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jesus Central Church',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jesus Central Church',
    description:
      'Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten.',
    images: ['/og-image.png'],
  },
}

export default async function NoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // @ts-expect-error - newrelic is not typed
  if (newrelic.agent.collector.isConnected() === false) {
    await new Promise((resolve) => {
      // @ts-expect-error - newrelic is not typed
      newrelic.agent.on('connected', resolve)
    })
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  })
  return (
    <StoryblokProvider>
      <html lang="nl">
        <Script
          id="nr-browser-agent"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
        />
        <Script src="/newrelic-client.js" type="text/javascript" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body
          className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
        >
          <MotionProvider>
            <div className="relative z-10 flex h-full flex-col">
              <div className="min-h-screen bg-black text-white">{children}</div>
            </div>
          </MotionProvider>
        </body>
      </html>
    </StoryblokProvider>
  )
}
