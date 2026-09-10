import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { creativeCredentials } from "@/data/creative";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { AboutIdentity } from "./AboutIdentity";

const currentEducation = education[0];
const drawingCredential = creativeCredentials[0];
const graduationYear = currentEducation.year.replace("Expected ", "");
const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

const quickDetails = [
  {
    label: "Education",
    value: currentEducation.shortQualification ?? currentEducation.qualification,
    visible: true,
  },
  {
    label: "Location",
    value: profile.location,
    visible: profile.showLocation,
  },
  {
    label: "Focus",
    value: profile.focusAreas.join(" / "),
    visible: profile.focusAreas.length > 0,
  },
  {
    label: "Availability",
    value: "Open to opportunities",
    visible: profile.openToWork,
  },
].filter((detail) => detail.visible);

export function About() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden py-[var(--space-section)]"
      id="about"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--border-strong),transparent)]"
      />

      <Container>
        <SectionReveal distance={18}>
          <SectionHeading id="about-title" index="01 / ABOUT" title="Behind the Code" />
        </SectionReveal>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:gap-28">
          <SectionReveal amount={0.15} distance={28} scale={0.98}>
            <AboutIdentity
              city={profile.location.split(",")[0].toUpperCase()}
              graduationYear={graduationYear}
              initials={initials}
              name={profile.name}
              programCode={currentEducation.programCode ?? "CSE"}
            />
          </SectionReveal>

          <SectionReveal amount={0.15} delay={0.08} distance={22}>
            <div className="max-w-2xl">
              <div className="space-y-5 text-base leading-8 text-text-secondary sm:text-lg sm:leading-8">
                <p>
                  I&apos;m pursuing a {currentEducation.qualification} at{" "}
                  {currentEducation.institution}, with graduation expected in {graduationYear}.
                  My work sits between full-stack product development and backend engineering,
                  where I&apos;m most interested in how data, APIs, authentication, and application
                  logic come together to make reliable systems.
                </p>

                <p>
                  I learn best by building practical projects from end to end. That means moving
                  beyond isolated features to think about structure, maintainability, validation,
                  testing, deployment, and the details that make an application usable. Working
                  across React, Node.js, Express, and MongoDB has helped me understand both the
                  user-facing experience and the systems supporting it.
                </p>

                <p>
                  I&apos;m continuing to strengthen my software-engineering fundamentals through
                  coursework, experimentation, and project iteration. Outside development,
                  drawing has shaped how I observe composition and refine ideas; I hold a{" "}
                  {drawingCredential.title}. That creative practice brings patience and visual
                  awareness to the way I approach technical work.
                </p>
              </div>

              <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-border pt-7 sm:grid-cols-2">
                {quickDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted sm:text-sm">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-base font-medium text-text-primary">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
