import { ArrowRight } from "lucide-react";
import type { CaseStudyWorkflow } from "@/types/portfolio";

type WorkflowDiagramProps = {
  workflow: CaseStudyWorkflow;
};

export function WorkflowDiagram({ workflow }: WorkflowDiagramProps) {
  return (
    <div className="neu-panel rounded-[var(--radius-md)] border border-border p-3 sm:p-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted sm:text-sm">
        {workflow.title}
      </h3>
      <ol className="mt-3 grid gap-2 sm:mt-5 md:auto-cols-fr md:grid-flow-col md:gap-8" role="list">
        {workflow.steps.map((step, index) => (
          <li className="relative grid min-w-0 gap-2" key={step}>
            <span className="flex min-h-12 items-center justify-center rounded-xl border border-border-strong bg-background/55 px-3 py-2 text-center text-sm font-medium text-text-primary">
              {step}
            </span>
            {index < workflow.steps.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="mx-auto size-4 rotate-90 text-accent-primary md:absolute md:top-1/2 md:-right-6 md:-translate-y-1/2 md:rotate-0"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
