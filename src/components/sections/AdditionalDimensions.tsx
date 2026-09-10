import { SectionReveal } from "@/components/motion/Reveal";
import { creativeCredentials } from "@/data/creative";
import { experience } from "@/data/experience";

type Dimension = {
  label: string;
  title: string;
  context: string;
  detail: string;
};

const techFest = experience.find((entry) => entry.id === "annual-tech-fest" && entry.visible);
const hackathon = experience.find(
  (entry) => entry.id === "smart-india-hackathon-2024" && entry.visible,
);
const drawingCredential = creativeCredentials[0];

const dimensions = [
  techFest?.role && techFest.highlights[0]
    ? {
        label: "Leadership",
        title: techFest.role,
        context: techFest.title,
        detail: techFest.highlights[0],
      }
    : null,
  techFest?.highlights[1]
    ? {
        label: "Event scale",
        title: techFest.title,
        context: "Shared event effort",
        detail: techFest.highlights[1],
      }
    : null,
  drawingCredential
    ? {
        label: "Creative",
        title: drawingCredential.title,
        context: drawingCredential.category,
        detail: "A formal creative credential alongside technical study.",
      }
    : null,
  hackathon?.project
    ? {
        label: "Innovation",
        title: hackathon.project,
        context: hackathon.title,
        detail: hackathon.type,
      }
    : null,
].filter((item): item is Dimension => item !== null);

export function AdditionalDimensions() {
  if (dimensions.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="dimensions-title" className="mt-20 border-t border-border pt-12 lg:mt-28 lg:pt-16">
      <SectionReveal distance={16}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-primary-soft sm:text-sm">
              Additional dimensions
            </p>
            <h3
              className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-text-primary"
              id="dimensions-title"
            >
              Beyond the technical work
            </h3>
          </div>
          <p className="max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Technical learning is supported by hands-on project execution, leadership exposure,
            and formal creative education.
          </p>
        </div>
      </SectionReveal>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dimensions.map((dimension, index) => (
          <SectionReveal
            amount={0.12}
            className="h-full"
            delay={index * 0.04}
            distance={16}
            key={dimension.label}
          >
            <article className="neu-panel flex h-full min-h-[14rem] flex-col rounded-[var(--radius-lg)] border border-border p-6 transition-[background-color,border-color,transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-border-emphasis hover:shadow-[var(--shadow-card-hover)]">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-primary-soft sm:text-sm">
                {dimension.label}
              </p>
              <h4 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-text-primary">
                {dimension.title}
              </h4>
              <p className="mt-2 text-sm text-text-muted">{dimension.context}</p>
              <p className="mt-auto pt-6 text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
                {dimension.detail}
              </p>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
