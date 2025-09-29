"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText, Info } from "lucide-react";
import { SbStatementScripture } from "@storyblok/types/287325821225947/storyblok-components";
import { SbBlokData, storyblokEditable } from "@storyblok/react/rsc";

export default function StatementScripture({
  blok,
}: {
  blok: SbStatementScripture;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      const updatePosition = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipWidth = 320; // w-80 = 20rem = 320px
        const gap = 8;

        let left = rect.left;
        let top = rect.bottom + gap;

        // Check if tooltip would go off the right edge
        if (left + tooltipWidth > window.innerWidth) {
          left = window.innerWidth - tooltipWidth - gap;
        }

        // Check if tooltip would go off the bottom edge
        if (top + 200 > window.innerHeight) {
          // Approximate height
          top = rect.top - 200 - gap; // Position above instead
        }

        setPosition({ top, left });
      };

      updatePosition();

      // Update position on scroll or resize
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [open]);

  const tooltipContent = open && blok.content && mounted && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          zIndex: 9999,
        }}
        className="w-80 rounded-xl border border-white/10 bg-bold-dark p-4 text-sm text-cream shadow-2xl"
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setOpen(false), 100);
        }}
      >
        <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-cream/60">
          <Info className="h-3.5 w-3.5" />
          {blok.ref}
        </div>
        <p className="text-cream/90">{blok.content}</p>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        {...storyblokEditable(blok as SbBlokData)}
        className="group inline-flex items-center"
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          setOpen(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setOpen(false), 100);
        }}
      >
        <span className="inline-flex cursor-default items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cream hover:border-white/20">
          <BookOpenText className="h-4 w-4 text-strategy-gold" />
          {blok.ref}
        </span>
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}
