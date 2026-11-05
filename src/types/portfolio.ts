export type SocialLinks = {
  github: string;
  linkedin: string;
};

export type Profile = {
  name: string;
  primaryRole: string;
  focusAreas: string[];
  location: string;
  email: string;
  resumePath: string;
  summary: string;
  seoDescription: string;
  socialLinks: SocialLinks;
  showLocation: boolean;
  openToWork: boolean;
};

export type SkillGroupId =
  | "programming"
  | "frontend"
  | "backend"
  | "database"
  | "authentication"
  | "testing"
  | "tools"
  | "graphics";

export type SkillGroup = {
  id: SkillGroupId;
  label: string;
  description: string;
  skills: string[];
  additionalSkills?: string[];
  projectSlugs: string[];
};

export type SkillConstellationNode = {
  skill: string;
  label: string;
  position: string;
};

export type Education = {
  institution: string;
  qualification: string;
  degree?: string;
  field?: string;
  featured: boolean;
  shortQualification?: string;
  programCode?: string;
  year: string;
  resultLabel: "CGPA" | "Percentage";
  result: string;
};

export type ProjectStatus = "completed" | "in-progress" | "prototype";

export type CaseStudyTechnologyGroup = {
  label: string;
  technologies: string[];
};

export type CaseStudyFeatureGroup = {
  title: string;
  description: string;
};

export type CaseStudyWorkflow = {
  title: string;
  steps: string[];
};

export type CaseStudyArchitecture = {
  caption: string;
  layers: { label: string; value: string }[];
  externalServices: string[];
};

export type CaseStudyDeploymentItem = {
  layer: string;
  platform: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
} & (
  | { type: "text"; paragraphs: string[] }
  | { type: "list"; intro?: string; items: string[] }
  | { type: "features"; items: CaseStudyFeatureGroup[] }
  | { type: "workflows"; items: CaseStudyWorkflow[] }
  | { type: "architecture"; diagram: CaseStudyArchitecture }
  | { type: "deployment"; items: CaseStudyDeploymentItem[] }
);

export type ProjectCaseStudy = {
  seoDescription: string;
  heroSummary: string;
  technologyGroups: CaseStudyTechnologyGroup[];
  sections: CaseStudySection[];
};

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  year?: string;
  category: string;
  technologies: string[];
  homepageTechnologies?: string[];
  previewEyebrow: string;
  previewFeatures: string[];
  previewTitle: string;
  featured: boolean;
  github: string;
  demo?: string;
  media?: ProjectMedia;
  highlights: string[];
  status: ProjectStatus;
  caseStudy?: ProjectCaseStudy;
};

export type Experience = {
  id: string;
  title: string;
  role?: string;
  project?: string;
  type: string;
  year?: string;
  period?: string;
  highlights: string[];
  visible: boolean;
};

export type CreativeCredential = {
  title: string;
  category: "Creative Education";
};
