import { Heading } from "@/components/ui/atoms/Heading";
import { cn } from "@/utils/cn";
import { StoryblokRichtext } from "@storyblok/types/storyblok";
import { NODE_HEADING, render } from "storyblok-rich-text-react-renderer";
import Badge from "./Badge";
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
} from "@storyblok/types/287325821225947/storyblok-components";
import Button from "./Button";
import Link from "./Link";
import Grid from "./Grid";
import FullGrid from "./FullGrid";
import StaticGrid from "./StaticGrid";
import Card from "./Card";
import ImageCard from "./ImageCard";
import Image from "./Image";
import { SbBlokData } from "@storyblok/react";

interface RichTextRendererProps {
  document: StoryblokRichtext;
  className?: string;
}

const resolvers = {
  markResolvers: {},
  nodeResolvers: {
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
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image blok={props as SbImage & SbBlokData} />;
    },
  },
};

export const RichTextRenderer = ({
  document,
  className,
}: RichTextRendererProps) => {
  if (!document) return null;

  return (
    <div className={cn("rich-text prose max-w-none space-y-4", className)}>
      {/* @ts-expect-error - Resolvers is not typed correctly */}
      {render(document, resolvers)}
    </div>
  );
};
