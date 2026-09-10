import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialLink } from "@/components/ui/SocialLink";
import { profile } from "@/data/profile";
import { isValidHttpUrl } from "@/lib/urls";

export function Contact() {
  const linkedInIsConfigured = isValidHttpUrl(profile.socialLinks.linkedin);

  return (
    <section
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-[var(--space-section)]"
      id="contact"
    >
      <div aria-hidden="true" className="contact-network-lines absolute inset-0 opacity-55" />
      <Container size="wide" className="relative">
        <SectionReveal distance={18}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(28rem,1.2fr)] lg:gap-16">
            <div>
              <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-accent-primary">
                06 / CONTACT
              </p>
              <h2
                className="mt-4 max-w-xl text-[clamp(2.8rem,7vw,6rem)] text-balance font-semibold leading-[0.94] tracking-[-0.06em] text-text-primary"
                id="contact-title"
              >
                Let&apos;s build something useful.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                Have a project, collaboration, or engineering problem in mind? Share the useful details and I’ll respond as soon as I can.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SocialLink
                  href={`mailto:${profile.email}`}
                  label="Email"
                  platform="email"
                />
                <SocialLink
                  href={profile.socialLinks.github}
                  label="GitHub"
                  platform="github"
                  target="_blank"
                />
                {linkedInIsConfigured ? (
                  <a
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-text-secondary transition-[border-color,background-color,color] duration-[var(--duration-fast)] hover:border-border-emphasis hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
                    href={profile.socialLinks.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </div>

              <a
                className="mt-6 inline-flex items-center gap-2 break-all text-sm text-text-secondary transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
                href={`mailto:${profile.email}`}
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                {profile.email}
              </a>
            </div>

            <div className="neu-panel rounded-[var(--radius-lg)] border border-border p-5 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
