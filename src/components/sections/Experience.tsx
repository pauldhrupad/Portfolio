import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { ExperienceTimeline } from "./ExperienceTimeline";

const publicExperience = experience.filter((entry) => entry.visible);

export function Experience() {
  if (publicExperience.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="experience-title"
      className="relative bg-background-secondary/40 py-[var(--space-section)]"
      id="experience"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--border),transparent)]"
      />

      <Container size="wide">
        <SectionReveal distance={8}>
          <SectionHeading
            id="experience-title"
            index="04 / EXPERIENCE"
            title="Experience & Leadership"
            description="Event coordination and hands-on innovation, alongside my software projects."
          />
        </SectionReveal>

        <SectionReveal amount={0.06} className="mt-6 max-w-5xl sm:mt-12" distance={6}>
          <ExperienceTimeline entries={publicExperience} />
        </SectionReveal>
      </Container>
    </section>
  );
}
