import { ArrowRight } from "lucide-react";
import type { CaseStudyWorkflow } from "@/types/portfolio";

type WorkflowDiagramProps = {
  workflow: CaseStudyWorkflow;
};

export function WorkflowDiagram({ workflow }: WorkflowDiagramProps) {
  return (
    <div className="neu-panel rounded-[var(--radius-md)] border border-border p-5 sm:p-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted sm:text-sm">
        {workflow.title}
      </h3>
      <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        {workflow.steps.map((step, index) => (
          <li className="contents" key={step}>
            <span className="flex min-h-12 flex-1 items-center justify-center rounded-xl border border-border-strong bg-background/55 px-3 text-center text-sm font-medium text-text-primary">
              {step}
            </span>
            {index < workflow.steps.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="mx-auto size-4 shrink-0 rotate-90 text-accent-primary sm:rotate-0"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
