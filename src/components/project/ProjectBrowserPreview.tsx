import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/portfolio";

type ProjectBrowserPreviewProps = {
  project: Project;
  priority?: boolean;
  sizes?: string;
};

export function ProjectBrowserPreview({
  project,
  priority = false,
  sizes = "(min-width: 88rem) 48rem, (min-width: 64rem) 55vw, 93vw",
}: ProjectBrowserPreviewProps) {
  return (
    <figure className="min-w-0">
      <div className={cn("relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-background-secondary", project.media && "aspect-[16/10]")}>
        {project.media ? (
          <Image
            alt={project.media.alt}
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover/project:scale-[1.025]"
            fetchPriority={priority ? "high" : undefined}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            src={project.media.src}
          />
        ) : (
          <div className="flex h-full flex-col justify-center gap-4 p-5 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-primary">{project.previewEyebrow}</p>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.previewTitle}</p>
            <ul className="grid grid-cols-2 gap-2">
              {project.previewFeatures.map((feature) => (
                <li className="rounded-lg border border-border bg-surface p-3 text-xs text-text-secondary sm:text-sm" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <figcaption className="mt-2 font-mono text-xs leading-5 text-text-muted sm:mt-3">
        {project.media?.caption ?? "Illustrative preview"}
      </figcaption>
    </figure>
  );
}
