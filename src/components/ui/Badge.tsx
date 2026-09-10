import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "accent" | "success";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "border-border bg-background-secondary/70 text-text-secondary",
  accent: "border-accent-primary/25 bg-accent-primary/10 text-accent-primary-soft",
  success: "border-success/25 bg-success/10 text-success",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-[var(--radius-pill)] border px-3 py-1 font-mono text-meta leading-none tracking-[0.02em]",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
