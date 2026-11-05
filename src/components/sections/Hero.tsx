import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal, ScrollLayer } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SocialLink } from "@/components/ui/SocialLink";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { hasPublishedCaseStudy } from "@/lib/projects";

const featuredProject = projects.find((project) => project.featured);

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-svh items-center overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-28"
      id="top"
    >
      <Container size="wide">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:gap-4 xl:gap-10">
          <ScrollLayer className="relative z-10 min-w-0 max-w-3xl" distance={-10}>
            <Reveal delay={0.12} distance={10}>
              <p className="font-mono text-sm font-medium tracking-[0.14em] text-accent-primary-soft sm:text-base">
                Hello, I&apos;m
              </p>
            </Reveal>

            <Reveal delay={0.22} distance={16}>
              <h1
                className="mt-4 text-[clamp(3.4rem,15vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-text-primary sm:mt-5 lg:text-[clamp(5.5rem,9vw,8.4rem)]"
                id="hero-title"
              >
                <span className="block">DHRUPAD</span>
                <span className="mt-[0.16em] block text-text-secondary">PAUL</span>
              </h1>
            </Reveal>

            <Reveal delay={0.42} distance={14}>
              <p className="mt-6 text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium leading-tight tracking-[-0.025em] text-text-primary sm:mt-8">
                {profile.primaryRole}
              </p>

              <p className="mt-4 max-w-2xl break-words text-base leading-7 text-text-secondary sm:mt-5 sm:text-lg sm:leading-8">
                {profile.summary}
              </p>
            </Reveal>

            {(profile.showLocation || profile.openToWork) && (
              <Reveal delay={0.58} distance={12}>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-text-muted sm:mt-6">
                  {profile.showLocation ? (
                    <span className="inline-flex items-center gap-2">
                      <MapPin aria-hidden="true" className="size-4 text-text-secondary" />
                      {profile.location}
                    </span>
                  ) : null}
                  {profile.openToWork ? (
                    <span className="inline-flex items-center gap-2 text-success">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-success shadow-[0_0_0.75rem_rgb(102_217_168/0.7)]"
                      />
                      Open to opportunities
                    </span>
                  ) : null}
                </div>
              </Reveal>
            )}

            {featuredProject ? (
              <Reveal delay={0.64} distance={10}>
                <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted">
                  <span className="font-mono uppercase tracking-[0.12em]">
                    Featured project
                  </span>
                  <span aria-hidden="true">/</span>
                  <a
                    className="inline-flex items-center gap-1.5 font-semibold text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-accent-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
                    href={
                      hasPublishedCaseStudy(featuredProject)
                        ? `/projects/${featuredProject.slug}`
                        : featuredProject.demo ?? featuredProject.github
                    }
                  >
                    {featuredProject.title}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={0.7} distance={12}>
              <div className="mt-6 grid w-full gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center">
                <ButtonLink
                  className="w-full min-h-12 px-4 text-sm sm:w-auto sm:min-h-14 sm:px-6 sm:text-base"
                  href="#projects"
                  size="lg"
                >
                  View Selected Work
                  <ArrowDown aria-hidden="true" className="size-4" />
                </ButtonLink>
                <ButtonLink
                  className="w-full min-h-12 px-4 text-sm sm:w-auto sm:min-h-14 sm:px-6 sm:text-base"
                  download
                  href={profile.resumePath}
                  size="lg"
                  variant="secondary"
                >
                  Download Resume
                </ButtonLink>
                <SocialLink
                  className="w-full sm:w-auto"
                  href={profile.socialLinks.github}
                  label="GitHub"
                  platform="github"
                  target="_blank"
                />
                <ButtonLink
                  className="w-full min-h-12 px-4 text-sm sm:w-auto"
                  href="#contact"
                  variant="ghost"
                >
                  Contact
                </ButtonLink>
              </div>
            </Reveal>
          </ScrollLayer>

          <Reveal
            className="relative min-h-[20rem] min-w-0 max-w-full lg:min-h-0"
            delay={0.28}
            distance={12}
            scale={0.96}
          >
            <ScrollLayer className="min-w-0 max-w-full" distance={-18}>
              <div className="hero-editorial" aria-hidden="true">
                <span className="hero-emboss">DEVELOPER</span>
                <div className="editorial-sheet">
                  <div className="editorial-topline"><span>DP / DEVELOPMENT</span><span>01</span></div>
                  <span className="editorial-symbol">&#123; &#125;</span>
                  <p>Systems.<br />Interfaces.<br /><em>Useful software.</em></p>
                  <div className="editorial-stack">REACT / NODE.JS / MONGODB</div>
                </div>
                <div className="editorial-caption">FULL-STACK THINKING · BACKEND FOCUS</div>
              </div>
            </ScrollLayer>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
