import type { HTMLAttributes } from "react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/cn";

type TechBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  featured?: boolean;
};

export function TechBadge({
  children,
  className,
  featured = false,
  ...props
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-9 max-w-full min-w-0 items-center gap-2 break-words rounded-[var(--radius-sm)] border px-3 py-1.5 font-mono text-sm transition-colors duration-[var(--duration-fast)]",
        featured
          ? "border-accent-primary/25 bg-accent-primary/10 text-accent-primary-soft"
          : "border-border bg-surface text-text-secondary",
        className,
      )}
      {...props}
    >
      <Code2 aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.8} />
      {children}
    </span>
  );
}
