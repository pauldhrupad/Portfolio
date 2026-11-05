import type { ReactNode } from "react";
import { SectionReveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type CaseStudySectionProps = {
  children: ReactNode;
  className?: string;
  index: string;
  id: string;
  title: string;
};

export function CaseStudySection({
  children,
  className,
  index,
  id,
  title,
}: CaseStudySectionProps) {
  return (
    <SectionReveal amount={0.06} distance={20}>
      <section
        aria-labelledby={`${id}-title`}
        id={id}
        className={cn(
          "grid gap-7 border-t border-border py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-16",
          className,
        )}
      >
        <header>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary-soft sm:text-sm">
            {index}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl" id={`${id}-title`}>
            {title}
          </h2>
        </header>
        <div>{children}</div>
      </section>
    </SectionReveal>
  );
}
