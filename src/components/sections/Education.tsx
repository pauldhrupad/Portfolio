import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { AdditionalDimensions } from "./AdditionalDimensions";
import { EducationCard } from "./EducationCard";

const primaryEducation = education.find((entry) => entry.featured);
const supportingEducation = education.filter((entry) => !entry.featured);

export function Education() {
  if (!primaryEducation) return null;

  return (
    <section aria-labelledby="education-title" className="relative py-[var(--space-section)]" id="education">
      <Container size="wide">
        <SectionReveal distance={10}>
          <SectionHeading id="education-title" index="05 / EDUCATION" title="Academic foundation." />
        </SectionReveal>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.85fr)]">
          <SectionReveal amount={0.08} className="min-w-0 md:col-span-2 lg:col-span-1" distance={10}>
            <EducationCard education={primaryEducation} />
          </SectionReveal>
          {supportingEducation.map((entry, index) => (
            <SectionReveal className="min-w-0" delay={index * 0.04} distance={10} key={entry.qualification}>
              <EducationCard education={entry} />
            </SectionReveal>
          ))}
        </div>

        <AdditionalDimensions />
      </Container>
    </section>
  );
}
