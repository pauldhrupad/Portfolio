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
            description="Three projects exploring product workflows, backend rules, and interactive systems. Open a case study to see the engineering behind each one."
            id="projects-title"
            index="03 / SELECTED WORK"
            title="Selected work. Different problems."
          />
        </SectionReveal>

        <div className="mt-8 sm:mt-12">
          <ProjectGallery projects={projects} />
        </div>
      </Container>
    </section>
  );
}
