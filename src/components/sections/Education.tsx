import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { AdditionalDimensions } from "./AdditionalDimensions";
import { EducationCard } from "./EducationCard";

const primaryEducation = education.find((entry) => entry.featured);
const supportingEducation = education.filter((entry) => !entry.featured);

export function Education() {
  if (!primaryEducation) {
    return null;
  }

  return (
    <section
      aria-labelledby="education-title"
      className="relative py-[var(--space-section)]"
      id="education"
    >
      <Container size="wide">
        <SectionReveal distance={18}>
          <SectionHeading id="education-title" index="05 / EDUCATION" title="Academic Foundation" />
        </SectionReveal>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-6">
          <SectionReveal amount={0.08} className="h-full" distance={22} scale={0.99}>
            <EducationCard education={primaryEducation} />
          </SectionReveal>

          <div className="grid gap-5 lg:grid-rows-2 lg:gap-6">
            {supportingEducation.map((entry, index) => (
              <SectionReveal
                amount={0.1}
                className="h-full"
                delay={index * 0.05}
                distance={18}
                key={`${entry.institution}-${entry.qualification}`}
              >
                <EducationCard education={entry} />
              </SectionReveal>
            ))}
          </div>
        </div>

        <AdditionalDimensions />
      </Container>
    </section>
  );
}
