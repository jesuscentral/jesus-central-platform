import { colors } from "@/lib/colors";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface BadgeProps {
  link?: string | null;
  text: string;
  textColor?: string | number;
  backgroundColor?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional props like storyblokEditable
}

export default function Badge({
  link,
  text,
  textColor = colors.BOLD_DARK,
  backgroundColor = colors.CREAM,
  ...additionalProps
}: BadgeProps) {
  if (link) {
    return (
      <Link
        href={link}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
          `text-${textColor}`,
          `bg-${backgroundColor}`
        )}
        {...additionalProps}
      >
        {text}
      </Link>
    );
  }
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        `text-${textColor}`,
        `bg-${backgroundColor}`
      )}
      {...additionalProps}
    >
      {text}
    </span>
  );
}
