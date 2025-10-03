import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import React from "react";
import { SbPage } from "@storyblok/types/287435740670216/storyblok-components";
import Image from "next/image";
import Link from "next/link";
import CinematicMenu from "@/components/ui/organisms/CinematicMenu";

interface PageProps {
  blok: SbPage;
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:py-6">
        <div className="flex items-center">
          <Link href="/" className="block">
            <Image
              src={blok.logo?.filename ?? ""}
              alt={blok.logo?.alt ?? ""}
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
          {blok.cta &&
            blok.cta.map((cta) => (
              <StoryblokServerComponent key={cta._uid} blok={cta} />
            ))}
          <CinematicMenu />
        </div>
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <CinematicMenu />
        </div>
      </nav>
      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {blok?.global_footer &&
        (blok.global_footer as unknown as SbBlokData[]).map((global, index) => (
          <StoryblokServerComponent blok={global.content} key={index} />
        ))}
    </div>
  );
};

export default Page;
