import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
        <p className="text-sm text-white/70">
          © {currentYear} Stichting Gods Original Design Gouda
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link
            className="underline-offset-4 hover:underline"
            href="https://jesuscentral.church"
          >
            jesuscentral.church
          </Link>
          <span className="text-white/30">•</span>
          <Link
            className="underline-offset-4 hover:underline"
            href="mailto:church@jesuscentral.nl"
          >
            church@jesuscentral.nl
          </Link>
        </div>
      </div>
    </footer>
  );
}
