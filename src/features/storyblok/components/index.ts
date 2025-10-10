// Export all components from their categories
export * from "./layout";
export * from "./heroes";
export * from "./content";
export * from "./cards";
export * from "./navigation";
export * from "./interactive";
export * from "./media";

// Import for component map
import * as Layout from "./layout";
import * as Heroes from "./heroes";
import * as Content from "./content";
import * as Cards from "./cards";
import * as Navigation from "./navigation";
import * as Interactive from "./interactive";
import * as Media from "./media";
import * as Lists from "./lists";

// Create component map for Storyblok initialization
export const componentMap = {
  // Layout
  page: Layout.Page,
  section: Layout.Section,
  grid: Layout.Grid,
  fullGrid: Layout.FullGrid,
  global: Layout.Global,

  // Heroes
  videoHero: Heroes.VideoHero,
  imageHero: Heroes.ImageHero,
  blokHero: Heroes.BlokHero,

  // Content
  richText: Content.RichText,
  scripture: Content.Scripture,
  statement: Content.Statement,
  statementScripture: Content.StatementScripture,
  scriptureReferences: Content.ScriptureReferences,
  scrollingText: Content.ScrollingText,
  teaser: Content.Teaser,
  informationItem: Content.InformationItem,
  sermonHighlight: Content.SermonHighlight,
  faq: Content.Faq,
  faqItem: Content.FaqItem,

  // Cards
  card: Cards.Card,
  imageCard: Cards.ImageCard,
  personCard: Cards.PersonCard,
  livestreamCard: Cards.LiveStreamCard,

  // Navigation
  footer: Navigation.Footer,
  link: Navigation.Link,

  // Interactive
  button: Interactive.Button,
  badge: Interactive.Badge,
  donation: Interactive.Donation,
  map: Interactive.Map,
  animatedMap: Interactive.AnimatedMap,
  filloutForm: Interactive.FilloutForm,

  // Media
  image: Media.Image,
  spotifyEmbed: Media.SpotifyEmbed,

  // Lists
  eventList: Lists.EventList,
} as const;
