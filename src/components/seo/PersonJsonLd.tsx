import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { isValidHttpUrl } from "@/lib/urls";

export function PersonJsonLd() {
  const sameAs = [
    profile.socialLinks.github,
    ...(isValidHttpUrl(profile.socialLinks.linkedin) ? [profile.socialLinks.linkedin] : []),
  ];
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    jobTitle: profile.primaryRole,
    description: profile.seoDescription,
    sameAs,
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      type="application/ld+json"
    />
  );
}
