import type { Education } from "@/types/portfolio";

type EducationCardProps = {
  education: Education;
};

export function EducationCard({ education }: EducationCardProps) {
  if (education.featured) {
    const graduationYear = education.year.replace("Expected ", "");

    return (
      <article className="neu-panel relative flex h-full min-h-[28rem] overflow-hidden rounded-[calc(var(--radius-lg)+0.125rem)] border border-accent-primary/25 p-7 sm:min-h-[30rem] sm:p-9 lg:min-h-[34rem] lg:p-10">
        <div
          aria-hidden="true"
          className="education-accent absolute inset-0"
        />
        <div className="relative flex w-full flex-col">
          <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em] text-text-muted sm:text-sm">
            <span>Primary education</span>
            <span className="text-accent-primary-soft">Current</span>
          </div>

          <div className="my-auto py-12">
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent-primary-soft sm:text-base">
              {education.degree ?? education.shortQualification}
            </p>
            <h3 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-text-primary">
              {education.field ?? education.qualification}
            </h3>
            <p className="mt-7 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
              {education.institution}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-5 border-t border-border pt-6">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                Expected graduation
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl">
                {graduationYear}
              </dd>
            </div>
            <div className="text-right">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                {education.resultLabel}
              </dt>
              <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl">
                {education.result}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    );
  }

  return (
    <article className="neu-panel flex min-h-[15rem] flex-col rounded-[var(--radius-lg)] border border-border p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted sm:text-sm">
          School education
        </p>
        <span className="font-mono text-sm text-accent-primary-soft">{education.year}</span>
      </div>

      <div className="my-auto py-7">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-text-primary sm:text-3xl">
          {education.qualification}
        </h3>
        <p className="mt-3 text-base leading-7 text-text-secondary">{education.institution}</p>
      </div>

      <dl className="flex items-end justify-between gap-4 border-t border-border pt-5">
        <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
          {education.resultLabel}
        </dt>
        <dd className="text-xl font-semibold text-text-primary sm:text-2xl">{education.result}</dd>
      </dl>
    </article>
  );
}
