import localFont from 'next/font/local'
import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { nlNL } from '@clerk/localizations'
import { AdminNav } from '@/components/admin/AdminNav'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { getConfig } from '@/lib/actions/config'

const headingFont = localFont({
  src: '../../assets/fonts/TGSPerfectCondensed.otf',
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = localFont({
  src: './../../assets/fonts/FiraSans-Regular.ttf',
  variable: '--font-body',
  display: 'swap',
})

export default async function MijnJesusCentralLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const config = await getConfig()

  if (!config || config?.auth === false) {
    return notFound()
  }

  const clerkUser = await currentUser()

  if (
    clerkUser?.emailAddresses.some((email) =>
      email.emailAddress.includes('jesuscentral.nl'),
    )
  ) {
    ;(await clerkClient()).users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        canEditEvents: true,
        canRequestAnnouncement: true,
      },
    })
  }

  const showAgenda = clerkUser?.publicMetadata?.canEditEvents === true
  const showAnnouncements =
    clerkUser?.publicMetadata?.canRequestAnnouncement === true
  return (
    <ClerkProvider localization={nlNL}>
      <html lang="nl">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body
          className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
        >
          <div className="bg-freedom text-boldness">
            <AdminNav
              showAgenda={showAgenda}
              showAnnouncements={showAnnouncements}
            />
            <div className="container mx-auto min-h-screen px-8 py-6">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
