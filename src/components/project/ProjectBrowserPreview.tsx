import { CalendarDays, CircleDollarSign, Clock3, MessageSquareText } from "lucide-react";
import type { Project } from "@/types/portfolio";

type ProjectBrowserPreviewProps = {
  project: Project;
};

const previewIcons = [CalendarDays, CircleDollarSign, MessageSquareText, Clock3] as const;

export function ProjectBrowserPreview({ project }: ProjectBrowserPreviewProps) {
  const domain = project.demo
    ? project.demo.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : project.title;
  const features = project.previewFeatures ?? [];

  return (
    <div className="group/preview overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-background shadow-[var(--shadow-floating)] transition-[border-color,transform] duration-[var(--duration-base)] hover:border-border-emphasis">
      <div className="flex h-11 items-center gap-3 border-b border-border bg-surface/90 px-4">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff6b6b]/75" />
          <span className="size-2.5 rounded-full bg-[#ffd166]/75" />
          <span className="size-2.5 rounded-full bg-[#66d9a8]/75" />
        </div>
        <div className="mx-auto max-w-[70%] truncate rounded-full border border-border bg-background/70 px-4 py-1 font-mono text-[0.68rem] text-text-muted sm:text-xs">
          Illustrative preview · {domain}
        </div>
      </div>

      <div className="project-preview-surface relative min-h-[22rem] overflow-hidden p-4 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover/preview:scale-[1.025] sm:min-h-[26rem] sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgb(91_140_255/0.13),transparent_35%)]"
        />

        <div className="relative flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-primary-soft sm:text-xs">
              {project.previewEyebrow ?? project.category}
            </p>
            <p className="mt-1 text-base font-semibold text-text-primary sm:text-lg">
              {project.previewTitle ?? project.title}
            </p>
          </div>
          <div className="flex -space-x-2" aria-hidden="true">
            <span className="size-8 rounded-full border-2 border-surface bg-accent-primary/35" />
            <span className="size-8 rounded-full border-2 border-surface bg-accent-secondary/35" />
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = previewIcons[index % previewIcons.length];

            return (
              <div
                className="rounded-[var(--radius-md)] border border-border bg-surface/75 p-4 sm:p-5"
                key={feature}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-background/55 text-accent-primary-soft">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
                  </span>
                  <span className="size-1.5 rounded-full bg-success" />
                </div>
                <p className="mt-6 text-sm font-medium text-text-primary sm:text-base">{feature}</p>
                <div aria-hidden="true" className="mt-3 space-y-2">
                  <span className="block h-1.5 w-full rounded-full bg-border-strong" />
                  <span className="block h-1.5 w-2/3 rounded-full bg-border" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
