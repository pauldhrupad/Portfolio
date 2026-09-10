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
        <p className="mb-4 font-mono text-meta font-medium uppercase tracking-[0.16em] text-accent-primary">
          {index}
        </p>
      ) : null}
      <Heading
        className="text-section max-w-4xl text-balance font-semibold leading-[1.02] tracking-[-0.045em] text-text-primary"
        id={id}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-body leading-7 text-text-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
