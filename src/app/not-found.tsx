import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  description: "The requested portfolio page could not be found.",
  title: "Page Not Found | Dhrupad Paul",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[72svh] items-center py-[var(--space-section)]" id="main-content" tabIndex={-1}>
      <Container size="narrow">
        <div className="neu-panel mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-border p-7 text-center sm:p-12">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-accent-primary">
            404 / NOT FOUND
          </p>
          <h1 className="mt-5 text-balance text-display font-semibold tracking-[-0.055em] text-text-primary">
            This page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            The address may have changed, or the page may have been removed. You can return home or continue to the selected work.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
            <ButtonLink href="/">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to Home
            </ButtonLink>
            <ButtonLink href="/#projects" variant="secondary">
              View Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
