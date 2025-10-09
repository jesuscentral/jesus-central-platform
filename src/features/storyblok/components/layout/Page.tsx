import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import React from "react";
import { SbPage } from "@storyblok/types/287435740670216/storyblok-components";

interface PageProps {
  blok: SbPage & {
    body: SbBlokData[];
  };
}

const Page: React.FunctionComponent<PageProps> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)}>
      <main>
        {blok.body?.map((nestedBlok: SbBlokData) => (
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
