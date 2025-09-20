import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    " Een warme familiekerk in Gouda waar we Jezus centraal stellen, Hem aanbidden en elkaar ontmoeten. We bidden dat dit een plek is waar je God ontmoet en mooie momenten beleeft in Zijn aanwezigheid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
