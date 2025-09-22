"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <dt className="text-sm uppercase tracking-wider text-white/70">
        {label}
      </dt>
      <dd className="text-base">{value}</dd>
    </div>
  );
}

export default function PracticalInfoSection() {
  const infoItems: InfoItemProps[] = [
    { label: "Adres", value: "Rijsselseweg 1, Gouda" },
    { label: "Zondagse samenkomst", value: "09:30" },
    {
      label: "Kinderkerk",
      value: "Elke zondag voor 0–12 jaar met eigen groepen.",
    },
    {
      label: "Vertaling",
      value: "Engels, meld je hiervoor bij het welkomsteam.",
    },
  ];

  return (
    <section className="bg-bold-dark">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">Praktische info</h3>
            <dl className="mt-6 space-y-4 text-white/90">
              {infoItems.map((item, index) => (
                <InfoItem key={index} label={item.label} value={item.value} />
              ))}
            </dl>
            <Link
              href="https://godcentregouda.nl"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-black shadow-md ring-1 ring-black/10 transition hover:brightness-95"
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
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInVariants}
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
  );
}
