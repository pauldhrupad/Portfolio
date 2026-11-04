import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "accent" | "success";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface-recessed text-text-secondary",
  accent: "border-accent-primary/25 bg-accent-primary/10 text-accent-primary-soft",
  success: "border-success/25 bg-success/10 text-success",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 max-w-full items-center rounded-[var(--radius-sm)] border px-2.5 py-1 font-mono text-label leading-snug tracking-[0.02em] wrap-anywhere",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
