import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";

const headingFont = localFont({
  src: "../../assets/fonts/TGSPerfectCondensed.otf",
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = localFont({
  src: "../../assets/fonts/FiraSans-Regular.ttf",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body
          className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
        >
          {children}
        </body>
      </html>
    </StoryblokProvider>
  );
}
