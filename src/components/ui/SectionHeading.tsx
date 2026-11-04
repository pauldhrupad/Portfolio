import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  align?: "left" | "center";
  className?: string;
  description?: ReactNode;
  headingLevel?: "h1" | "h2" | "h3";
  id?: string;
  index?: string;
  title: ReactNode;
};

export function SectionHeading({
  align = "left",
  className,
  description,
  headingLevel = "h2",
  id,
  index,
  title,
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <header className={cn(align === "center" && "mx-auto text-center", className)}>
      {index ? (
        <p className="mb-[var(--space-md)] font-mono text-label font-medium uppercase tracking-[0.14em] text-accent-primary">
          {index}
        </p>
      ) : null}
      <Heading
        className={cn(
          "max-w-4xl text-balance font-semibold tracking-[-0.045em] text-text-primary",
          headingLevel === "h1" ? "text-display" : headingLevel === "h2" ? "text-section" : "text-card-title",
          align === "center" && "mx-auto",
        )}
        id={id}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-[var(--space-md)] max-w-[62ch] text-pretty text-body text-text-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
