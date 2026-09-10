"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
};

type ScrollLayerProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

type SectionRevealProps = RevealProps & {
  amount?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
  scale = 1,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(className)}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale, y: distance }
      }
      transition={
        reducedMotion
          ? { delay: 0, duration: 0.12, ease: "linear" }
          : { delay, duration: 0.6, ease: revealEase }
      }
    >
      {children}
    </motion.div>
  );
}

export function ScrollLayer({
  children,
  className,
  distance = -12,
}: ScrollLayerProps) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY,
    [0, 900],
    [0, reducedMotion ? 0 : distance],
  );

  return (
    <motion.div className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function SectionReveal({
  amount = 0.2,
  children,
  className,
  delay = 0,
  distance = 24,
  scale = 1,
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale, y: distance }
      }
      transition={
        reducedMotion
          ? { duration: 0.12, ease: "linear" }
          : { delay, duration: 0.7, ease: revealEase }
      }
      viewport={{ amount, once: true }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
