import { profile } from "@/data/profile";

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: `${profile.name} Portfolio`,
  title: `${profile.name} | ${profile.primaryRole}`,
  description: profile.seoDescription,
  url: configuredUrl.replace(/\/$/, ""),
  socialImage: "/og.webp",
} as const;
