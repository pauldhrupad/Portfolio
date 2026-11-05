import { cn } from "@/lib/cn";
import type { CaseStudyArchitecture } from "@/types/portfolio";

export function ArchitectureDiagram({ architecture }: { architecture: CaseStudyArchitecture }) {
  return (
    <figure className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-7">
      <figcaption className="mb-6 text-sm leading-6 text-text-secondary">{architecture.caption}</figcaption>
      <div className={cn("grid gap-6", architecture.externalServices.length > 0 && "md:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)]")}>
        <ol aria-label="Architecture layers" className="grid gap-3">
          {architecture.layers.map((layer, index) => (
            <li key={layer.label}>
              <div className="rounded-[var(--radius-md)] border border-border-strong bg-background px-5 py-4">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">{layer.label}</p>
                <p className="mt-2 text-base font-semibold leading-6">{layer.value}</p>
              </div>
              {index < architecture.layers.length - 1 && <span aria-hidden="true" className="mx-auto mt-3 block h-3 w-px bg-accent-primary" />}
            </li>
          ))}
        </ol>
        {architecture.externalServices.length > 0 && (
          <div className="rounded-[var(--radius-md)] border border-border p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">External services</p>
            <ul className="mt-4 grid gap-3">
              {architecture.externalServices.map((service) => (
                <li className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium" key={service}>{service}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </figure>
  );
}
