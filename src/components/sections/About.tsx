import { ArrowUpRight, GraduationCap, PenTool } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { creativeCredentials } from "@/data/creative";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { primarySkills } from "@/data/skills";
import { AboutIdentity } from "./AboutIdentity";

const currentEducation = education.find((entry) => entry.featured);
const drawingCredential = creativeCredentials[0];
const cardClassName = "h-full rounded-[var(--radius-lg)] border border-border bg-surface p-4 transition-colors duration-[var(--duration-base)] hover:border-border-strong sm:p-8";

export function About() {
  return (
    <section aria-labelledby="about-title" className="border-b border-border py-[var(--space-section)]" id="about">
      <Container size="wide">
        <SectionReveal distance={6}>
          <SectionHeading id="about-title" index="01 / ABOUT" title="The thinking behind the build." />
        </SectionReveal>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <SectionReveal className="min-w-0 sm:col-span-2 lg:col-span-1 lg:row-span-2" distance={6} amount={0.08}>
            <AboutIdentity profile={profile} />
          </SectionReveal>

          <SectionReveal className="min-w-0 sm:col-span-2" delay={0.04} distance={6}>
            <article className={cardClassName}>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-primary">Approach</p>
              <h3 className="mt-3 max-w-xl text-xl font-semibold leading-tight tracking-[-0.03em] sm:mt-4 sm:text-3xl">
                From the first interaction to the logic underneath.
              </h3>
              <div className="mt-3 grid gap-3 text-base leading-7 text-text-secondary sm:mt-5 sm:gap-4 xl:grid-cols-2 xl:gap-8">
                <p>
                  I enjoy turning practical problems into working applications. Building across the stack lets me connect what someone sees with how their data moves and how the application makes decisions.
                </p>
                <p>
                  I&apos;m growing toward backend engineering, with a focus on authentication, validation, testing, and maintainable APIs. My project work gives me a way to explore those ideas through complete workflows.
                </p>
              </div>
              <div aria-label="Current toolkit" className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4 sm:mt-6 sm:pt-5">
                {primarySkills.map((skill) => <TechBadge key={skill}>{skill}</TechBadge>)}
              </div>
            </article>
          </SectionReveal>

          {currentEducation && (
            <SectionReveal className="min-w-0" delay={0.06} distance={6}>
              <article className={cardClassName}>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-primary">
                  <GraduationCap aria-hidden="true" className="size-4" /> Education
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{currentEducation.qualification}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{currentEducation.institution}</p>
                <p className="mt-4 font-mono text-xs text-text-muted">{currentEducation.year}</p>
                <a className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-accent-primary hover:underline" href="#education">
                  Academic background <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </article>
            </SectionReveal>
          )}

          {drawingCredential && (
            <SectionReveal className="min-w-0" delay={0.08} distance={6}>
              <article className={cardClassName}>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-primary">
                  <PenTool aria-hidden="true" className="size-4" /> Creative practice
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">Drawing &amp; composition</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Drawing gives me another way to explore composition, detail, and the process of refining an idea.
                </p>
                <a className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-accent-primary hover:underline" href="#dimensions">
                  Creative background <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </article>
            </SectionReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
