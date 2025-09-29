import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { SbButton } from "@storyblok/types/287325821225947/storyblok-components";
import { SbBlokData } from "@storyblok/js";
import { linkResolver } from "@/lib/storyblok";
import UIButton, {
  ButtonType,
  ButtonVariant,
  ButtonSize,
} from "@/components/ui/Button";

interface ButtonProps {
  blok: SbButton;
}

export default function Button({ blok }: ButtonProps) {
  return (
    <UIButton
      {...storyblokEditable(blok as SbBlokData)}
      href={linkResolver(blok.link)}
      type={blok.type as ButtonType}
      variant={blok.variant as ButtonVariant}
      size={blok.size as ButtonSize}
      showArrowIcon={blok.showArrowIcon}
      className={blok.tailwindClasses}
    >
      {blok.text}
    </UIButton>
  );
}
