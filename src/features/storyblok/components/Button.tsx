import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { SbButton } from "@storyblok/types/287325821225947/storyblok-components";
import { SbBlokData } from "@storyblok/js";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { linkResolver } from "@/lib/storyblok";

interface ButtonProps {
  blok: SbButton;
}

const composeClasses = (
  type: SbButton["type"],
  variant: SbButton["variant"],
  size: SbButton["size"]
) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition";

  // Default to brand-orange if no type specified
  const colorType = type || "brand-orange";
  const buttonVariant = variant || "primary";
  const buttonSize = size || "medium";

  // Define color schemes for each type
  const colorSchemes = {
    "brand-orange": {
      primary:
        "bg-brand-orange text-brand-black shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-black",
    },
    cream: {
      primary:
        "bg-cream text-brand-black shadow-lg shadow-black/10 hover:brightness-95",
      outline:
        "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-brand-black",
    },
    "strategy-gold": {
      primary:
        "bg-strategy-gold text-brand-black shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-gold text-strategy-gold hover:bg-strategy-gold hover:text-brand-black",
    },
    "strategy-green": {
      primary:
        "bg-strategy-green text-cream shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-green text-strategy-green hover:bg-strategy-green hover:text-cream",
    },
    "strategy-red": {
      primary:
        "bg-strategy-red text-brand-black shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-red text-strategy-red hover:bg-strategy-red hover:text-brand-black",
    },
    "strategy-charcoal": {
      primary:
        "bg-strategy-charcoal text-cream shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-strategy-charcoal text-strategy-charcoal hover:bg-strategy-charcoal hover:text-cream",
    },
    "bold-dark": {
      primary:
        "bg-bold-dark text-cream shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-bold-dark text-bold-dark hover:bg-bold-dark hover:text-cream",
    },
    freedom: {
      primary:
        "bg-freedom text-brand-black shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-freedom text-freedom hover:bg-freedom hover:text-brand-black",
    },
    herstel: {
      primary:
        "bg-herstel text-brand-black shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-herstel text-herstel hover:bg-herstel hover:text-brand-black",
    },
    toerusting: {
      primary:
        "bg-toerusting text-brand-black shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-toerusting text-toerusting hover:bg-toerusting hover:text-brand-black",
    },
    zending: {
      primary:
        "bg-zending text-brand-black shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-zending text-zending hover:bg-zending hover:text-brand-black",
    },
  };

  const sizeClasses =
    buttonSize === "small"
      ? "text-xs px-4 py-2"
      : buttonSize === "medium"
        ? "text-sm px-8 py-3"
        : "text-base px-12 py-4";

  const variantClasses =
    colorSchemes[colorType]?.[buttonVariant] ||
    colorSchemes["brand-orange"].primary;

  return `${baseClasses} ${variantClasses} ${sizeClasses}`;
};

export default function Button({ blok }: ButtonProps) {
  console.log(blok.link);
  return (
    <Link
      {...storyblokEditable(blok as SbBlokData)}
      href={linkResolver(blok.link)}
      className={cn(
        composeClasses(blok.type, blok.variant, blok.size),
        blok.tailwindClasses
      )}
    >
      {blok.text}
      {blok.showArrowIcon && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  );
}
