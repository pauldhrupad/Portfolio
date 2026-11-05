import { Badge } from "@/components/ui/Badge";
import type { Experience } from "@/types/portfolio";

export function ExperienceTimeline({ entries }: { entries: Experience[] }) {
  return (
    <ol className="ml-1.5 grid gap-3 border-l border-border-strong pl-3 sm:gap-4 sm:pl-8">
      {entries.map((entry) => (
        <li className="relative min-w-0" key={entry.id}>
          <span aria-hidden="true" className="absolute -left-[1.1875rem] top-6 size-3 rounded-full border-2 border-background bg-accent-primary sm:-left-[2.4375rem] sm:top-7" />
          <article className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:gap-y-3">
              <Badge>{entry.type}</Badge>
              {(entry.year ?? entry.period) && <p className="font-mono text-xs text-text-muted">{entry.year ?? entry.period}</p>}
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight sm:mt-4 sm:text-2xl">{entry.role ?? entry.title}</h3>
            {entry.role && <p className="mt-1 text-base text-text-secondary">{entry.title}</p>}
            {entry.project && <p className="mt-2 text-sm text-text-muted">Project: {entry.project}</p>}
            {entry.highlights.length > 0 && (
              <ul className="mt-3 grid gap-2 sm:mt-4">
                {entry.highlights.map((highlight) => (
                  <li className="flex gap-2 text-sm leading-6 text-text-secondary sm:gap-3 sm:leading-7" key={highlight}>
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
