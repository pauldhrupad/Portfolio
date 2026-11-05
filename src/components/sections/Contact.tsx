import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { SocialLink } from "@/components/ui/SocialLink";
import { profile } from "@/data/profile";
import { isValidHttpUrl } from "@/lib/urls";

export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="relative border-t border-border py-[var(--space-section)]" id="contact">
      <Container size="wide">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionReveal distance={10}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-primary">06 / CONTACT</p>
            <h2 className="mt-4 max-w-xl text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.055em]" id="contact-title">
              Start a conversation.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-text-secondary sm:text-lg">
              Have a role, project, or collaboration in mind? Send a little context, or reach me directly by email.
            </p>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Direct email</p>
              <a className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-base font-semibold hover:text-accent-primary sm:text-lg" href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" className="size-4 shrink-0" /><span className="min-w-0 wrap-anywhere">{profile.email}</span>
              </a>
              <div className="mt-5 flex flex-wrap items-start gap-3">
                <ButtonLink href={`mailto:${profile.email}`} size="sm">
                  Email me <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
                <CopyEmailButton email={profile.email} />
              </div>
            </div>
            <div aria-label="Social profiles" className="mt-5 flex flex-wrap gap-3">
              <SocialLink href={profile.socialLinks.github} label="GitHub" platform="github" target="_blank" />
              {isValidHttpUrl(profile.socialLinks.linkedin) && (
                <SocialLink href={profile.socialLinks.linkedin} label="LinkedIn" platform="linkedin" target="_blank" />
              )}
            </div>
          </SectionReveal>

          <SectionReveal className="min-w-0 rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-8" distance={10}>
            <ContactForm email={profile.email} />
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
