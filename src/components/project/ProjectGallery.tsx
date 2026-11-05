"use client";

import dynamic from "next/dynamic";
import { Component, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { ButtonLink } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/types/portfolio";
import { hasPublishedCaseStudy } from "@/lib/projects";

const GalleryCanvas = dynamic(() => import("@/components/three/GalleryCanvas"), { ssr: false });

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const { resolved } = useTheme();
  const project = projects[selected];
  const move = (direction: number) => setSelected((current) => (current + direction + projects.length) % projects.length);

  function handleToolbarKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  return <div className="mt-12" role="region" aria-label="Selected project gallery">
    <div className="gallery-stage" aria-hidden="true">
      <div className="gallery-fallback">
        {projects.map((item, index) => <div className="gallery-preview" data-active={selected === index} key={item.slug}><span /><span /><span /><span /></div>)}
      </div>
      <CanvasBoundary><GalleryCanvas selected={selected} dark={resolved === "dark"} count={projects.length} /></CanvasBoundary>
    </div>
    <div className="gallery-toolbar glass-panel" onKeyDown={handleToolbarKeyDown}>
      <button type="button" aria-label="Previous project" onClick={() => move(-1)}><ArrowLeft size={18} /></button>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm">{String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        <div aria-label="Choose a project" className="gallery-dots" role="group">
          {projects.map((item, index) => (
            <button
              aria-label={`Show ${item.title}`}
              aria-pressed={selected === index}
              className="gallery-dot"
              key={item.slug}
              onClick={() => setSelected(index)}
              type="button"
            />
          ))}
        </div>
      </div>
      <button type="button" aria-label="Next project" onClick={() => move(1)}><ArrowRight size={18} /></button>
    </div>
    <p className="mt-3 text-center font-mono text-xs text-text-muted">Illustrative preview · {project.previewTitle}</p>
    <div className="gallery-info glass-panel" aria-live="polite" aria-atomic="true">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent-primary-soft">{project.category}{project.status ? ` / ${project.status.replace("-", " ")}` : ""}</p>
        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-5 text-base leading-7 text-text-secondary">{project.shortDescription}</p>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-wrap gap-2">{(project.homepageTechnologies ?? project.technologies).map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}</div>
        <div className="flex flex-wrap gap-3">
          {hasPublishedCaseStudy(project) && <ButtonLink href={`/projects/${project.slug}`}>View Case Study <ArrowRight size={16} aria-hidden="true" /></ButtonLink>}
          {project.demo && <ButtonLink href={project.demo} target="_blank" variant="secondary">Live Demo <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>}
          {project.github && <ButtonLink href={project.github} target="_blank" variant="secondary">GitHub <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>}
        </div>
      </div>
    </div>
  </div>;
}
