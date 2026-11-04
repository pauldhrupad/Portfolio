import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

const sizeStyles = {
  default: "max-w-[var(--container-width)]",
  narrow: "max-w-[var(--container-width-narrow)]",
  wide: "max-w-[var(--container-width-wide)]",
} as const;

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-[var(--space-gutter)]",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
