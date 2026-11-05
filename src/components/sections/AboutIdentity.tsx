import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Profile } from "@/types/portfolio";

export function AboutIdentity({ profile }: { profile: Profile }) {
  const initials = profile.name.split(" ").map((part) => part[0]).join("");

  return (
    <article className="about-identity relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-strong p-6 sm:p-8">
      <div aria-hidden="true" className="about-identity-grid absolute inset-0" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Developer / Creative</p>
        <div aria-hidden="true" className="my-7 flex size-28 items-center justify-center rounded-full border border-border-strong bg-surface text-5xl font-semibold tracking-[-0.07em] text-text-primary sm:my-9">
          {initials}<span className="text-accent-primary">.</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">{profile.name}</h3>
        <p className="mt-2 max-w-[24ch] text-base leading-7 text-text-secondary">{profile.primaryRole}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.focusAreas.map((area) => <Badge key={area} variant="accent">{area}</Badge>)}
        </div>

        <div className="mt-auto space-y-4 pt-8">
          {profile.showLocation && (
            <p className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-accent-primary" /> {profile.location}
            </p>
          )}
          {profile.openToWork && (
            <div className="border-t border-border pt-4">
              <p className="flex items-center gap-2 text-sm text-success">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-success" /> Open to opportunities
              </p>
              <a className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-text-primary hover:text-accent-primary" href="#contact">
                Let&apos;s connect <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
