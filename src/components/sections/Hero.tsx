import { ArrowDown, ArrowRight, ArrowUpRight, Download, GitBranch, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { hasPublishedCaseStudy } from "@/lib/projects";
import { HeroVisual } from "./HeroVisual";

const featuredProject = projects.find((project) => project.featured);

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pb-10 pt-[calc(var(--nav-offset)+1.25rem)] sm:pb-16 sm:pt-36 lg:pt-40" id="top">
      <Container size="wide">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent-primary lg:hidden">
              Developer portfolio
            </p>
            <div className="hidden lg:block">
              <p className="font-mono text-sm font-medium tracking-[0.06em] text-accent-primary">
                {profile.primaryRole}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
                {profile.name}
              </p>
            </div>

            <h1 className="mt-2 text-[clamp(2.25rem,11.25vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-text-primary lg:mt-6 lg:max-w-[14ch] lg:text-[clamp(2.125rem,5.1vw,5rem)]" id="hero-title">
              <span className="block uppercase lg:hidden">{profile.name}</span>
              <span className="hidden lg:inline">
                Building thoughtful <span className="text-accent-primary">interfaces</span> and reliable backend systems.
              </span>
            </h1>
            <p className="mt-3 text-lg leading-snug font-semibold text-text-primary lg:hidden">{profile.primaryRole}</p>
            <p className="mt-3 max-w-[52ch] text-base leading-7 text-text-secondary sm:text-lg sm:leading-8 lg:mt-6">
              {profile.summary}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-text-muted sm:text-sm lg:order-last lg:mt-5 lg:gap-x-6 lg:gap-y-3">
              {profile.showLocation && (
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="size-3.5" /> {profile.location}
                </span>
              )}
              {profile.openToWork && (
                <span className="inline-flex items-center gap-2 text-success">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                  Open to opportunities
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap lg:mt-7 lg:gap-3">
              <ButtonLink className="max-sm:min-h-12" href="#projects" size="lg">
                <span className="lg:hidden">View My Projects</span>
                <span className="hidden lg:inline">Explore Projects</span>
                <ArrowDown aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink className="max-sm:min-h-12" download href={profile.resumePath} size="lg" variant="secondary">
                <Download aria-hidden="true" className="size-4" /> Download Resume
              </ButtonLink>
            </div>
            <div className="mt-2 flex flex-wrap gap-1 lg:mt-3">
              <ButtonLink href={profile.socialLinks.github} size="sm" target="_blank" variant="ghost">
                <GitBranch aria-hidden="true" className="size-4" /> GitHub
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </ButtonLink>
              <ButtonLink href="#contact" size="sm" variant="ghost">
                Contact Me <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </div>
          </div>

          <SectionReveal className="min-w-0" distance={6} amount={0.1}>
            <HeroVisual />
          </SectionReveal>
        </div>

        {featuredProject && (
          <SectionReveal className="mt-6 sm:mt-14" distance={6}>
            <a
              className="group flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-text-secondary transition-colors hover:text-text-primary sm:py-5"
              href={
                hasPublishedCaseStudy(featuredProject)
                  ? `/projects/${featuredProject.slug}`
                  : featuredProject.demo ?? featuredProject.github
              }
            >
              <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Featured project</span>
                <span className="font-semibold text-text-primary">{featuredProject.title}</span>
                <span className="hidden md:inline">{featuredProject.category}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-accent-primary">
                {hasPublishedCaseStudy(featuredProject) ? "Read case study" : "Explore project"}
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </span>
            </a>
          </SectionReveal>
        )}
      </Container>
    </section>
  );
}
