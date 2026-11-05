import type { Experience } from "@/types/portfolio";

export const experience = [
  {
    id: "annual-tech-fest",
    title: "Annual Tech Fest",
    role: "Event Coordinator",
    type: "Leadership / Event Coordination",
    period: "Annual",
    highlights: [
      "Coordinated approximately 30 volunteers",
      "Supported an event involving more than 2000 participants",
    ],
    visible: true,
  },
  {
    id: "smart-india-hackathon-2024",
    title: "Smart India Hackathon 2024",
    type: "Hackathon / Innovation Experience",
    year: "2024",
    highlights: ["Developed an innovation prototype"],
    visible: true,
  },
  {
    id: "edunextg",
    title: "EduNextG",
    type: "Details pending verification",
    highlights: [],
    visible: false,
  },
] satisfies Experience[];
