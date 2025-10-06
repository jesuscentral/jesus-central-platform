import { Heading } from "@/components/ui/atoms/Heading";
import { cn } from "@/utils/cn";
import { StoryblokRichtext } from "@storyblok/types/storyblok";
import {
  NODE_HEADING,
  NODE_LI,
  NODE_OL,
  NODE_UL,
  render,
} from "storyblok-rich-text-react-renderer";
import Badge from "../interactive/Badge";
import {
  SbBadge,
  SbButton,
  SbCard,
  SbImageCard,
  SbFullGrid,
  SbGrid,
  SbLink,
  SbStaticGrid,
  SbImage,
} from "@storyblok/types/287435740670216/storyblok-components";
import Button from "../interactive/Button";
import Link from "../navigation/Link";
import Grid from "../layout/Grid";
import FullGrid from "../layout/FullGrid";
import StaticGrid from "../layout/StaticGrid";
import Card from "../cards/Card";
import ImageCard from "../cards/ImageCard";
import Image from "../media/Image";
import { SbBlokData } from "@storyblok/react";

interface RichTextRendererProps {
  document: StoryblokRichtext;
  className?: string;
}

const resolvers = {
  nodeResolvers: {
    [NODE_UL]: (children: React.ReactNode) => (
      <ul className="list-disc pl-6 my-4">{children}</ul> // no list-inside
    ),
    [NODE_OL]: (children: React.ReactNode) => (
      <ol className="list-decimal pl-6 my-4">{children}</ol> // 1. 2. 3. ...
    ),
    [NODE_LI]: (children: React.ReactNode) => (
      <li className="mb-1">{children}</li>
    ),
    [NODE_HEADING]: (
      children: React.ReactNode,
      { level = 2 }: { level: 1 | 2 | 3 | 4 | 5 | 6 }
    ) => {
      const levels: Record<
        number,
        "h1" | "h2" | "h3" | "h4" | "h5" | "display"
      > = {
        1: "h1",
        2: "h2",
        3: "h3",
        4: "h4",
        5: "h5",
        6: "h5",
      };

      const variant = levels[level] ?? "h2";
      return <Heading variant={variant}>{children}</Heading>;
    },
  },
  blokResolvers: {
    badge: (props: SbBadge) => {
      return <Badge blok={props} />;
    },
    button: (props: SbButton) => {
      return <Button blok={props} />;
    },
    link: (props: SbLink) => {
      return <Link blok={props} />;
    },
    grid: (props: SbGrid) => {
      return <Grid blok={props} />;
    },
    fullGrid: (props: SbFullGrid) => {
      return <FullGrid blok={props} />;
    },
    staticGrid: (props: SbStaticGrid) => {
      return <StaticGrid blok={props} />;
    },
    card: (props: SbCard) => {
      return <Card blok={props} />;
    },
    imageCard: (props: SbImageCard) => {
      return <ImageCard blok={props} />;
    },
    image: (props: SbImage) => {
      return (
        <div className="flex justify-center items-center w-full py-16 px-16">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            blok={props as SbImage & SbBlokData}
            imageClassName="mx-auto"
          />
        </div>
      );
    },
  },
};

export const RichTextRenderer = ({
  document,
  className,
}: RichTextRendererProps) => {
  if (!document) return null;

  return (
    <span className={cn("rich-text prose max-w-none space-y-4", className)}>
      {/* @ts-expect-error - Resolvers is not typed correctly */}
      {render(document, resolvers)}
    </span>
  );
};
