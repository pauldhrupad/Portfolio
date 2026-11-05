import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";
import { isValidHttpUrl } from "@/lib/urls";

const linkClassName = "inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-text-secondary transition-colors duration-[var(--duration-fast)] hover:text-accent-primary";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary/50 py-8 sm:py-10">
      <Container size="wide">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12">
          <div className="flex items-start gap-4">
            <Link aria-label="DP — Dhrupad Paul home" className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border-strong bg-surface font-mono font-semibold hover:border-accent-primary" href="/#top" prefetch={false}>
              DP<span aria-hidden="true" className="text-accent-primary">.</span>
            </Link>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">{profile.primaryRole}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
              <li><Link className={linkClassName} href="/#about" prefetch={false}>About</Link></li>
              <li><Link className={linkClassName} href="/#projects" prefetch={false}>Projects</Link></li>
              <li><Link className={linkClassName} href="/#contact" prefetch={false}>Contact</Link></li>
              <li><a className={linkClassName} href={`mailto:${profile.email}`}><Mail aria-hidden="true" className="size-3.5" />Email</a></li>
              <li><a className={linkClassName} href={profile.socialLinks.github} rel="noreferrer" target="_blank">GitHub<ArrowUpRight aria-hidden="true" className="size-3.5" /></a></li>
              <li><a className={linkClassName} download href={profile.resumePath}><FileText aria-hidden="true" className="size-3.5" />Résumé</a></li>
              {isValidHttpUrl(profile.socialLinks.linkedin) && (
                <li><a className={linkClassName} href={profile.socialLinks.linkedin} rel="noreferrer" target="_blank">LinkedIn<ArrowUpRight aria-hidden="true" className="size-3.5" /></a></li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <p className="text-xs leading-6 text-text-muted">© {new Date().getFullYear()} {profile.name}</p>
          <Link className={linkClassName} href="/#top" prefetch={false}>Back to top <ArrowUp aria-hidden="true" className="size-4" /></Link>
        </div>
      </Container>
    </footer>
  );
}
