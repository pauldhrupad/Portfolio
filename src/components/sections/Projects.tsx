import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative py-[var(--space-section)]"
      id="projects"
    >
      <Container size="wide">
        <SectionReveal distance={18}>
          <SectionHeading
            description="A focused selection of applications built around practical workflows, considered backend systems, and clear user experiences."
            id="projects-title"
            index="03 / SELECTED WORK"
            title="Explore My Projects"
          />
        </SectionReveal>

        <SectionReveal amount={0.06} className="mt-12 lg:mt-16" delay={0.05} distance={24}>
          <ProjectGallery projects={projects} />
        </SectionReveal>
      </Container>
    </section>
  );
}
