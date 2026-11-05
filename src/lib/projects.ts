import type { Project, PublishedCaseStudy } from "@/types/portfolio";

export function hasPublishedCaseStudy(
  project: Project,
): project is Project & { caseStudy: PublishedCaseStudy } {
  return project.caseStudy?.kind === "coordination" || project.caseStudy?.kind === "commerce";
}
