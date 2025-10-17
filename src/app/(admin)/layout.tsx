import localFont from "next/font/local";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { nlNL } from "@clerk/localizations";

const headingFont = localFont({
  src: "../../assets/fonts/TGSPerfectCondensed.otf",
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = localFont({
  src: "./../../assets/fonts/FiraSans-Regular.ttf",
  variable: "--font-body",
  display: "swap",
});

export default async function MijnJesusCentralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={nlNL}>
      <html lang="nl">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body
          className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
        >
          <div className="relative z-10 flex h-full flex-col">
            <div className="min-h-screen bg-black text-white">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
