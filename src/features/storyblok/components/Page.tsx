import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
  StoryblokServerStory,
} from "@storyblok/react/rsc";
import React from "react";
import { SbPage } from "@storyblok/types/287325821225947/storyblok-components";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  blok: SbPage;
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  return (
    <>
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={blok.logo.filename!}
              alt={blok.logo.alt!}
              width={200}
              height={60}
              priority
              className="h-6 w-auto"
            />
          </Link>
        </div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
          {blok.cta &&
            blok.cta.map((cta) => (
              <StoryblokServerComponent key={cta._uid} blok={cta} />
            ))}
        </div>
      </nav>
      <main {...storyblokEditable(blok as SbBlokData)}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      {blok?.global_reference &&
        (blok.global_reference as unknown as SbBlokData[]).map(
          (global, index) => (
            <StoryblokServerComponent blok={global.content} key={index} />
          )
        )}
    </>
  );
};

export default Page;
