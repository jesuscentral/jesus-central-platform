import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import React from "react";
import { SbPage } from "@storyblok/types/287325821225947/storyblok-components";

interface PageProps {
  blok: SbPage;
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  return (
    <main {...storyblokEditable(blok as SbBlokData)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page;
