import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { SkillsExplorer } from "./SkillsExplorer";

export function Skills() {
  return (
    <section
      aria-labelledby="skills-title"
      className="relative bg-background-secondary/40 py-[var(--space-section)]"
      id="skills"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--border),transparent)]"
      />

      <Container size="wide">
        <SectionReveal distance={8}>
          <SectionHeading
            description="Technology choices from my selected projects, with examples of how I use them across interfaces, backend workflows, and game logic."
            id="skills-title"
            index="02 / SKILLS"
            title="A toolkit shaped by building."
          />
        </SectionReveal>

        <SectionReveal amount={0.05} className="mt-6 sm:mt-12" distance={6}>
          <SkillsExplorer groups={skillGroups} projects={projects.map(({ slug, title }) => ({ slug, title }))} />
        </SectionReveal>
      </Container>
    </section>
  );
}
