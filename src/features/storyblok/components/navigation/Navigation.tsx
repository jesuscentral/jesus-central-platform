"use client";

import Image from "next/image";
import Link from "next/link";
import CinematicMenu from "@/components/ui/organisms/CinematicMenu";
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { SbWebsiteConfig } from "@storyblok/types/287435740670216/storyblok-components";

interface NavigationProps {
  config: SbWebsiteConfig;
}

export default function Navigation({ config }: NavigationProps) {
  if (!config) {
    return null;
  }

  const { logo, header_cta_buttons } = config;

  return (
    <nav
      {...storyblokEditable(config as SbBlokData)}
      className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:py-6"
    >
      <div className="flex items-center">
        <Link href={"/"} className="block">
          <Image
            src={logo?.filename ?? ""}
            alt={logo?.alt || ""}
            width={200}
            height={60}
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
        {config.show_menu && (
          <CinematicMenu
            menu_data={config.menu_data}
            social_links={config.social_links}
          />
        )}
      </div>

      {/* Mobile Menu Button */}
      {config.show_menu && (
        <div className="flex md:hidden items-center">
          <CinematicMenu
            menu_data={config.menu_data}
            social_links={config.social_links}
          />
        </div>
      )}
    </nav>
  );
}
