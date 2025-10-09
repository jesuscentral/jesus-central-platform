"use client";

import { useRef } from "react";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "@/components/ui/atoms/Image";

interface AnimatedImageProps {
  src: string;
  alt: string;
  side?: "left" | "right";
  delay?: number;
  className?: string;
  imageClassName?: string;
  quality?: number;
  sizes?: string;
}

export default function AnimatedImage({
  src,
  alt,
  side = "right",
  delay = 0,
  className,
  imageClassName,
  quality = 60,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: AnimatedImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "left" ? [-8, 0, 8] : [8, 0, -8]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.8, 1, 1, 1, 0.85]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y: imageY,
        rotate: imageRotate,
        scale: imageScale,
        opacity: imageOpacity,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
        rotateY: side === "left" ? -15 : 15,
      }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, rotateY: 0 }
          : { opacity: 0, scale: 0.8, rotateY: side === "left" ? -15 : 15 }
      }
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: side === "left" ? -2 : 2,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={cn(
        "relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl will-change-transform",
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          objectFit="cover"
          className={imageClassName}
          quality={quality}
          sizes={sizes}
          loading="lazy"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
