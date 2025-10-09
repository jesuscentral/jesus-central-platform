"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { createPayment } from "@/features/mollie";
import { SbDonation } from "@storyblok/types/287435740670216/storyblok-components";
import { cn } from "@/utils/cn";
import { RichTextRenderer } from "../content/RichTextRenderer";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
type Props = { blok: SbDonation };

// ------ Helpers ------
const stepVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

export default function DonationComponent({ blok }: Props) {
  const searchParams = useSearchParams();
  const description = searchParams.get("description");

  const [step, setStep] = React.useState<1 | 2>(1);

  // step 1
  const [amount, setAmount] = React.useState<number | "">(25);
  const [note, setNote] = React.useState<string>(description ?? "");
  const [recurring, setRecurring] = React.useState<"oneTime" | "monthly">(
    blok.defaultFrequency as "oneTime" | "monthly"
  );

  // step 2 (billingAddress)
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const amounts = blok.options?.length
    ? blok.options?.map(Number)
    : [10, 25, 50, 100];

  function isValidStep1() {
    return typeof amount === "number" && amount > 0;
  }

  function isValidStep2() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.trim() && email.trim() && emailRegex.test(email);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidStep2()) return;

    try {
      setLoading(true);
      setError(null);

      const redirectUrl: string = await createPayment(
        amount.toString(),
        recurring === "monthly",
        note,
        name,
        email,
        "NL"
      );

      // If your createPayment returns a url, redirect to it
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        // fallback: maybe your API already redirects server-side
        setLoading(false);
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis bij het starten van de betaling."
      );
    }
  }

  const field = `block w-full rounded-xl border border-neutral-200 bg-white/90 px-4 py-3 text-[15px] leading-tight placeholder-neutral-400 focus:outline-none focus:ring-2  border-${blok.primaryColor} text-${blok.textColor} focus:ring-${blok.primaryColor} focus:border-${blok.primaryColor} `;

  const pillBase =
    "inline-flex items-center justify-center rounded-full border text-sm px-3 py-2 transition active:scale-[.98]";

  const label = "text-xs font-medium uppercase tracking-wide text-neutral-500";
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className="relative isolate"
      id="donation-form"
      aria-label="Donatieformulier"
    >
      <div
        className={`mx-auto w-full max-w-xl rounded-3xl border border-black/5 bg-freedom p-5 shadow-xl ring-1 ring-black/5 sm:p-6 bg-${blok.backgroundColor}`}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between space-x-8">
          <div>
            <div className="hidden select-none sm:block">
              <div className="h-2 w-20 rounded-full bg-black/10">
                <div
                  className={`h-2 rounded-full bg-strategy-red transition-all bg-${blok.primaryColor}`}
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
              <p
                className={`mt-1 text-[10px] text-neutral-500 uppercase text-${blok.textColor}`}
              >
                Stap {step}/2
              </p>
            </div>
            <h2
              className={`text-2xl font-bold tracking-tight text-boldness text-${blok.textColor}`}
            >
              {blok.title ?? "Help ons om levens te bereiken"}
            </h2>
            <p
              className={`mt-1 text-sm text-neutral-600 text-${blok.textColor}`}
            >
              {blok.description && (
                <RichTextRenderer
                  document={blok.description}
                  className={cn(`text-${blok.textColor}`)}
                />
              )}
            </p>
          </div>

          <div className="hidden select-none sm:block">
            <Image
              src="/anbi.jpg"
              alt="Anbi"
              width={150}
              height={150}
              className="m-2 rounded-md"
            />
          </div>
        </div>

        {/* Card body */}
        <form onSubmit={onSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                {/* Amount buttons */}
                <div>
                  <p className={label}>Kies bedrag</p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {amounts.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAmount(v)}
                        className={`${pillBase} ${
                          amount === v
                            ? `bg-${blok.primaryColor} border-${blok.primaryColor} text-${blok.textColor} cursor-default`
                            : "border-black/10 bg-white text-black hover:border-black/20 hover:cursor-pointer"
                        }`}
                        aria-pressed={amount === v}
                      >
                        € {v}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div
                    className={`mt-3 flex items-center gap-2 text-${blok.textColor}`}
                  >
                    <span className="text-sm">of</span>
                    <label className="sr-only" htmlFor="custom-amount">
                      Ander bedrag
                    </label>
                    <input
                      id="custom-amount"
                      inputMode="decimal"
                      pattern="[0-9]*"
                      className={`${field} max-w-[180px]`}
                      placeholder="Ander bedrag"
                      value={amount === "" ? "" : amount}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d]/g, "");
                        setAmount(v ? Number(v) : "");
                      }}
                    />
                  </div>
                </div>

                {/* Description presets */}
                <div>
                  <p className={label}>Bestemming (vul omschrijving in)</p>
                  <label className="sr-only" htmlFor="note">
                    Omschrijving
                  </label>
                  <input
                    id="note"
                    className={`${field} mt-3`}
                    placeholder="Omschrijving"
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                </div>

                {/* Recurring toggle */}
                <div>
                  <p className={label}>Frequentie</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRecurring("oneTime")}
                      className={`${pillBase} ${
                        recurring === "oneTime"
                          ? `border-${blok.primaryColor} bg-${blok.primaryColor} text-white cursor-default`
                          : "border-black/10 bg-white text-black hover:border-black/20 hover:cursor-pointer"
                      }`}
                    >
                      Eenmalig
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecurring("monthly")}
                      className={`${pillBase} ${
                        recurring === "monthly"
                          ? `border-${blok.primaryColor} bg-${blok.primaryColor} text-white cursor-default`
                          : "border-black/10 bg-white text-black hover:border-black/20 hover:cursor-pointer"
                      }`}
                    >
                      Maandelijks
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!isValidStep1()}
                    className={`w-full rounded-2xl bg-${blok.primaryColor} px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer disabled:bg-${blok.primaryColor}/50`}
                  >
                    Volgende stap
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="space-y-3">
                  <div>
                    <label className={label} htmlFor="name">
                      Naam
                    </label>
                    <input
                      id="name"
                      className={field}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={field}
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex gap-2 pt-1 flex-wrap md:flex-nowrap">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`cursor-pointer w-1/3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base font-medium text-black hover:bg-neutral-50 bg-${blok.primaryColor} border-${blok.primaryColor} text-${blok.textColor} w-full`}
                  >
                    Terug
                  </button>
                  <button
                    type="submit"
                    disabled={!isValidStep2() || loading}
                    className={`cursor-pointer w-2/3 rounded-2xl bg-${blok.primaryColor} px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 w-full`}
                  >
                    {loading
                      ? "Bezig…"
                      : `Geef ${recurring === "monthly" ? "maandelijks" : "éénmalig"} € ${amount || 0}`}
                  </button>
                </div>

                {/* Legal hint */}
                <p
                  className={`pt-1 text-[11px] text-neutral-500 text-${blok.textColor}`}
                >
                  Door te geven ga je akkoord met verwerking van je gegevens
                  t.b.v. de betaling via Mollie.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
