import { ArrowUpRight, GitBranch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function DeveloperPresence() {
  return (
    <section aria-labelledby="developer-presence-title" className="relative border-y border-border py-[var(--space-section)]" id="developer-presence">
      <Container size="wide">
        <SectionReveal distance={10}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              description="Explore the source behind the interfaces, application workflows, and game rules."
              id="developer-presence-title"
              index="DEVELOPER PRESENCE"
              title="Follow the work in code."
            />
            <ButtonLink href={profile.socialLinks.github} target="_blank" variant="secondary">
              GitHub Profile <ArrowUpRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </SectionReveal>

        <div aria-label="Selected repositories" className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-12 md:grid-cols-3" role="region">
          {projects.map((project, index) => (
            <SectionReveal className="min-w-0" delay={index * 0.04} distance={10} key={project.slug}>
              <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors hover:border-border-strong sm:p-6">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
                  <GitBranch aria-hidden="true" className="size-4 shrink-0" /> Repository {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">
                  <a className="inline-flex min-h-11 items-start gap-2 rounded-sm hover:text-accent-primary" href={project.github} rel="noreferrer" target="_blank">
                    {project.title}<ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0" />
                  </a>
                </h3>
                <ul className="mt-3 grid gap-2 text-sm leading-7 text-text-secondary">
                  {project.highlights.slice(-2).map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <ul aria-label="Repository technologies" className="mt-auto flex flex-wrap gap-2 pt-5">
                  {(project.homepageTechnologies ?? project.technologies).slice(0, 4).map((technology) => (
                    <li key={technology}><TechBadge>{technology}</TechBadge></li>
                  ))}
                </ul>
              </article>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
