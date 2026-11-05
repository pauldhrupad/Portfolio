"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Box, Braces, Database, FlaskConical, KeyRound, MonitorSmartphone, ServerCog, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/cn";
import type { Project, SkillGroup, SkillGroupId } from "@/types/portfolio";

type SkillsExplorerProps = {
  groups: SkillGroup[];
  projects: Pick<Project, "slug" | "title">[];
};

const categoryIcons: Record<SkillGroupId, LucideIcon> = {
  programming: Braces,
  frontend: MonitorSmartphone,
  backend: ServerCog,
  database: Database,
  authentication: KeyRound,
  testing: FlaskConical,
  tools: Wrench,
  graphics: Box,
};

export function SkillsExplorer({ groups, projects }: SkillsExplorerProps) {
  const [selectedId, setSelectedId] = useState<SkillGroupId | "all">("all");
  const visibleGroups = selectedId === "all" ? groups : groups.filter((group) => group.id === selectedId);

  return (
    <div>
      <div aria-label="Skill categories" className="flex flex-wrap gap-2" role="group">
        <Button aria-controls="skills-grid" aria-pressed={selectedId === "all"} onClick={() => setSelectedId("all")} size="sm" variant={selectedId === "all" ? "primary" : "secondary"}>
          All categories
        </Button>
        {groups.map((group) => (
          <Button
            aria-controls="skills-grid"
            aria-pressed={selectedId === group.id}
            className="whitespace-normal text-left"
            key={group.id}
            onClick={() => setSelectedId(group.id)}
            size="sm"
            variant={selectedId === group.id ? "primary" : "secondary"}
          >
            {group.label}
          </Button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {selectedId === "all" ? `Showing all ${groups.length} skill categories` : `Showing ${visibleGroups[0]?.label}`}
      </p>

      <div
        className={cn("mt-6 grid grid-cols-[minmax(0,1fr)] gap-4", selectedId === "all" ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-3xl")}
        id="skills-grid"
      >
        {visibleGroups.map((group) => {
          const Icon = categoryIcons[group.id];
          const examples = projects.filter((project) => group.projectSlugs.includes(project.slug));

          return (
            <article
              aria-labelledby={`skill-${group.id}-title`}
              className={cn(
                "flex min-w-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors duration-[var(--duration-base)] hover:border-border-strong sm:p-6",
                selectedId === "all" && group.id === "frontend" && "lg:col-span-2",
              )}
              key={group.id}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface-recessed text-accent-primary">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>
                <h3 className="text-xl font-semibold leading-snug tracking-tight" id={`skill-${group.id}-title`}>{group.label}</h3>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-6 text-text-secondary">{group.description}</p>
              <ul aria-label="Project technologies" className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => <li key={skill}><TechBadge>{skill}</TechBadge></li>)}
              </ul>
              {group.additionalSkills && (
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  <span className="text-text-muted">Additional toolkit: </span>{group.additionalSkills.join(" · ")}
                </p>
              )}
              <div className="mt-auto pt-6">
                <p className="border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-text-muted">Project examples</p>
                <ul className="mt-1 grid">
                  {examples.map((project) => (
                    <li key={project.slug}>
                      <Link className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-sm font-medium text-accent-primary hover:underline" href={`/projects/${project.slug}`}>
                        {project.title}<ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
