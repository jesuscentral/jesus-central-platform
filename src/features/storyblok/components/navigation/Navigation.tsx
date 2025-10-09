"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import CinematicMenu from "@/components/ui/organisms/CinematicMenu";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbWebsiteConfig } from "@storyblok/types/287435740670216/storyblok-components";
import { cn } from "@/utils/cn";

interface NavigationProps {
  config: SbWebsiteConfig;
}

export default function Navigation({ config }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Check initial scroll position on mount
  useEffect(() => {
    // Check if already scrolled on initial load
    const initialScrollY = window.scrollY;
    if (initialScrollY > 50) {
      setScrolled(true);
    }

    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const navOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navScale = useTransform(scrollY, [0, 50], [0.98, 1]);

  if (!config) {
    return null;
  }

  const { logo, header_cta_buttons } = config;

  return (
    <>
      <motion.nav
        {...storyblokEditable(config as SbBlokData)}
        className={cn(
          "fixed inset-x-0 top-0 z-[9999] transition-shadow duration-300"
        )}
      >
        {/* Animated background that slides down */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
          animate={{
            y: scrolled ? 0 : -100,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Main background with gradient */}
          <motion.div
            className="absolute inset-0 bg-boldness rounded-b-3xl"
            style={{
              opacity: navOpacity,
              scale: navScale,
              backdropFilter: scrolled ? `blur(12px)` : "blur(0px)",
            }}
          />

          {/* Animated accent bar at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-strategy-red to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: scrolled ? 1 : 0,
              opacity: scrolled ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          />
        </motion.div>

        {/* Content layer (above background) */}
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <Link href={"/"} className="block">
              <Image
                src={logo?.filename ?? ""}
                alt={logo?.alt || ""}
                width={logo?.width ?? 200}
                height={logo?.height ?? 60}
                priority
                className="
                h-10 w-auto
                xs:h-12
                sm:h-14
                md:h-16
                lg:h-[60px]
                max-w-[160px] xs:max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[360px]
                transition-all
              "
                sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 240px"
              />
            </Link>
          </div>

          {/* Desktop CTA + Menu */}
          <div className="hidden md:flex items-center gap-4">
            {header_cta_buttons &&
              header_cta_buttons.map((cta) => (
                <StoryblokServerComponent key={cta._uid} blok={cta} />
              ))}
          </div>

          {/* Mobile Menu Button placeholder */}
          <div className="flex md:hidden items-center w-10 h-10"></div>
        </div>
      </motion.nav>

      {/* Menu rendered outside nav to avoid z-index stacking context issues */}
      {config.show_menu && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000]">
          <CinematicMenu
            menu_data={config.menu_data}
            social_links={config.social_links}
          />
        </div>
      )}
    </>
  );
}
