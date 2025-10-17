import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import StoryblokProvider from "@/components/StoryblokProvider";
import { getWebsiteConfig } from "@/features/storyblok/utils";
import Footer from "@/features/storyblok/components/navigation/Footer";
import { Navigation } from "@/features/storyblok/components";
import { nlNL } from "@clerk/localizations";

const headingFont = localFont({
  src: "./../../assets/fonts/TGSPerfectCondensed.otf",
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = localFont({
  src: "./../../assets/fonts/FiraSans-Regular.ttf",
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://jesuscentral.church";

export const metadata: Metadata = {
  title: "Jesus Central Church",
  description:
    "Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten. We bidden dat dit een plek is waar je God ontmoet en mooie momenten beleeft in Zijn aanwezigheid.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Jesus Central Church",
    description:
      "Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten.",
    url: siteUrl,
    siteName: "Jesus Central Church",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jesus Central Church",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Central Church",
    description:
      "Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteConfig = await getWebsiteConfig();

  return (
    <ClerkProvider localization={nlNL}>
      <StoryblokProvider>
        <html lang="nl">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <body
            className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
          >
            <Navigation config={websiteConfig?.content} />

            <div className="relative z-10 flex h-full flex-col">
              <div className="min-h-screen bg-black text-white">{children}</div>
            </div>
            <Footer config={websiteConfig?.content} />
          </body>
        </html>
      </StoryblokProvider>
    </ClerkProvider>
  );
}
