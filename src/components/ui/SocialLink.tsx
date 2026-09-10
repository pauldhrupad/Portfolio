import type { AnchorHTMLAttributes } from "react";
import { ArrowUpRight, GitFork, Link as LinkIcon, Mail } from "lucide-react";
import { cn } from "@/lib/cn";

type SocialPlatform = "email" | "external" | "github" | "linkedin";

type SocialLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "aria-label" | "children" | "href"
> & {
  href: string;
  label: string;
  platform: SocialPlatform;
  showLabel?: boolean;
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
  rel,
  showLabel = true,
  target,
  ...props
}: SocialLinkProps) {
  if (!href) {
    return null;
  }

  const Icon = platformIcons[platform];

  return (
    <a
      aria-label={label}
      className={cn(
        "tactile-button inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border bg-surface px-3.5 text-sm font-medium text-text-secondary transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-border-emphasis hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary",
        !showLabel && "size-11 p-0",
        className,
      )}
      href={href}
      rel={target === "_blank" ? (rel ?? "noreferrer") : rel}
      target={target}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      {showLabel ? <span>{label}</span> : null}
    </a>
  );
}
