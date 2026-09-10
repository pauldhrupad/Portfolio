import type { CaseStudyArchitecture } from "@/types/portfolio";

type ArchitectureDiagramProps = {
  architecture: CaseStudyArchitecture;
};

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  const applicationLayers = [
    { label: "Interface", value: architecture.client },
    { label: "Application", value: architecture.api },
    { label: "Persistence", value: architecture.database },
  ];

  return (
    <figure className="neu-panel rounded-[var(--radius-lg)] border border-border p-5 sm:p-7">
      <figcaption className="sr-only">
        Application architecture connecting {architecture.client} to {architecture.api} and{" "}
        {architecture.database}, with {architecture.externalServices.join(" and ")} as external
        services.
      </figcaption>

      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(13rem,0.7fr)]">
        <ol aria-label="Application layers" className="grid gap-3">
          {applicationLayers.map((layer, index) => (
            <li className="relative" key={layer.label}>
              <div className="rounded-[var(--radius-md)] border border-border-strong bg-background/60 px-5 py-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                  {layer.label}
                </p>
                <p className="mt-1 text-base font-semibold text-text-primary sm:text-lg">
                  {layer.value}
                </p>
              </div>
              {index < applicationLayers.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="mx-auto block h-3 w-px bg-accent-primary/55"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <div
          aria-hidden="true"
          className="hidden h-px w-12 bg-[linear-gradient(90deg,var(--accent-primary),transparent)] md:block"
        />

        <div className="rounded-[var(--radius-md)] border border-border bg-background/35 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
            External services
          </p>
          <ul className="mt-4 grid gap-3">
            {architecture.externalServices.map((service) => (
              <li
                className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm font-medium text-text-primary sm:text-base"
                key={service}
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-cyan" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
