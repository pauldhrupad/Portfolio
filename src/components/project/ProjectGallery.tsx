import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SectionReveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import { hasPublishedCaseStudy } from "@/lib/projects";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/portfolio";
import { ProjectBrowserPreview } from "./ProjectBrowserPreview";

const stackedPreviewSizes = "(min-width: 40rem) calc(93vw - 50px), calc(100vw - 58px)";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <div aria-label="Selected projects" className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2" role="region">
      {projects.map((project, index) => (
        <SectionReveal
          amount={0.05}
          className={cn("min-w-0", index === 0 && "lg:col-span-2")}
          delay={index * 0.04}
          distance={6}
          key={project.slug}
        >
          <article
            aria-labelledby={`project-${project.slug}-title`}
            className={cn(
              "group/project flex h-full min-w-0 flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-3 transition-colors hover:border-border-strong sm:gap-6 sm:p-6",
              index === 0 && "lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10 lg:p-8",
            )}
            id={`project-${project.slug}`}
          >
            <ProjectBrowserPreview
              project={project}
              sizes={index === 0
                ? `(min-width: 88rem) 44rem, (min-width: 64rem) 50vw, ${stackedPreviewSizes}`
                : `(min-width: 88rem) 38rem, (min-width: 64rem) 43vw, ${stackedPreviewSizes}`}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 sm:gap-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent-primary">{project.category}</p>
                <Badge>{project.status.replace("-", " ")}</Badge>
              </div>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em] sm:mt-4 sm:text-4xl" id={`project-${project.slug}-title`}>
                {hasPublishedCaseStudy(project) ? (
                  <Link className="rounded-sm hover:text-accent-primary" href={`/projects/${project.slug}`}>{project.title}</Link>
                ) : project.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-text-secondary sm:mt-4">{project.shortDescription}</p>
              <div aria-label="Primary technologies" className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {(project.homepageTechnologies ?? project.technologies).map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}
              </div>
              <ul aria-label="Engineering highlights" className="mt-4 grid gap-1.5 border-t border-border pt-3 sm:mt-6 sm:gap-3 sm:pt-5">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <li className="flex gap-2.5 text-sm leading-6 text-text-secondary" key={highlight}>
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-primary" />{highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:flex sm:flex-wrap sm:pt-6">
                {hasPublishedCaseStudy(project) && (
                  <ButtonLink className="max-sm:col-span-full" href={`/projects/${project.slug}`} size="sm">
                    View Case Study <ArrowRight aria-hidden="true" className="size-4" />
                  </ButtonLink>
                )}
                <ButtonLink className="max-sm:last:col-span-full" href={project.github} size="sm" target="_blank" variant="secondary">
                  GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </ButtonLink>
                {project.demo && (
                  <ButtonLink href={project.demo} size="sm" target="_blank" variant="ghost">
                    Live Demo <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </ButtonLink>
                )}
              </div>
            </div>
          </article>
        </SectionReveal>
      ))}
    </div>
  );
}
