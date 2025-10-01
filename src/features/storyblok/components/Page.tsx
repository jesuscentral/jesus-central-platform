import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import React from "react";
import { SbPage } from "@storyblok/types/287325821225947/storyblok-components";
import Image from "next/image";
import Link from "next/link";
import CinematicMenu from "@/components/ui/organisms/CinematicMenu";

interface PageProps {
  blok: SbPage;
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={blok.logo?.filename ?? ""}
              alt={blok.logo?.alt ?? ""}
              width={200}
              height={60}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="hidden md:flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
          {blok.cta &&
            blok.cta.map((cta) => (
              <StoryblokServerComponent key={cta._uid} blok={cta} />
            ))}
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
