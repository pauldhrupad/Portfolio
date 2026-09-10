"use client";

import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import type { Experience } from "@/types/portfolio";

type ExperienceTimelineProps = {
  entries: Experience[];
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="timeline-track absolute bottom-3 left-2.5 top-3 w-1 rounded-full md:left-[11.4rem]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-3 left-2.5 top-3 w-1 origin-top rounded-full bg-[linear-gradient(var(--accent-primary),var(--accent-cyan),transparent)] md:left-[11.4rem]"
        initial={{ scaleY: reducedMotion ? 1 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
        }
        viewport={{ amount: 0.18, once: true }}
        whileInView={{ scaleY: 1 }}
      />

      <ol>
        {entries.map((entry, index) => {
          const period = entry.year ?? entry.period;

          return (
            <li
              className="mb-10 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 last:mb-0 md:mb-12 md:grid-cols-[10rem_3rem_minmax(0,1fr)] md:gap-x-0"
              key={entry.id}
            >
              <div className="hidden pt-6 text-right md:block">
                {period ? (
                  <span className="font-mono text-sm uppercase tracking-[0.14em] text-text-muted">
                    {period}
                  </span>
                ) : null}
              </div>

              <div aria-hidden="true" className="relative flex justify-center pt-7">
                <span className="timeline-node relative z-10 flex size-6 items-center justify-center rounded-full border border-accent-primary/45 bg-surface">
                  <span className="size-1.5 rounded-full bg-accent-cyan" />
                </span>
              </div>

              <motion.article
                className="neu-panel rounded-[var(--radius-lg)] border border-border p-6 sm:p-7 lg:p-8"
                initial={reducedMotion ? false : { opacity: 0.65, x: 14 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                }
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    {period ? (
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-primary-soft md:hidden">
                        {period}
                      </span>
                    ) : null}
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl md:mt-0">
                      {entry.title}
                    </h3>
                    {entry.role ? (
                      <p className="mt-2 text-base font-medium text-text-primary sm:text-lg">
                        {entry.role}
                      </p>
                    ) : null}
                    {entry.project ? (
                      <p className="mt-2 font-mono text-sm text-accent-primary-soft">
                        Project / {entry.project}
                      </p>
                    ) : null}
                  </div>
                  <Badge className="max-w-full text-center leading-5">{entry.type}</Badge>
                </div>

                {entry.highlights.length > 0 ? (
                  <ul className="mt-6 grid gap-3">
                    {entry.highlights.map((highlight) => (
                      <li className="flex gap-3 text-base leading-7 text-text-secondary" key={highlight}>
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-primary"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
