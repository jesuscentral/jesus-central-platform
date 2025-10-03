import { SbBlokData } from "@storyblok/react/rsc";

// Re-export all Storyblok types with consistent naming
export type {
  SbPage,
  SbCard,
  SbButton,
  SbBadge,
  SbBlokHero,
  SbDonation,
  SbFooter,
  SbFullGrid,
  SbGlobal,
  SbGrid,
  SbImage,
  SbImageCard,
  SbImageHero,
  SbInformationItem,
  SbLink,
  SbMap,
  SbPersonCard,
  SbRichText,
  SbScripture,
  SbScriptureReferences,
  SbScrollingText,
  SbSection,
  SbSermonHighlight,
  SbSpotifyEmbed,
  SbStatement,
  SbStatementScripture,
  SbStaticGrid,
  SbTeaser,
  SbVideoHero,
} from "@storyblok/types/287435740670216/storyblok-components";

// Generic prop types
export interface BlokComponentProps<T extends SbBlokData = SbBlokData> {
  blok: T;
}

export interface StoryblokConfig {
  accessToken: string | undefined;
  isPreview: boolean;
  basePath: string;
  baseUrl: string;
  spaceId: string;
  region: "eu" | "us";
}
