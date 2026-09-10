import type { Education } from "@/types/portfolio";

export const education = [
  {
    institution: "Sister Nivedita University",
    qualification: "B.Tech in Computer Science and Engineering",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    featured: true,
    shortQualification: "B.Tech CSE",
    programCode: "CSE",
    year: "Expected 2026",
    resultLabel: "CGPA",
    result: "7.50",
  },
  {
    institution: "National Gems Higher Secondary School",
    qualification: "ISC Class XII",
    featured: false,
    year: "2023",
    resultLabel: "Percentage",
    result: "86.9%",
  },
  {
    institution: "National Gems Higher Secondary School",
    qualification: "ICSE Class X",
    featured: false,
    year: "2020",
    resultLabel: "Percentage",
    result: "89.9%",
  },
] satisfies Education[];
