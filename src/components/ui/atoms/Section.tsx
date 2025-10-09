"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export default function Section({
  backgroundColor,
  color,
  children,
  ...additionalProps
}: {
  backgroundColor: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className={cn(
        "relative overflow-hidden",
        `bg-${backgroundColor}`,
        `text-${color}`,
        "py-12"
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...additionalProps}
    >
      <div className="container px-4 mx-auto space-y-24">{children}</div>
    </motion.section>
  );
}
