"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Jesus Central — Landingspagina
 * Framework: React + TailwindCSS (no external CSS needed)
 * Design: modern, cinematic; palette based on brand book (bold #161615, black, white, orange accent)
 * Language: Dutch (NL)
 * CTA: "Ga naar website"
 * Notes:
 *  - Replace the <video> src with your final worship video (MP4, H.264). The layout gracefully degrades to the poster image.
 *  - All images use free Unsplash placeholders; swap with your own assets when ready.
 *  - Tailwind is assumed available in the host project. Fonts can be set globally in your app.
 */

const palette = {
  bold: "#161615", // bold brand tone from brand book
  boldDark: "#0F0F0E",
  black: "#0B0B0B",
  white: "#FFFFFF",
  orange: "#eb3700", // bold accent
  cream: "#EFF3EB",
  strategyGold: "#C89657",
  strategyGreen: "#746e06",
  strategyRed: "#eb3700",
  strategyCharcoal: "#161615",
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Attempt to autoplay muted background video on supported browsers
    const v = videoRef.current;
    if (!v) return;
    const play = async () => {
      try {
        await v.play();
      } catch (_) {
        /* ignore autoplay blocks */
      }
    };
    play();
  }, []);

  return (
    <div
      className="min-h-screen bg-[color:var(--bold)] text-white"
      style={{
        // Expose CSS variables so they are re-usable in inline Tailwind arbitrary values
        // (e.g., bg-[color:var(--bold)])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--bold" as any]: palette.bold,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--bold-dark" as any]: palette.boldDark,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--black" as any]: palette.black,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--orange" as any]: palette.orange,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--cream" as any]: palette.cream,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--strategy-gold" as any]: palette.strategyGold,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--strategy-green" as any]: palette.strategyGreen,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--strategy-red" as any]: palette.strategyRed,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--strategy-charcoal" as any]: palette.strategyCharcoal,
      }}
    >
      {/* HERO / CINEMATIC INTRO */}
      <header className="relative h-[min(100vh,760px)] overflow-hidden">
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1461782466436-79fdb7cfab4d?q=80&w=1600&auto=format&fit=crop"
          // TODO: Replace with your worship video asset URL (MP4)
          src="/videoclip-short.mp4"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[color:var(--bold)]" />

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
              <a
                href="https://godcentregouda.nl"
                className="hidden group md:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--black)] shadow-lg shadow-black/20 transition hover:brightness-95 sm:text-sm"
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
              </a>
            </div>
          </nav>

          <div className="flex flex-1 items-center">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-16 pt-6 sm:gap-8 sm:pb-24">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="max-w-3xl text-pretty text-4xl font-black leading-tight sm:text-6xl"
              >
                Jij bent welkom!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
              >
                Een warme familiekerk in Gouda waar we Jezus centraal stellen,
                Hem aanbidden en elkaar ontmoeten. We bidden dat dit een plek is
                waar je God ontmoet en mooie momenten beleeft in Zijn
                aanwezigheid.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row"
              >
                <a
                  href="https://godcentregouda.nl"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--orange)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--black)] shadow-lg shadow-black/20 transition hover:brightness-110"
                >
                  Ga naar website
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#visie"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                >
                  Leer onze missie kennen
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* MISSIE & VISIE */}
      <section
        id="visie"
        className="relative overflow-hidden bg-[color:var(--strategy-green)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="rounded-full bg-[color:var(--black)]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[color:var(--white)]">
                Missie
              </span>
              <h2 className="mt-4 text-pretty text-3xl font-extrabold sm:text-4xl">
                Jezus volgen en verkondigen in de kracht van de Heilige Geest
              </h2>
              <p className="mt-4 text-white/85">
                Wij bestaan om, in de kracht van de Heilige Geest, Jezus te
                verkondigen in de wereld; zodat mensen zich tot Jezus bekeren,
                eeuwig leven ontvangen en Hem toegewijd navolgen in alle
                facetten van het dagelijks leven.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="rounded-full bg-[color:var(--black)]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[color:var(--white)]">
                Visie
              </span>
              <h2 className="mt-4 text-pretty text-3xl font-extrabold sm:text-4xl">
                Een huis van herstel, training en zending.
              </h2>
              <p className="mt-4 text-white/85">
                We verlangen een kerk te zijn gevormd door volgelingen van
                Jezus, vol van Gods Woord en Geest. Een actief gemeenteleven dat
                mensen bereikt met het Evangelie, herstel brengt in de naam van
                Jezus en toelegt op toewijding en discipelschap.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCHRIFTWOORD */}
      <section className="bg-[color:var(--bold-dark)] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center text-white">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
              Kerntekst
            </span>
            <blockquote className="text-balance text-2xl font-semibold leading-relaxed sm:text-3xl">
              &quot;En Hij klom de berg op en riep bij Zich wie Hij wilde; en
              zij kwamen naar Hem toe. En Hij stelde er twaalf aan om bij Hem te
              zijn, en om hen uit te zenden om te prediken, en macht te hebben
              om de ziekten te genezen en de demonen uit te drijven.&quot;
            </blockquote>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">
              Marcus 3:13-15
            </p>
          </motion.div>
        </div>
      </section>

      {/* ONZE STRATEGIE */}

      <section className="border-y border-white/5 bg-[color:var(--cream)] py-20 text-[color:var(--bold)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <motion.article
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl bg-[color:var(--strategy-gold)] px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)]"
            >
              <h3 className="text-3xl font-extrabold uppercase tracking-wide">
                Huis van herstel
              </h3>
              <p className="mt-4 text-md leading-relaxed text-[color:var(--bold)]/85 font-bold">
                We zijn een huis waar we mensen bij Jezus brengen waardoor ze
                genezing, vergeving en innerlijk herstel ontvangen, zodat zij in
                vrijheid en kracht kunnen leven.
              </p>
            </motion.article>

            <motion.article
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                    delay: 0.08,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl bg-[color:var(--strategy-green)] px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)]"
            >
              <h3 className="text-3xl font-extrabold uppercase tracking-wide">
                Huis van training
              </h3>
              <p className="mt-4 text-md leading-relaxed text-[color:var(--bold)]/85 font-bold">
                In dit huis rusten we mensen toe om als discipelen van Jezus te
                groeien in geloof, karakter en bediening.
              </p>
            </motion.article>

            <motion.article
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                    delay: 0.12,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl bg-[color:var(--strategy-red)] px-8 py-10 text-white shadow-[0_25px_70px_-32px_rgba(17,17,17,0.45)]"
            >
              <h3 className="text-3xl font-extrabold uppercase tracking-wide">
                Huis van zending
              </h3>
              <p className="mt-4 text-md leading-relaxed text-[color:var(--bold)]/85 font-bold">
                Vanuit dit huis zenden wij toegewijde volgelingen uit om het
                evangelie te brengen in onze stad, regio, land en wereldwijd.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* PRAKTISCHE INFO */}
      <section className="bg-[color:var(--bold-dark)]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold">Praktische info</h3>
              <dl className="mt-6 space-y-4 text-white/90">
                <div>
                  <dt className="text-sm uppercase tracking-wider text-white/70">
                    Adres
                  </dt>
                  <dd className="text-base">Rijsselseweg 1, Gouda</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-white/70">
                    Zondagse samenkomst
                  </dt>
                  <dd className="text-base">09:30</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-white/70">
                    Kinderkerk
                  </dt>
                  <dd className="text-base">
                    Elke zondag voor 0–12 jaar met eigen groepen.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-white/70">
                    Vertaling
                  </dt>
                  <dd className="text-base">
                    Engels, meld je hiervoor bij het welkomsteam.
                  </dd>
                </div>
              </dl>
              <a
                href="https://godcentregouda.nl"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--black)] shadow-md ring-1 ring-black/10 transition hover:brightness-95"
              >
                Ga naar website
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <Image
                alt="Jeroen Dorstijn"
                className="h-full w-full object-cover"
                src="/jeroen.jpg"
                width={600}
                height={400}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Jesus Central Church — Gouda
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a
              className="underline-offset-4 hover:underline"
              href="https://jesuscentral.church"
            >
              jesuscentral.church
            </a>
            <span className="text-white/30">•</span>
            <a
              className="underline-offset-4 hover:underline"
              href="mailto:church@jesuscentral.nl"
            >
              church@jesuscentral.nl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
