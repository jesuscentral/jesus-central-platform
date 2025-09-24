"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Loader2, ChevronDown } from "lucide-react";
import { SbDonation } from "@storyblok/types/287325821225947/storyblok-components";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import { RichTextRenderer } from "./RichTextRenderer";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { cn } from "@/utils/cn";

export default function JccGive({ blok }: { blok: SbDonation }) {
  const funds =
    blok.funds?.tbody.map((f) => ({
      value: f.body[0].value,
      label: f.body[1].value,
    })) || [];

  //   const funds = [{ value: "general", label: "Algemeen fonds" }];
  const preselectedAmount = parseInt(blok.preselected || "25");
  const presets = blok.options.map((o) => parseInt(o));

  const [amount, setAmount] = useState<number>(preselectedAmount);
  const [frequency, setFrequency] = useState<"once" | "monthly">(
    blok.defaultFrequency || "once"
  );
  const [fund, setFund] = useState<string>(funds[0]?.value || "general");
  const [note, setNote] = useState<string>("");
  const [method, setMethod] = useState<"ideal">("ideal");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload: GivePayload = { amount, frequency, fund, note, method };
      await alert(JSON.stringify(payload));
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis. Probeer het opnieuw."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const AmountButton = ({ value }: { value: number }) => (
    <button
      type="button"
      onClick={() => setAmount(value)}
      className={`rounded-xl border px-4 py-2 text-sm transition-all cursor-pointer
        ${
          amount === value
            ? `border-${blok.primaryColor} bg-${blok.primaryColor} text-${blok.textColor} shadow`
            : "border-white/10 bg-white/5 text-white hover:border-white/20"
        }`}
    >
      € {value}
    </button>
  );

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      data-sb-object="donation"
      className={cn(
        "relative isolate overflow-hidden border border-white/10 bg-bold-dark p-6 sm:p-10 shadow-2xl",
        `bg-${blok.backgroundColor}`,
        `text-${blok.textColor}`
      )}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: Copy & Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-brand-black">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <p
              className={cn(
                "tracking-wide text-cream/80",
                `text-${blok.textColor}`
              )}
            >
              {blok.subtitle}
            </p>
          </div>
          <h2
            className={cn(
              "text-4xl leading-[1.05] tracking-wide text-cream sm:text-5xl",
              `text-${blok.textColor}`
            )}
          >
            {blok.title}
          </h2>
          <RichTextRenderer
            document={blok.description!}
            className={cn(`text-${blok.textColor}`)}
          />

          {/* Trust badges */}
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {blok.badges?.map((b) => (
              <StoryblokServerComponent key={b._uid} blok={b as SbBlokData} />
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-bold-dark p-5 backdrop-blur-sm sm:p-6"
        >
          {/* Frequency toggle */}
          <div className="grid grid-cols-2 gap-2">
            {(["once", "monthly"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFrequency(key)}
                className={`rounded-xl px-4 py-2 text-sm uppercase tracking-wide transition-all cursor-pointer
                  ${
                    frequency === key
                      ? `bg-${blok.primaryColor} text-bold-dark shadow`
                      : "bg-transparent text-cream hover:bg-white/10"
                  }`}
              >
                {key === "once" ? "Eenmalig" : "Maandelijks"}
              </button>
            ))}
          </div>

          {/* Amount presets */}
          <div className="mt-5 flex flex-wrap gap-2">
            {presets.map((p) => (
              <AmountButton key={p} value={p} />
            ))}
          </div>

          {/* Custom amount */}
          <label className="mt-5 block text-xs uppercase tracking-wider text-cream/60">
            Bedrag
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-bold-dark px-3 py-2 text-cream focus-within:border-herstel">
            <span className="pr-2 text-cream/60">€</span>
            <input
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent outline-none placeholder:text-cream/40"
              placeholder="Bijv. 25"
              required
            />
          </div>

          {/* Fund select */}
          <label className="mt-5 block text-xs uppercase tracking-wider text-cream/60">
            Bestemming
          </label>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setIsOpen((s) => !s)}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-bold-dark px-3 py-3 text-left text-cream transition-colors hover:border-white/20"
            >
              <span className="truncate">
                {funds.find((f) => f.value === fund)?.label ?? "Kies fonds"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-bold-dark shadow-xl"
                >
                  {funds.map((opt) => (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setFund(opt.value);
                          setIsOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm text-cream hover:bg-white/10 ${
                          fund === opt.value ? "bg-white/10" : ""
                        }`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Note */}
          <label className="mt-5 block text-xs uppercase tracking-wider text-cream/60">
            Opmerking (optioneel)
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-bold-dark p-3 text-cream placeholder:text-cream/40 focus:border-herstel focus:outline-none"
            placeholder="Bijv. dankoffer, belofte, specifieke actie..."
          />

          {/* Payment method */}
          <label className="mt-5 block text-xs uppercase tracking-wider text-cream/60">
            Betaalmethode
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {([{ key: "ideal", label: "iDEAL" }] as const).map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMethod(m.key)}
                className={`rounded-xl border px-3 py-2 text-sm transition-all ${
                  method === m.key
                    ? `border-${blok.primaryColor} bg-${blok.primaryColor} text-bold-dark shadow`
                    : "border-white/10 bg-bold-dark text-cream hover:border-white/20"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold tracking-wide text-white shadow-lg transition-transform hover:scale-[1.01] hover:shadow-xl disabled:opacity-60",
                `bg-${blok.secondaryColor}`,
                `text-${blok.textColor}`
              )}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Verwerken...
                </>
              ) : (
                <>
                  Doneren € {amount}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </>
              )}
            </button>
            <p className="mt-2 text-center text-xs text-cream/60">
              Je gift ondersteunt onze missie. Dankjewel!
            </p>
          </div>

          {/* Error / Success */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100"
              >
                <p className="text-sm font-medium">Bedankt voor je gift! 💛</p>
                <p className="text-xs text-emerald-200/90">
                  We hebben je donatie ontvangen. Je ontvangt per e-mail een
                  bevestiging.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>

      {/* Bottom mini impact bar */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { k: "Herstel", d: "Pastoraat, CARE & noodhulp" },
          { k: "Training", d: "Bijbelschool & discipelschap" },
          { k: "Zending", d: "Outreach, kerken & missies" },
        ].map((item) => (
          <div
            key={item.k}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <p className="text-cream">{item.k}</p>
            <p className="text-xs text-cream/70">{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export type GivePayload = {
  amount: number; // in EUR
  frequency: "once" | "monthly";
  fund: string;
  note?: string;
  method: "ideal" | "bancontact" | "card";
};
