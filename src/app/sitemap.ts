import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { hasPublishedCaseStudy } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter(hasPublishedCaseStudy)
    .map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
