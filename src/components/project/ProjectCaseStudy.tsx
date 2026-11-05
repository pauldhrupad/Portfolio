import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import type { CaseStudySection as CaseStudyContent, Project, ProjectCaseStudy as CaseStudyData } from "@/types/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CaseStudySection } from "./CaseStudySection";
import { ProjectBrowserPreview } from "./ProjectBrowserPreview";
import { WorkflowDiagram } from "./WorkflowDiagram";

type ProjectCaseStudyProps = {
  project: Project & { caseStudy: CaseStudyData };
  relatedProjects: Project[];
};

function SectionContent({ section }: { section: CaseStudyContent }) {
  switch (section.type) {
    case "text":
      return <div className="max-w-[70ch] space-y-5 text-base leading-8 text-text-secondary sm:text-lg">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>;
    case "list":
      return (
        <div>
          {section.intro && <p className="mb-6 max-w-[70ch] text-base leading-8 text-text-secondary">{section.intro}</p>}
          <ul className="grid gap-3">
            {section.items.map((item) => (
              <li className="flex gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-5 text-base leading-7 text-text-secondary" key={item}>
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-primary" />{item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "features":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {section.items.map((feature) => (
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5" key={feature.title}>
              <h3 className="text-lg font-semibold leading-6">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      );
    case "workflows":
      return <div className="grid gap-4">{section.items.map((workflow) => <WorkflowDiagram key={workflow.title} workflow={workflow} />)}</div>;
    case "architecture":
      return <ArchitectureDiagram architecture={section.diagram} />;
    case "deployment":
      return (
        <dl className="grid gap-3 sm:grid-cols-3">
          {section.items.map((item) => (
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-5" key={item.layer}>
              <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">{item.layer}</dt>
              <dd className="mt-3 text-lg font-semibold">{item.platform}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

export function ProjectCaseStudy({ project, relatedProjects }: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;

  return (
    <main className="pb-[var(--space-section)] pt-28 sm:pt-36" id="main-content" tabIndex={-1}>
      <Container size="wide">
        <Link className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-text-secondary hover:text-text-primary" href="/#projects" prefetch={false}>
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to Projects
        </Link>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant={project.status === "completed" ? "success" : "neutral"}>{project.status.replace("-", " ")}</Badge>
            </div>
            <h1 className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.06em] wrap-anywhere">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">{caseStudy.heroSummary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={project.github} size="sm" target="_blank" variant="secondary">
                GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </ButtonLink>
              {project.demo && (
                <ButtonLink href={project.demo} size="sm" target="_blank">
                  Live Demo <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="group/project min-w-0">
            <ProjectBrowserPreview priority project={project} />
          </div>
        </div>

        <details className="mt-10 rounded-[var(--radius-md)] border border-border bg-surface">
          <summary className="cursor-pointer px-5 py-4 text-sm font-semibold">On this page</summary>
          <nav aria-label="Case study sections" className="px-5 pb-5">
            <ol className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              <li><a className="flex min-h-11 items-center rounded-sm text-sm text-text-secondary hover:text-accent-primary" href="#technology">Technology stack</a></li>
              {caseStudy.sections.map((section) => (
                <li key={section.id}><a className="flex min-h-11 items-center rounded-sm text-sm text-text-secondary hover:text-accent-primary" href={`#${section.id}`}>{section.title}</a></li>
              ))}
            </ol>
          </nav>
        </details>

        <section aria-labelledby="technology-title" className="mt-10 rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8" id="technology">
          <h2 className="text-2xl font-semibold tracking-tight" id="technology-title">Technology stack</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.technologyGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">{group.technologies.map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}</div>
              </div>
            ))}
          </div>
        </section>

        <article className="mt-10">
          {caseStudy.sections.map((section, index) => (
            <CaseStudySection id={section.id} index={String(index + 1).padStart(2, "0")} key={section.id} title={section.title}>
              <SectionContent section={section} />
            </CaseStudySection>
          ))}
        </article>

        <nav aria-label="Related projects" className="border-t border-border pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Explore another project</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedProjects.map((item) => (
              <Link className="group rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-hover" href={`/projects/${item.slug}`} key={item.slug}>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">{item.category}</p>
                <p className="mt-3 flex items-center justify-between gap-4 text-lg font-semibold">{item.title}<ArrowRight aria-hidden="true" className="size-4 shrink-0" /></p>
              </Link>
            ))}
          </div>
          <ButtonLink className="mt-7" href="/#projects" size="sm" variant="ghost"><ArrowLeft aria-hidden="true" className="size-4" /> Back to Projects</ButtonLink>
        </nav>
      </Container>
    </main>
  );
}
