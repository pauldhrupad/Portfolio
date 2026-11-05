import { Badge } from "@/components/ui/Badge";
import type { Experience } from "@/types/portfolio";

export function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  return (
    <ol className="ml-1.5 grid gap-4 border-l border-border-strong pl-5 sm:pl-8">
      {entries.map((entry) => (
        <li className="relative min-w-0" key={entry.id}>
          <span aria-hidden="true" className="absolute -left-[1.6875rem] top-7 size-3 rounded-full border-2 border-background bg-accent-primary sm:-left-[2.4375rem]" />
          <article className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge>{entry.type}</Badge>
              {(entry.year ?? entry.period) && <p className="font-mono text-xs text-text-muted">{entry.year ?? entry.period}</p>}
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">{entry.role ?? entry.title}</h3>
            {entry.role && <p className="mt-1 text-base text-text-secondary">{entry.title}</p>}
            {entry.project && <p className="mt-2 text-sm text-text-muted">Project: {entry.project}</p>}
            {entry.highlights.length > 0 && (
              <ul className="mt-4 grid gap-2">
                {entry.highlights.map((highlight) => (
                  <li className="flex gap-3 text-sm leading-7 text-text-secondary" key={highlight}>
                    <span aria-hidden="true" className="mt-3 size-1 shrink-0 rounded-full bg-accent-primary" />{highlight}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
