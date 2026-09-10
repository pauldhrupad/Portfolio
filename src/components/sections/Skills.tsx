import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { primarySkillConstellation, skillGroups } from "@/data/skills";
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

      <Container>
        <SectionReveal distance={18}>
          <SectionHeading id="skills-title" index="02 / SKILLS" title="Tools I Build With" />
        </SectionReveal>

        <SectionReveal amount={0.08} className="mt-12 lg:mt-16" delay={0.06} distance={22}>
          <SkillsExplorer constellation={primarySkillConstellation} groups={skillGroups} />
        </SectionReveal>
      </Container>
    </section>
  );
}
