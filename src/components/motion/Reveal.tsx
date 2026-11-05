"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
  amount?: number;
};

export function SectionReveal({
  amount = 0.2,
  children,
  className,
  delay = 0,
  distance = 12,
  scale = 1,
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={false}
      transition={
        reducedMotion
          ? { duration: 0, delay: 0 }
          : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
      viewport={{ amount, once: true }}
      whileInView={
        reducedMotion
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: [0.8, 1], scale: [scale, 1], y: [distance, 0] }
      }
    >
      {children}
    </motion.div>
  );
}
