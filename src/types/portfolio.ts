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
  | "services"
  | "testing"
  | "developer-tools"
  | "design"
  | "deployment";

export type SkillGroup = {
  id: SkillGroupId;
  label: string;
  skills: string[];
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
  client: string;
  api: string;
  database: string;
  externalServices: string[];
};

export type CaseStudyDeploymentItem = {
  layer: string;
  platform: string;
};

type CaseStudyOverview = {
  seoDescription: string;
  heroSummary: string;
  context: string;
  problem: string;
  productGoal: string;
  technologyGroups: CaseStudyTechnologyGroup[];
  featureGroups: CaseStudyFeatureGroup[];
  testingPhilosophy: string;
  testingPractices: string[];
  deployment: CaseStudyDeploymentItem[];
  lessons: string[];
};

export type CoordinationCaseStudy = CaseStudyOverview & {
  kind: "coordination";
  architecture: CaseStudyArchitecture;
  authentication: string[];
  custodyWorkflows: CaseStudyWorkflow[];
  expenseWorkflows: CaseStudyWorkflow[];
  communicationAudit: string[];
};

export type ProjectCaseStudy =
  | CoordinationCaseStudy
  | (CaseStudyOverview & {
      kind: "commerce";
      architecture: CaseStudyArchitecture;
      authentication: string[];
      orderWorkflows: CaseStudyWorkflow[];
      paymentVerification: string[];
      subscriptions: string[];
    })
  | (CaseStudyOverview & {
      kind: "game";
      architecture: { client: string; engine: string; renderer: string };
      gameplayWorkflows: CaseStudyWorkflow[];
      cpuStrategy: string;
    });

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
  cover?: string;
  screenshots?: string[];
  highlights: string[];
  challenge?: string;
  solution?: string;
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
