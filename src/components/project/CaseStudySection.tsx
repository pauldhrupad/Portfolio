import type { ReactNode } from "react";

type CaseStudySectionProps = {
  children: ReactNode;
  index: string;
  id: string;
  title: string;
};

export function CaseStudySection({
  children,
  index,
  id,
  title,
}: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      id={id}
      className="grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-border py-7 sm:gap-7 sm:py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-16"
    >
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary-soft sm:text-sm">
          {index}
        </p>
        <h2 className="mt-1 text-2xl leading-snug font-semibold tracking-[-0.035em] text-text-primary sm:mt-3 sm:text-3xl" id={`${id}-title`}>
          {title}
        </h2>
      </header>
      <div>{children}</div>
    </section>
  );
}
