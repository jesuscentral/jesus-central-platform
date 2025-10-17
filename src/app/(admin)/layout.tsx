import localFont from "next/font/local";
import "@/app/globals.css";
import { ClerkProvider, SignOutButton } from "@clerk/nextjs";
import { nlNL } from "@clerk/localizations";
import Button from "@/components/ui/atoms/Button";
import Section from "@/components/ui/atoms/Section";
import { LogOutIcon } from "lucide-react";

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
          <div className="bg-freedom text-boldness">
            <div className="min-h-screen">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
