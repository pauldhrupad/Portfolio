import type { CoordinationCaseStudy, Project } from "@/types/portfolio";

export function hasPublishedCaseStudy(
  project: Project,
): project is Project & { caseStudy: CoordinationCaseStudy } {
  // Additional case-study templates are scheduled for Phase 4.
  return project.caseStudy?.kind === "coordination";
}
