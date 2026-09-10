"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navigationItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

type NavigationProps = {
  githubUrl: string;
  resumePath: string;
};

export function Navigation({ githubUrl, resumePath }: NavigationProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const topSentinelRef = useRef<HTMLSpanElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const sentinel = topSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        const mostVisible = [...visibility.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((left, right) => right[1] - left[1])[0];

        if (mostVisible) {
          setActiveId(mostVisible[0]);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.01, 0.25, 0.5],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const menu = document.getElementById("mobile-navigation");
      const focusableElements = menu?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-px"
        ref={topSentinelRef}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <Container className="pt-4">
          <nav
            aria-label="Primary navigation"
            className={cn(
              "glass-panel pointer-events-auto flex h-16 items-center rounded-[var(--radius-pill)] px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-standard)] sm:px-4",
              isScrolled || isOpen
                ? "shadow-[var(--shadow-floating)]"
                : "shadow-[var(--shadow-floating-soft)]",
            )}
          >
            <Link
              aria-label="Dhrupad Paul — home"
              className="inline-flex min-h-11 items-center rounded-full px-3 font-mono text-lg font-semibold tracking-[-0.04em] text-text-primary transition-colors duration-[var(--duration-fast)] hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              href="/#top"
            >
              DP<span className="text-accent-primary">.</span>
            </Link>

            <ul className="hidden items-center gap-1 xl:flex">
              {navigationItems.map(({ id, label }) => {
                const isActive = activeId === id;

                return (
                  <li key={id}>
                    <Link
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium transition-[color,background-color] duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                        isActive
                          ? "bg-surface text-text-primary shadow-[var(--shadow-inset)]"
                          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                      )}
                      href={`/#${id}`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-1.5 xl:flex">
              <a
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-text-secondary transition-[color,background-color] duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
                href={githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
              <a
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-accent-primary bg-accent-primary px-4 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-[var(--duration-fast)] hover:border-accent-primary-hover hover:bg-accent-primary-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
                href={resumePath}
              >
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </a>
              </div>

              <ThemeToggle />
              <button
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-[var(--shadow-raised-control)] transition-[background-color,border-color,transform] duration-[var(--duration-fast)] hover:border-border-emphasis hover:bg-surface-hover active:translate-y-0.5 active:shadow-[var(--shadow-inset)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary xl:hidden"
              onClick={() => (isOpen ? closeMenu(true) : setIsOpen(true))}
              ref={menuButtonRef}
              type="button"
            >
              {isOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <div
        aria-hidden={!isOpen}
        aria-label="Mobile navigation menu"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-40 bg-background/90 px-[var(--space-gutter)] pb-8 pt-24 backdrop-blur-lg transition-[opacity,visibility] duration-[var(--duration-base)] ease-[var(--ease-standard)] xl:hidden",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        id="mobile-navigation"
        inert={!isOpen}
        role="dialog"
      >
        <nav aria-label="Mobile navigation" className="mx-auto flex min-h-full max-w-2xl flex-col">
          <div className="mb-2 flex justify-end">
            <button
              aria-label="Close navigation menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-[var(--shadow-raised-control)] active:translate-y-0.5 active:shadow-[var(--shadow-inset)]"
              onClick={() => closeMenu(true)}
              type="button"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="mobile-theme-row mb-4 flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface p-3 shadow-[var(--shadow-inset)]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
              Appearance
            </span>
            <ThemeToggle />
          </div>
          <ul className="grid gap-1">
            {navigationItems.map(({ id, label }, index) => {
              const isActive = activeId === id;

              return (
                <li key={id}>
                  <Link
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between rounded-[var(--radius-md)] px-4 text-2xl font-semibold tracking-[-0.03em] transition-[color,background-color,transform] duration-[var(--duration-fast)] hover:bg-surface-hover active:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                      isActive ? "text-accent-primary-soft" : "text-text-primary",
                    )}
                    href={`/#${id}`}
                    onClick={() => closeMenu(true)}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                  >
                    {label}
                    <span aria-hidden="true" className="font-mono text-sm text-text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface text-base font-semibold text-text-primary transition-colors duration-[var(--duration-fast)] hover:border-border-emphasis hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent-primary bg-accent-primary text-base font-semibold text-white transition-colors duration-[var(--duration-fast)] hover:border-accent-primary-hover hover:bg-accent-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              href={resumePath}
            >
              <FileText aria-hidden="true" className="size-4" />
              Resume
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
