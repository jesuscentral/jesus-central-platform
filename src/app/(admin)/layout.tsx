import localFont from "next/font/local";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { nlNL } from "@clerk/localizations";
import { AdminNav } from "@/components/admin/AdminNav";
import { currentUser } from "@clerk/nextjs/server";

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
  const clerkUser = await currentUser();

  const showAgenda = clerkUser?.publicMetadata?.canEditEvents === true;
  return (
    <ClerkProvider localization={nlNL}>
      <html lang="nl">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body
          className={`antialiased ${bodyFont.variable} ${headingFont.variable}`}
        >
          <div className="bg-freedom text-boldness">
            <AdminNav showAgenda={showAgenda} />
            <div className="min-h-screen py-6">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
