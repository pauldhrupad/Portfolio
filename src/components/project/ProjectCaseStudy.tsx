import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import type { CoordinationCaseStudy, Project } from "@/types/portfolio";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CaseStudySection } from "./CaseStudySection";
import { ProjectBrowserPreview } from "./ProjectBrowserPreview";
import { WorkflowDiagram } from "./WorkflowDiagram";

type ProjectCaseStudyProps = {
  project: Project & { caseStudy: CoordinationCaseStudy };
};

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;
  const status = project.status?.replace("-", " ") ?? "Project";

  return (
    <main className="pb-[var(--space-section)] pt-32 sm:pt-36">
      <Container size="wide">
        <SectionReveal distance={12}>
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
            href="/#projects"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Projects
          </Link>
        </SectionReveal>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(26rem,1.14fr)] lg:gap-16">
          <SectionReveal distance={18}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant={project.status === "completed" ? "success" : "neutral"}>
                {status}
              </Badge>
            </div>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-text-primary">
              {project.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              {caseStudy.heroSummary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github ? (
                <ButtonLink href={project.github} target="_blank" variant="secondary">
                  <GitBranch aria-hidden="true" className="size-4" />
                  GitHub
                </ButtonLink>
              ) : null}
              {project.demo ? (
                <ButtonLink href={project.demo} target="_blank">
                  Live Demo
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              ) : null}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} distance={20} scale={0.98}>
            <ProjectBrowserPreview project={project} />
          </SectionReveal>
        </div>

        <SectionReveal amount={0.08} className="mt-14 lg:mt-20" distance={18}>
          <section
            aria-labelledby="technology-stack-title"
            className="neu-panel rounded-[var(--radius-lg)] border border-border p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary-soft sm:text-sm">
                  System stack
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl"
                  id="technology-stack-title"
                >
                  Technology breakdown
                </h2>
              </div>
              <span className="font-mono text-xs text-text-muted sm:text-sm">
                {caseStudy.technologyGroups.length} layers
              </span>
            </div>

            <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.technologyGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                    {group.label}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.technologies.map((technology) => (
                      <TechBadge key={technology}>{technology}</TechBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        <article className="mt-16 lg:mt-24">
          <CaseStudySection index="01 / CONTEXT" title="Context">
            <p className="max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
              {caseStudy.context}
            </p>
          </CaseStudySection>

          <CaseStudySection index="02 / PROBLEM" title="Problem">
            <p className="max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
              {caseStudy.problem}
            </p>
          </CaseStudySection>

          <CaseStudySection index="03 / GOAL" title="Product Goal">
            <p className="max-w-3xl text-xl font-medium leading-8 tracking-[-0.02em] text-text-primary sm:text-2xl sm:leading-9">
              {caseStudy.productGoal}
            </p>
          </CaseStudySection>

          <CaseStudySection index="04 / FEATURES" title="Major Features">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {caseStudy.featureGroups.map((feature) => (
                <div
                  className="neu-panel rounded-[var(--radius-md)] border border-border p-5"
                  key={feature.title}
                >
                  <h3 className="text-base font-semibold text-text-primary sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection index="05 / ARCHITECTURE" title="Architecture">
            <ArchitectureDiagram architecture={caseStudy.architecture} />
          </CaseStudySection>

          <CaseStudySection index="06 / AUTH" title="Authentication">
            <ul className="grid gap-3 sm:grid-cols-2">
              {caseStudy.authentication.map((item) => (
                <li
                  className="flex gap-3 rounded-[var(--radius-md)] border border-border bg-surface/45 p-5 text-base leading-7 text-text-secondary"
                  key={item}
                >
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection index="07 / SCHEDULING" title="Custody Workflow">
            <div className="grid gap-4">
              {caseStudy.custodyWorkflows.map((workflow) => (
                <WorkflowDiagram key={workflow.title} workflow={workflow} />
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection index="08 / EXPENSES" title="Expense States">
            <div className="grid gap-4">
              {caseStudy.expenseWorkflows.map((workflow) => (
                <WorkflowDiagram key={workflow.title} workflow={workflow} />
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection index="09 / RECORDS" title="Communication & Audit">
            <ul className="neu-panel divide-y divide-border rounded-[var(--radius-lg)] border border-border px-5 sm:px-7">
              {caseStudy.communicationAudit.map((item, index) => (
                <li className="grid gap-3 py-5 sm:grid-cols-[2rem_1fr]" key={item}>
                  <span className="font-mono text-sm text-accent-primary-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-7 text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection index="10 / QUALITY" title="Testing">
            <p className="max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
              {caseStudy.testingPhilosophy}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {caseStudy.testingPractices.map((practice) => (
                <li
                  className="rounded-[var(--radius-md)] border border-border bg-background/35 px-5 py-4 text-sm leading-6 text-text-primary sm:text-base"
                  key={practice}
                >
                  {practice}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection index="11 / DELIVERY" title="Deployment">
            <dl className="grid gap-3 sm:grid-cols-3">
              {caseStudy.deployment.map((item) => (
                <div
                  className="rounded-[var(--radius-md)] border border-border bg-surface/55 p-5"
                  key={item.layer}
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                    {item.layer}
                  </dt>
                  <dd className="mt-2 text-xl font-semibold text-text-primary">{item.platform}</dd>
                </div>
              ))}
            </dl>
          </CaseStudySection>

          <CaseStudySection index="12 / REFLECTION" title="Lessons Learned">
            <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {caseStudy.lessons.map((lesson, index) => (
                <li className="flex gap-4 text-base leading-7 text-text-secondary" key={lesson}>
                  <span className="font-mono text-sm text-accent-primary-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {lesson}
                </li>
              ))}
            </ol>
          </CaseStudySection>
        </article>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
          <ButtonLink href="/#projects" variant="secondary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Projects
          </ButtonLink>
          <div className="flex flex-wrap gap-3">
            {project.github ? (
              <ButtonLink href={project.github} target="_blank" variant="ghost">
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            ) : null}
            {project.demo ? (
              <ButtonLink href={project.demo} target="_blank">
                Live Demo
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}
