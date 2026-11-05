import type { SkillConstellationNode, SkillGroup } from "@/types/portfolio";

export const skillGroups = [
  {
    id: "programming",
    label: "Programming Languages",
    description: "JavaScript application flows and typed game rules.",
    skills: ["JavaScript", "TypeScript"],
    additionalSkills: ["Java", "Python"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator", "4d-chess"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Component-based interfaces, application routing, and responsive styling.",
    skills: ["React", "Next.js", "Tailwind CSS"],
    additionalSkills: ["HTML5", "CSS3"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator", "4d-chess"],
  },
  {
    id: "backend",
    label: "Backend",
    description: "Server routes, REST APIs, uploads, and email workflows.",
    skills: ["Node.js", "Express", "REST APIs", "Cloudinary", "Nodemailer"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator"],
  },
  {
    id: "database",
    label: "Databases",
    description: "Document models, order snapshots, and transactional workflows.",
    skills: ["MongoDB", "Mongoose", "MongoDB Atlas"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator"],
  },
  {
    id: "authentication",
    label: "Authentication / Security",
    description: "Credentials, sessions, and server-enforced access boundaries.",
    skills: ["Auth.js", "JWT", "bcryptjs"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator"],
  },
  {
    id: "testing",
    label: "Testing",
    description: "Business-rule checks and database-backed HTTP integration tests.",
    skills: ["Vitest", "Supertest", "MongoDB Memory Server"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator"],
  },
  {
    id: "tools",
    label: "Tools and Deployment",
    description: "Source control, build tooling, and application hosting.",
    skills: ["Git", "GitHub", "Vite", "Vercel", "Render"],
    additionalSkills: ["Figma", "Adobe Photoshop"],
    projectSlugs: ["gharkabite", "co-parenting-coordinator", "4d-chess"],
  },
  {
    id: "graphics",
    label: "3D / Graphics",
    description: "Cube-surface rendering, pointer picking, and camera controls.",
    skills: ["Three.js", "OrbitControls", "Raycasting"],
    projectSlugs: ["4d-chess"],
  },
] satisfies SkillGroup[];

export const primarySkillConstellation = [
  { skill: "React.js", label: "React", position: "left-1/2 top-[12%] -translate-x-1/2" },
  { skill: "JavaScript", label: "JavaScript", position: "left-[7%] top-[42%]" },
  { skill: "Express.js", label: "Express", position: "right-[7%] top-[42%]" },
  { skill: "Node.js", label: "Node.js", position: "bottom-[10%] left-[21%]" },
  { skill: "MongoDB", label: "MongoDB", position: "bottom-[10%] right-[21%]" },
] satisfies SkillConstellationNode[];
