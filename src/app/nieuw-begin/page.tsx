"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Heading } from "@/components/ui/atoms/Heading";
import Button from "@/components/ui/atoms/Button";
import FloatingImage from "@/components/ui/organisms/FloatingImage";

// Full Screen Section Component with stunning scroll animations
const FullSection = ({
  children,
  className = "",
  bgImage,
  bgVideo,
  overlay = "gradient",
  nextSectionDark = true,
  id,
  nextSectionId,
}: {
  id?: string;
  nextSectionId?: string;
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgVideo?: string;
  overlay?: "gradient" | "dark" | "light" | "none";
  nextSectionDark?: boolean;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax with more dramatic movement
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Content scroll away animations - fades and scales out dramatically
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.8, 1, 1, 0.85]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [100, 0, 0, -80]
  );

  // Background zoom and blur effect when scrolling away
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.3]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 0, 8]);

  const overlayClasses = {
    gradient: "bg-gradient-to-b from-black/80 via-black/60 to-black/80",
    dark: "bg-black/70",
    light: "bg-black/40",
    none: "",
  };

  const handleScrollToNext = () => {
    if (nextSectionId) {
      const nextSection = document.getElementById(nextSectionId);
      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section
      ref={ref}
      id={id || ""}
      className={`relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background with enhanced parallax and blur */}
      {(bgImage || bgVideo) && (
        <motion.div
          style={{
            y,
            scale: bgScale,
            filter: `blur(${bgBlur}px)`,
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {bgVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={bgVideo} type="video/mp4" />
            </video>
          ) : bgImage ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundAttachment: "fixed",
              }}
            />
          ) : null}
          <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

          {/* Smooth blend to next section */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-32 ${
              nextSectionDark
                ? "bg-gradient-to-b from-transparent to-black/50"
                : "bg-gradient-to-b from-transparent to-white/20"
            }`}
          />
        </motion.div>
      )}

      {/* Content with stunning scroll away animations */}
      <motion.div
        style={{
          opacity: contentOpacity,
          scale: contentScale,
          y: contentY,
        }}
        className="relative z-10 w-full px-4 sm:px-6 will-change-transform will-change-opacity"
      >
        {children}
      </motion.div>

      {/* Pulsing scroll down arrow */}
      {nextSectionId && (
        <motion.button
          onClick={handleScrollToNext}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Pulsing ring effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-cream/50"
            />
            <div className="relative bg-cream/10 backdrop-blur-sm rounded-full p-3 md:p-4 border border-cream/30 group-hover:bg-cream/20 transition-colors">
              <ChevronDown
                className="w-6 h-6 md:w-8 md:h-8 text-cream"
                strokeWidth={2.5}
              />
            </div>
          </motion.div>
        </motion.button>
      )}
    </section>
  );
};

// Animated Text Reveal with smooth stagger and scroll away
const TextReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Stunning Floating Image Component with 3D effects

export default function NieuwBeginPage() {
  const handleScrollToJourney = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const journeySection = document.getElementById("journey");
    if (journeySection) {
      journeySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-black text-cream overflow-x-hidden antialiased scroll-smooth">
      {/* Hero Section */}
      <FullSection
        bgVideo="https://jesuscentral.nl/videoclip-short.mp4"
        overlay="gradient"
        nextSectionId="journey"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 md:mb-12 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(116, 110, 6, 0.7)",
                    "0 0 40px rgba(116, 110, 6, 0.5)",
                    "0 0 20px rgba(116, 110, 6, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-3xl"
              >
                <Image
                  src="/logo-groen.png"
                  alt="Jesus Central Church"
                  width={100}
                  height={100}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-3xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <TextReveal delay={0.4}>
            <Heading
              variant="h1"
              className="text-cream mb-4 md:mb-6 text-5xl md:text-7xl lg:text-8xl"
            >
              Een Nieuw
              <br />
              Begin
            </Heading>
          </TextReveal>

          <TextReveal delay={0.6}>
            <p className="text-lg md:text-2xl lg:text-3xl text-cream/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Welkom in jouw nieuwe leven met Jezus
            </p>
          </TextReveal>

          <TextReveal delay={0.8}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleScrollToJourney}
                variant="primary"
                size="large"
              >
                Begin je reis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </TextReveal>
        </div>
      </FullSection>

      {/* Journey Intro */}
      <FullSection
        id="journey"
        bgImage="/og-image.png"
        overlay="dark"
        nextSectionId="baptism"
      >
        <div className="max-w-4xl mx-auto text-center">
          <TextReveal>
            <Heading
              variant="h1"
              className="text-cream mb-6 md:mb-8 text-4xl md:text-6xl lg:text-7xl"
            >
              Jouw Reis
              <br />
              Is Net Begonnen
            </Heading>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="text-base md:text-xl lg:text-2xl text-cream/90 leading-relaxed font-body max-w-2xl mx-auto">
              Het besluit om Jezus te volgen is het belangrijkste besluit van je
              leven. We zijn hier om je te helpen bij de volgende stappen in
              jouw geloofsreis.
            </p>
          </TextReveal>
        </div>
      </FullSection>

      {/* Baptism in Water */}
      <FullSection
        id="baptism"
        bgImage="/og-image.png"
        overlay="gradient"
        nextSectionId="holy-spirit"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <TextReveal>
              <div className="space-y-4 md:space-y-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-brand-green to-transparent"
                />
                <Heading
                  variant="h2"
                  className="text-cream text-3xl md:text-5xl lg:text-6xl"
                >
                  Water
                  <br />
                  Doop
                </Heading>
                <p className="text-base md:text-lg lg:text-xl text-cream/90 font-body leading-relaxed">
                  De doop is een krachtig symbool van jouw nieuwe leven in
                  Christus. Het oude leven wordt begraven en je komt op uit het
                  water als een nieuw schepsel in Hem.
                </p>
                <motion.blockquote
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-cream/80 font-body italic text-sm md:text-base lg:text-lg border-l-2 border-brand-green pl-4 py-2"
                >
                  &quot;Wie gelooft en gedoopt wordt, zal behouden worden.&quot;
                  <br />
                  <span className="text-xs md:text-sm not-italic opacity-70">
                    — Marcus 16:16
                  </span>
                </motion.blockquote>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-2"
                >
                  <Button variant="outline" size="large">
                    Aanmelden voor Doop
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              </div>
            </TextReveal>

            <FloatingImage
              src="/og-image.png"
              alt="Baptism"
              side="right"
              delay={0.2}
            />
          </div>
        </div>
      </FullSection>

      {/* Holy Spirit */}
      <FullSection
        id="holy-spirit"
        bgImage="/og-image.png"
        overlay="gradient"
        nextSectionId="alpha"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <FloatingImage
                src="/og-image.png"
                alt="Holy Spirit"
                side="left"
                delay={0.1}
              />
            </div>

            <TextReveal delay={0.2}>
              <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-brand-green to-transparent"
                />
                <Heading
                  variant="h2"
                  className="text-cream text-3xl md:text-5xl lg:text-6xl"
                >
                  Doop in de
                  <br />
                  Heilige Geest
                </Heading>
                <p className="text-base md:text-lg lg:text-xl text-cream/90 font-body leading-relaxed">
                  De doop in de Heilige Geest is Gods kracht die in je komt
                  wonen. Het geeft je de kracht om te leven zoals Jezus wil en
                  om Zijn liefde met anderen te delen.
                </p>
                <motion.blockquote
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-cream/80 font-body italic text-sm md:text-base lg:text-lg border-l-2 border-brand-green pl-4 py-2"
                >
                  &quot;Jullie zullen kracht ontvangen wanneer de Heilige Geest
                  over jullie komt.&quot;
                  <br />
                  <span className="text-xs md:text-sm not-italic opacity-70">
                    — Handelingen 1:8
                  </span>
                </motion.blockquote>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-2"
                >
                  <Button variant="outline" size="large">
                    Meer over de Heilige Geest
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              </div>
            </TextReveal>
          </div>
        </div>
      </FullSection>

      {/* Alpha Course */}
      <FullSection
        id="alpha"
        bgImage="/og-image.png"
        overlay="gradient"
        nextSectionId="training"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingImage
              src="/og-image.png"
              alt="Alpha Course"
              side="right"
              delay={0}
            />
          </motion.div>

          <TextReveal delay={0.2}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-brand-green to-transparent mx-auto mb-6"
            />
            <Heading
              variant="h2"
              className="text-cream mb-6 text-4xl md:text-5xl lg:text-6xl"
            >
              Alpha
            </Heading>
            <p className="text-base md:text-xl lg:text-2xl text-cream/90 mb-8 font-body leading-relaxed max-w-2xl mx-auto">
              Ontdek de basisprincipes van het christelijk geloof in een
              ontspannen sfeer met eten, discussie en vriendschap.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" size="large" className="shadow-2xl">
                Schrijf je in voor Alpha
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </motion.div>
          </TextReveal>
        </div>
      </FullSection>

      {/* Training School */}
      <FullSection
        id="training"
        bgImage="/og-image.png"
        overlay="gradient"
        nextSectionId="lifegroups"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <TextReveal>
              <div className="space-y-4 md:space-y-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-brand-green to-transparent"
                />
                <Heading
                  variant="h2"
                  className="text-cream text-3xl md:text-5xl lg:text-6xl"
                >
                  Jesus Central
                  <br />
                  Training School
                </Heading>
                <p className="text-base md:text-lg lg:text-xl text-cream/90 font-body leading-relaxed">
                  Verdiep je geloof en ontwikkel je gaven in onze training
                  school. Leer hoe je Gods stem kunt horen en Hem kunt dienen.
                </p>
                <p className="text-sm md:text-base text-cream/70 font-body">
                  Een intensieve tijd van groei, training en toerusting voor je
                  dienst aan God.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-2"
                >
                  <Button variant="outline" size="large">
                    Ontdek de Training School
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              </div>
            </TextReveal>

            <FloatingImage
              src="/og-image.png"
              alt="Training School"
              side="right"
              delay={0.2}
            />
          </div>
        </div>
      </FullSection>

      {/* Lifegroups */}
      <FullSection
        id="lifegroups"
        bgImage="/og-image.png"
        overlay="gradient"
        nextSectionId="welcome"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <FloatingImage
                src="/og-image.png"
                alt="Lifegroups"
                side="left"
                delay={0.1}
              />
            </div>

            <TextReveal delay={0.2}>
              <div className="order-1 md:order-2 space-y-4 md:space-y-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-brand-green to-transparent"
                />
                <Heading
                  variant="h2"
                  className="text-cream text-3xl md:text-5xl lg:text-6xl"
                >
                  Life
                  <br />
                  Groups
                </Heading>
                <p className="text-base md:text-lg lg:text-xl text-cream/90 font-body leading-relaxed">
                  Word onderdeel van een kleinere gemeenschap waar je diepere
                  vriendschappen bouwt en samen groeit in geloof.
                </p>
                <p className="text-sm md:text-base text-cream/70 font-body">
                  Echte verbinding, authentieke gesprekken, en samen op weg naar
                  Jezus.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-2"
                >
                  <Button variant="outline" size="large">
                    Vind een Lifegroup
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              </div>
            </TextReveal>
          </div>
        </div>
      </FullSection>

      {/* Final CTA */}
      <FullSection id="welcome" bgImage="/og-image.png" overlay="dark">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-brand-green via-brand-green to-transparent mx-auto mb-8"
            />
            <Heading
              variant="h1"
              className="text-cream mb-6 md:mb-8 text-5xl md:text-7xl lg:text-8xl"
            >
              Je Bent
              <br />
              Welkom
            </Heading>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="text-base md:text-2xl lg:text-3xl text-cream/90 mb-10 md:mb-12 font-body leading-relaxed max-w-3xl mx-auto">
              We staan klaar om je te ondersteunen bij elke stap van je nieuwe
              reis. Je hoeft dit niet alleen te doen — we zijn hier voor jou.
            </p>
          </TextReveal>

          <TextReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="large"
                  className="shadow-2xl w-full sm:w-auto"
                >
                  Neem Contact Op
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="large"
                  className="w-full sm:w-auto"
                >
                  WhatsApp Ons
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
            </div>
          </TextReveal>

          <TextReveal delay={0.6}>
            <motion.div
              className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-cream/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(116, 110, 6, 0.3)",
                    "0 0 30px rgba(116, 110, 6, 0.5)",
                    "0 0 20px rgba(116, 110, 6, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block rounded-3xl"
              >
                <Image
                  src="/logo-groen.png"
                  alt="Jesus Central Church"
                  width={100}
                  height={100}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-3xl"
                />
              </motion.div>
            </motion.div>
          </TextReveal>
        </div>
      </FullSection>
    </div>
  );
}
