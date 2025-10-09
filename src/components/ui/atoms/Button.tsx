import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { colors } from "@/lib/colors";

export type ButtonType = (typeof colors)[keyof typeof colors];

export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  showArrowIcon?: boolean;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional props like storyblokEditable
}

const composeClasses = (
  type: ButtonType = "strategy-red",
  variant: ButtonVariant = "primary",
  size: ButtonSize = "medium"
) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer";

  if (Object.keys(colors).includes(type)) {
    type = type as ButtonType;
  } else {
    type = "strategy-red";
  }
  // Define color schemes for each type
  const colorSchemes: Record<ButtonType, Record<ButtonVariant, string>> = {
    boldness: {
      primary:
        "bg-boldness text-freedom shadow-lg shadow-black/30 hover:brightness-125",
      outline:
        "bg-transparent border-2 border-boldness text-boldness hover:bg-boldness hover:text-freedom",
    },
    freedom: {
      primary:
        "bg-freedom text-boldness shadow-lg shadow-black/10 hover:brightness-95",
      outline:
        "bg-transparent border-2 border-freedom text-freedom hover:bg-freedom hover:text-boldness",
    },
    "strategy-red": {
      primary:
        "bg-strategy-red text-boldness shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-red text-strategy-red hover:bg-strategy-red hover:text-boldness",
    },
    "strategy-gold": {
      primary:
        "bg-strategy-gold text-boldness shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-gold text-strategy-gold hover:bg-strategy-gold hover:text-boldness",
    },
    "strategy-green": {
      primary:
        "bg-strategy-green text-freedom shadow-lg shadow-black/20 hover:brightness-110",
      outline:
        "bg-transparent border-2 border-strategy-green text-strategy-green hover:bg-strategy-green hover:text-freedom",
    },
  };

  const sizeClasses =
    size === "small"
      ? "text-xs px-4 py-2"
      : size === "medium"
        ? "text-sm px-8 py-3"
        : "text-base px-12 py-4";

  const variantClasses = colorSchemes[type][variant];

  return `${baseClasses} ${variantClasses} ${sizeClasses}`;
};

const ArrowIcon = () => (
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
);

export default function Button({
  href,
  onClick,
  type = colors.STRATEGY_RED,
  variant = "primary",
  size = "medium",
  children,
  showArrowIcon = false,
  className,
  disabled = false,
  ...additionalProps
}: ButtonProps) {
  console.log(type);
  const buttonClasses = cn(
    composeClasses(type, variant, size),
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {children}
      {showArrowIcon && <ArrowIcon />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...additionalProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...additionalProps}
    >
      {content}
    </button>
  );
}
