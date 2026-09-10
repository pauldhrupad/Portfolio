import type { SkillConstellationNode, SkillGroup } from "@/types/portfolio";

export const skillGroups = [
  {
    id: "programming",
    label: "Programming",
    skills: ["Java", "Python", "JavaScript"],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: ["HTML5", "CSS3", "React.js", "Vite"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    id: "database",
    label: "Database",
    skills: ["MongoDB", "MongoDB Atlas", "Mongoose"],
  },
  {
    id: "authentication",
    label: "Authentication / Backend",
    skills: ["JWT", "bcrypt"],
  },
  {
    id: "services",
    label: "Services",
    skills: ["Cloudinary", "Nodemailer", "Socket.io"],
  },
  {
    id: "testing",
    label: "Testing",
    skills: ["Vitest", "Supertest", "MongoDB Memory Server"],
  },
  {
    id: "developer-tools",
    label: "Tools",
    skills: ["Git", "GitHub"],
  },
  {
    id: "design",
    label: "Design",
    skills: ["Figma", "Adobe Photoshop"],
  },
  {
    id: "deployment",
    label: "Deployment",
    skills: ["Vercel", "Render"],
  },
] satisfies SkillGroup[];

export const primarySkillConstellation = [
  { skill: "React.js", label: "React", position: "left-1/2 top-[12%] -translate-x-1/2" },
  { skill: "JavaScript", label: "JavaScript", position: "left-[7%] top-[42%]" },
  { skill: "Express.js", label: "Express", position: "right-[7%] top-[42%]" },
  { skill: "Node.js", label: "Node.js", position: "bottom-[10%] left-[21%]" },
  { skill: "MongoDB", label: "MongoDB", position: "bottom-[10%] right-[21%]" },
] satisfies SkillConstellationNode[];
