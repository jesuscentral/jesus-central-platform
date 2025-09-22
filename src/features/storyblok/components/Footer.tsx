"use client";

import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { SbFooter } from "@storyblok/types/287325821225947/storyblok-components";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  blok: SbFooter;
}

export default function Footer({ blok }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <>
      <section className="bg-bold-dark">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold">{blok.title}</h3>
              <dl className="mt-6 space-y-4 text-white/90">
                {blok.information?.map((item) => (
                  <StoryblokServerComponent key={item._uid} blok={item} />
                ))}
              </dl>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <Image
                alt={blok.image.alt!}
                className="h-full w-full object-cover"
                src={blok.image.filename!}
                width={600}
                height={400}
              />
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
          <p className="text-sm text-white/70">
            © {currentYear} {blok.copyright}
          </p>
          <div className="flex items-center gap-4 text-sm">
            {blok.links?.map((link, index) => (
              <div className="flex items-center gap-4 text-sm" key={link._uid}>
                <StoryblokServerComponent key={link._uid} blok={link} />
                {index + 1 !== blok.links?.length && (
                  <span className="text-white/30">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
