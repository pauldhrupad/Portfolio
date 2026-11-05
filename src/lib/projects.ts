import type { Project, ProjectCaseStudy } from "@/types/portfolio";

export function hasPublishedCaseStudy(
  project: Project,
): project is Project & { caseStudy: ProjectCaseStudy } {
  return project.caseStudy !== undefined;
}
