import { PenTool } from "lucide-react";
import { SectionReveal } from "@/components/motion/Reveal";
import { creativeCredentials } from "@/data/creative";

export function AdditionalDimensions() {
  if (creativeCredentials.length === 0) return null;

  return (
    <section aria-labelledby="dimensions-title" className="mt-6" id="dimensions">
      <SectionReveal distance={10}>
        <div className="grid gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-5 sm:p-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight" id="dimensions-title">
              <PenTool aria-hidden="true" className="size-4 shrink-0 text-accent-primary" /> Additional dimensions
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">Drawing and composition alongside technical study.</p>
          </div>
          <ul className="grid gap-4">
            {creativeCredentials.map((credential) => (
              <li key={credential.title}>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">{credential.category}</p>
                <h4 className="mt-2 text-base font-semibold leading-7">{credential.title}</h4>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </section>
  );
}
