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

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(22, 22, 21, 0)", "rgba(22, 22, 21, 0.95)"]
  );

  const backdropBlur = useTransform(scrollY, [0, 50], [0, 12]);

  if (!config) {
    return null;
  }

  const { logo, header_cta_buttons } = config;

  return (
    <>
      <motion.nav
        {...storyblokEditable(config as SbBlokData)}
        style={{
          backgroundColor,
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled && "shadow-lg backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:py-6">
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
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100]">
          <CinematicMenu
            menu_data={config.menu_data}
            social_links={config.social_links}
          />
        </div>
      )}
    </>
  );
}
