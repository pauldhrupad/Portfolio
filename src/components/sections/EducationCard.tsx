import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Education } from "@/types/portfolio";

export function EducationCard({ education }: { education: Education }) {
  return (
    <article className={cn(
      "flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] border bg-surface p-4 sm:p-6",
      education.featured ? "border-border-strong lg:p-7" : "border-border",
    )}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          <GraduationCap aria-hidden="true" className="size-4 shrink-0" />
          {education.featured ? "University" : "School"}
        </p>
        <Badge variant={education.featured ? "accent" : "neutral"}>{education.year}</Badge>
      </div>

      <h3 className={cn(
        "mt-3 font-semibold leading-snug tracking-tight sm:mt-6",
        education.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
      )}>{education.qualification}</h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary sm:mt-3 sm:text-base sm:leading-7">{education.institution}</p>

      <dl className="mt-auto pt-3 sm:pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-2 sm:items-end sm:pt-4">
          <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">{education.resultLabel}</dt>
          <dd className={cn("font-semibold tracking-tight", education.featured ? "text-3xl text-accent-primary" : "text-2xl")}>{education.result}</dd>
        </div>
      </dl>
    </article>
  );
}
