import type { Profile } from "@/types/portfolio";

export const profile = {
  name: "Dhrupad Paul",
  primaryRole: "Full-Stack & Backend Developer",
  focusAreas: ["Full-Stack", "Backend"],
  location: "Kolkata, India",
  email: "dhrupadpaul04@gmail.com",
  resumePath: "/resume/Dhrupad-Paul-Resume.pdf",
  summary:
    "Computer Science student building practical full-stack applications with React, Node.js, Express, and MongoDB, with a growing focus on backend engineering and production-ready systems.",
  seoDescription:
    "Portfolio of Dhrupad Paul, a Computer Science student and full-stack developer building web applications with React, Node.js, Express and MongoDB.",
  socialLinks: {
    github: "https://github.com/pauldhrupad",
    linkedin: "",
  },
  showLocation: true,
  openToWork: true,
} satisfies Profile;
