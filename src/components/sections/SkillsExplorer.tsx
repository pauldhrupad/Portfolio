"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Braces,
  CloudCog,
  Code2,
  Database,
  FlaskConical,
  KeyRound,
  MonitorSmartphone,
  Palette,
  Rocket,
  ServerCog,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { SkillConstellationNode, SkillGroup, SkillGroupId } from "@/types/portfolio";

type SkillsExplorerProps = {
  constellation: SkillConstellationNode[];
  groups: SkillGroup[];
};

const categoryIcons: Record<SkillGroupId, LucideIcon> = {
  programming: Braces,
  frontend: MonitorSmartphone,
  backend: ServerCog,
  database: Database,
  authentication: KeyRound,
  services: CloudCog,
  testing: FlaskConical,
  "developer-tools": Wrench,
  design: Palette,
  deployment: Rocket,
};

function TechConstellation({
  activeSkill,
  nodes,
}: {
  activeSkill: string;
  nodes: SkillConstellationNode[];
}) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-52 overflow-hidden rounded-[var(--radius-md)] border border-border bg-background-secondary/70 shadow-[var(--shadow-inset)] lg:block"
    >
      <svg className="absolute inset-0 size-full text-border-strong" viewBox="0 0 100 100">
        <line stroke="currentColor" strokeWidth="0.45" x1="50" x2="13" y1="20" y2="50" />
        <line stroke="currentColor" strokeWidth="0.45" x1="50" x2="87" y1="20" y2="50" />
        <line stroke="currentColor" strokeWidth="0.45" x1="13" x2="27" y1="50" y2="82" />
        <line stroke="currentColor" strokeWidth="0.45" x1="87" x2="73" y1="50" y2="82" />
        <line stroke="currentColor" strokeWidth="0.45" x1="27" x2="73" y1="82" y2="82" />
        <line stroke="currentColor" strokeWidth="0.35" x1="50" x2="27" y1="20" y2="82" />
        <line stroke="currentColor" strokeWidth="0.35" x1="50" x2="73" y1="20" y2="82" />
      </svg>

      <div className="absolute left-4 top-3 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
        Core stack constellation
      </div>

      {nodes.map((node) => {
        const isActive = activeSkill === node.skill;

        return (
          <div
            className={cn(
              "absolute flex min-h-9 items-center gap-2 rounded-full border px-3 font-mono text-xs transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--duration-base)]",
              node.position,
              isActive
                ? "scale-105 border-accent-primary/60 bg-accent-primary/15 text-accent-primary-soft shadow-[0_0_1.5rem_rgb(91_140_255/0.16)]"
                : "border-border-strong bg-surface text-text-secondary",
            )}
            key={node.skill}
          >
            <span
              className={cn(
                "size-1.5 rounded-full transition-colors duration-[var(--duration-fast)]",
                isActive ? "bg-accent-cyan" : "bg-text-muted",
              )}
            />
            {node.label}
          </div>
        );
      })}
    </div>
  );
}

export function SkillsExplorer({ constellation, groups }: SkillsExplorerProps) {
  const initialGroup = groups.find((group) => group.id === "frontend") ?? groups[0];
  const [selectedGroupId, setSelectedGroupId] = useState<SkillGroupId>(initialGroup.id);
  const [activeSkill, setActiveSkill] = useState(initialGroup.skills[2] ?? initialGroup.skills[0]);
  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? initialGroup;
  const SelectedIcon = categoryIcons[selectedGroup.id];

  function selectGroup(group: SkillGroup) {
    setSelectedGroupId(group.id);
    setActiveSkill(group.skills[0]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-6">
      <div
        aria-label="Skill categories"
        className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:content-start lg:overflow-visible lg:pb-0"
        role="group"
      >
        {groups.map((group, index) => {
          const Icon = categoryIcons[group.id];
          const isSelected = selectedGroup.id === group.id;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "tool-category group flex min-h-12 shrink-0 items-center gap-3 rounded-[var(--radius-md)] border px-4 text-left text-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary lg:w-full",
                isSelected
                  ? "border-accent-primary/35 text-text-primary"
                  : "border-border text-text-secondary hover:border-border-emphasis hover:text-text-primary",
              )}
              key={group.id}
              onClick={() => selectGroup(group)}
              type="button"
            >
              <span className="font-mono text-xs text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon
                aria-hidden="true"
                className={cn("size-4", isSelected && "text-accent-primary-soft")}
                strokeWidth={1.8}
              />
              <span>{group.label}</span>
            </button>
          );
        })}
      </div>

      <div className="neu-panel rounded-[var(--radius-lg)] border border-border p-5 sm:p-7 lg:p-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
              Selected category
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">
              {selectedGroup.label}
            </h3>
          </div>
          <span className="font-mono text-sm text-text-muted">
            {String(selectedGroup.skills.length).padStart(2, "0")} tools
          </span>
        </div>

        <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,9.5rem),1fr))] gap-3">
          {selectedGroup.skills.map((skill) => {
            const isActive = activeSkill === skill;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "skill-control flex min-h-14 items-center gap-3 rounded-[var(--radius-md)] border px-4 text-left text-sm font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-[var(--duration-fast)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary sm:text-base",
                  isActive
                    ? "border-accent-primary/40 text-text-primary"
                    : "border-border text-text-secondary hover:border-border-emphasis hover:text-text-primary",
                )}
                key={skill}
                onFocus={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                type="button"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                    isActive
                      ? "border-accent-primary/35 bg-accent-primary/10 text-accent-primary-soft"
                      : "border-border bg-surface text-text-muted",
                  )}
                >
                  {skill === "React.js" ? (
                    <Code2 aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  ) : (
                    <SelectedIcon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  )}
                </span>
                {skill}
              </button>
            );
          })}
        </div>

        <TechConstellation activeSkill={activeSkill} nodes={constellation} />
      </div>
    </div>
  );
}
