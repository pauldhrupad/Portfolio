"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

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
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sections = pathname === "/"
      ? navigationItems.map(({ id }) => document.getElementById(id))
      : [];
    let frame = 0;

    function update() {
      frame = 0;
      const activationLine = Math.max(112, window.innerHeight / 4);
      const activeSection = sections.findLast(
        (section) => section && section.getBoundingClientRect().top <= activationLine,
      );

      setActiveId(activeSection?.id);
      setIsScrolled(window.scrollY > 16);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    function closeOnDesktop() {
      if (desktop.matches) dialogRef.current?.close();
    }

    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [isOpen]);

  function closeMenu() {
    dialogRef.current?.close();
  }

  function restoreFocus() {
    if (dialogRef.current?.open) return;
    setIsOpen(false);
    const trigger = menuButtonRef.current;
    const target = trigger?.getClientRects().length ? trigger : brandRef.current;
    target?.focus({ preventScroll: true });
  }

  function sectionLinks(mobile = false) {
    return navigationItems.map(({ id, label }, index) => {
      const active = pathname === "/" && activeId === id;

      return (
        <li key={id}>
          <Link
            aria-current={active ? "location" : undefined}
            className={cn(
              "flex min-h-11 items-center rounded-[var(--radius-sm)] px-3 font-medium transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-text-primary active:bg-surface-active",
              mobile ? "justify-between text-lg" : "whitespace-nowrap text-sm",
              active ? "bg-surface-active font-semibold text-accent-primary-soft" : "text-text-secondary",
            )}
            href={`/#${id}`}
            onClick={mobile ? closeMenu : undefined}
          >
            {label}
            {mobile && (
              <span aria-hidden="true" className="font-mono text-label text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </Link>
        </li>
      );
    });
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <Container className="pt-[var(--space-sm)]">
          <nav
            aria-label="Primary navigation"
            className={cn(
              "pointer-events-auto flex h-[var(--nav-height)] items-center justify-between gap-1 rounded-[var(--radius-lg)] border bg-surface-elevated px-[var(--space-xs)] transition-[border-color,box-shadow] duration-[var(--duration-base)] sm:gap-4 sm:px-[var(--space-md)] lg:gap-6",
              isScrolled ? "border-border-strong shadow-[var(--shadow-floating)]" : "border-border",
            )}
            data-scrolled={isScrolled}
          >
            <Link
              aria-label="DP — Dhrupad Paul home"
              className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface-recessed font-mono text-base font-semibold tracking-tight text-text-primary transition-colors hover:bg-surface-hover active:bg-surface-active"
              href="/#top"
              ref={brandRef}
            >
              DP<span aria-hidden="true" className="text-accent-primary">.</span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex xl:gap-2">{sectionLinks()}</ul>

            <div className="flex items-center gap-0.5 sm:gap-3">
              <div className="hidden lg:block">
                <ButtonLink href={githubUrl} size="sm" target="_blank" variant="ghost">
                  GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </ButtonLink>
              </div>
              <ButtonLink aria-label="Download résumé" download href={resumePath} size="sm">
                <FileText aria-hidden="true" className="hidden size-4 shrink-0 sm:block" />
                Résumé
              </ButtonLink>
              <ThemeToggle />
              <Button
                aria-controls="mobile-navigation"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-label="Open navigation menu"
                className="lg:hidden"
                onClick={() => {
                  dialogRef.current?.showModal();
                  setIsOpen(true);
                }}
                ref={menuButtonRef}
                variant="icon"
              >
                <Menu aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      <dialog
        aria-labelledby="mobile-navigation-title"
        className="fixed inset-x-0 top-3 mx-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-2*var(--space-gutter))] max-w-lg overscroll-contain rounded-[var(--radius-lg)] border border-border-strong bg-surface-elevated p-[var(--space-md)] text-text-primary shadow-[var(--shadow-floating)] backdrop:bg-black/55"
        id="mobile-navigation"
        onClose={restoreFocus}
        ref={dialogRef}
      >
        <nav aria-label="Mobile navigation">
          <div className="mb-2 flex items-center justify-between gap-1 border-b border-border pb-2">
            <h2 className="px-3 font-mono text-label uppercase tracking-[0.14em] text-text-muted" id="mobile-navigation-title">
              Navigation
            </h2>
            <div className="flex items-center">
              <Button aria-label="Close navigation menu" onClick={closeMenu} variant="icon">
                <X aria-hidden="true" className="size-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <ul className="grid gap-1">{sectionLinks(true)}</ul>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
            <ButtonLink href={githubUrl} size="sm" target="_blank" variant="secondary">
              GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </ButtonLink>
            <ButtonLink download href={resumePath} size="sm">
              <FileText aria-hidden="true" className="size-4" /> Résumé
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </>
  );
}
