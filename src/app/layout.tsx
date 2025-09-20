import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

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

export const metadata: Metadata = {
  title: "Jesus Central Church",
  description:
    "Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten. We bidden dat dit een plek is waar je God ontmoet en mooie momenten beleeft in Zijn aanwezigheid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:image" content="/worship.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <body
        className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
