import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";
import { isValidHttpUrl } from "@/lib/urls";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const linkedInIsConfigured = isValidHttpUrl(profile.socialLinks.linkedin);

  return (
    <footer className="border-t border-border bg-background-secondary/55 py-8 sm:py-10">
      <Container size="wide">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              className="inline-flex min-h-11 items-center rounded-full font-mono text-lg font-semibold tracking-[-0.04em] text-text-primary transition-colors duration-[var(--duration-fast)] hover:text-accent-primary"
              href="/#top"
            >
              DP<span className="text-accent-primary">.</span>
            </Link>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-text-primary">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{profile.primaryRole}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-text-secondary">
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
                  href={profile.socialLinks.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </li>
              {linkedInIsConfigured ? (
                <li>
                  <a
                    className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
                    href={profile.socialLinks.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
                  href={`mailto:${profile.email}`}
                >
                  <Mail aria-hidden="true" className="size-3.5" /> Email
                </a>
              </li>
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
                  href={profile.resumePath}
                >
                  <FileText aria-hidden="true" className="size-3.5" /> Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {profile.name}</p>
          <p>Built with Next.js, React &amp; Three.js</p>
        </div>
      </Container>
    </footer>
  );
}
