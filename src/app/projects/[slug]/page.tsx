import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => project.caseStudy)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project?.caseStudy) {
    return {
      title: `Project Not Found | ${profile.name}`,
    };
  }

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.caseStudy.seoDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.title} | ${profile.name}`,
      description: project.caseStudy.seoDescription,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${project.title} | ${profile.name}`,
      description: project.caseStudy.seoDescription,
      images: [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project?.caseStudy) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
