import type { AnchorHTMLAttributes } from "react";
import { ArrowUpRight, GitFork, Link as LinkIcon, Mail } from "lucide-react";
import { ButtonLink } from "./Button";

type SocialPlatform = "email" | "external" | "github" | "linkedin";

type SocialLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "aria-label" | "children" | "href"
> & {
  href: string;
  label: string;
  platform: SocialPlatform;
  showLabel?: boolean;
  disabled?: boolean;
};

const platformIcons = {
  email: Mail,
  external: ArrowUpRight,
  github: GitFork,
  linkedin: LinkIcon,
} satisfies Record<SocialPlatform, typeof GitFork>;

export function SocialLink({
  className,
  href,
  label,
  platform,
  showLabel = true,
  ...props
}: SocialLinkProps) {
  if (!href) {
    return null;
  }

  const Icon = platformIcons[platform];

  return (
    <ButtonLink
      aria-label={label}
      className={className}
      href={href}
      size="sm"
      variant={showLabel ? "secondary" : "icon"}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      {showLabel ? <span>{label}</span> : null}
    </ButtonLink>
  );
}
