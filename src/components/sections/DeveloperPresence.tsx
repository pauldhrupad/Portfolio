import { ArrowUpRight, Code2, GitBranch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const repositoryProjects = projects.filter((project) => project.github);
const representedTechnologies = Array.from(
  new Set(repositoryProjects.flatMap((project) => project.homepageTechnologies ?? project.technologies)),
).slice(0, 8);

export function DeveloperPresence() {
  return (
    <section aria-labelledby="developer-presence-title" className="relative py-[var(--space-section)]">
      <Container size="wide">
        <SectionReveal distance={18}>
          <div className="neu-panel overflow-hidden rounded-[var(--radius-lg)] border border-border p-6 sm:p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(24rem,1.2fr)] lg:items-end">
              <div>
                <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-accent-primary">
                  Developer presence
                </p>
                <h2
                  className="mt-4 max-w-xl text-section text-balance font-semibold leading-[1.02] tracking-[-0.045em] text-text-primary"
                  id="developer-presence-title"
                >
                  Code Beyond the Portfolio
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
                  Public project work, implementation details, and repositories that show how ideas move from interface to backend system.
                </p>
                <ButtonLink
                  className="mt-7 min-h-12"
                  href={profile.socialLinks.github}
                  target="_blank"
                >
                  View GitHub Profile
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              </div>

              <div className="grid gap-4">
                {repositoryProjects.length > 0 ? (
                  repositoryProjects.map((project) => (
                    <a
                      className="group min-w-0 rounded-[var(--radius-md)] border border-border bg-background-secondary/70 p-5 shadow-[var(--shadow-inset)] transition-[border-color,background-color,transform] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-border-emphasis hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
                      href={project.github}
                      key={project.slug}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="flex min-w-0 items-start justify-between gap-4">
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                            <GitBranch aria-hidden="true" className="size-3.5" />
                            Repository
                          </span>
                          <span className="mt-2 block break-words text-lg font-semibold tracking-[-0.02em] text-text-primary">
                            {project.title}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-1 size-5 shrink-0 text-text-muted transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-text-secondary">
                        {project.category}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="rounded-[var(--radius-md)] border border-border bg-background-secondary/70 p-5 text-text-secondary">
                    Selected project repositories are available from the GitHub profile.
                  </div>
                )}
              </div>
            </div>

            {representedTechnologies.length > 0 ? (
              <div className="mt-10 border-t border-border pt-7">
                <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                  <Code2 aria-hidden="true" className="size-4" />
                  Technologies represented in selected work
                </div>
                <div className="flex flex-wrap gap-2">
                  {representedTechnologies.map((technology) => (
                    <TechBadge key={technology}>{technology}</TechBadge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
