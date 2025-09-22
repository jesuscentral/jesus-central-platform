import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Link from "next/link";
import Image from "next/image";

const headingFont = localFont({
  src: "../../../assets/fonts/TGSPerfectCondensed.otf",
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = localFont({
  src: "../../../assets/fonts/FiraSans-Regular.ttf",
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
          <div className="relative z-10 flex h-full flex-col">
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Jesus Central Church"
                  width={200}
                  height={60}
                  priority
                  className="h-10 w-auto"
                />
              </div>
              <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
                <a
                  href="#visie"
                  className="hidden rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 sm:inline-flex"
                >
                  Missie & Visie
                </a>
                <Link
                  href="https://godcentregouda.nl"
                  className="hidden group md:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-black shadow-lg shadow-black/20 transition hover:brightness-95 sm:text-sm"
                >
                  Ga naar website
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </nav>
            <div>{children}</div>
          </div>
        </body>
      </html>
    </StoryblokProvider>
  );
}
