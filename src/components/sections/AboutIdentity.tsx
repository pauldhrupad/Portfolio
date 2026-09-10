type AboutIdentityProps = {
  city: string;
  graduationYear: string;
  initials: string;
  name: string;
  programCode: string;
};

export function AboutIdentity({
  city,
  graduationYear,
  initials,
  name,
  programCode,
}: AboutIdentityProps) {
  return (
    <div className="neu-panel relative mx-auto aspect-[4/5] w-full max-w-[27rem] rounded-[calc(var(--radius-lg)+0.125rem)] border border-border p-1.5">
      <div className="identity-surface relative flex h-full overflow-hidden rounded-[var(--radius-lg)] border border-border p-6 shadow-[var(--shadow-inset)] sm:p-8">
        <div
          aria-hidden="true"
          className="identity-grid absolute inset-0"
        />

        <div className="relative flex w-full flex-col">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-text-muted sm:text-sm">
            <span>Identity / 01</span>
            <span className="flex items-center gap-2 text-accent-primary-soft">
              <span className="size-1.5 rounded-full bg-accent-cyan" />
              Active
            </span>
          </div>

          <div className="my-auto py-8">
            <p className="text-[clamp(6rem,24vw,10rem)] font-semibold leading-none tracking-[-0.09em] text-text-primary">
              {initials}
              <span className="text-accent-primary">.</span>
            </p>
            <p className="mt-3 font-mono text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">
              {name}
            </p>
            <div className="mt-5 h-px w-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-cyan),transparent)]" />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 font-mono text-xs uppercase tracking-[0.14em] sm:text-sm">
            <div>
              <p className="text-text-muted">Program</p>
              <p className="mt-1 text-text-primary">
                {programCode} / {graduationYear}
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-muted">Base</p>
              <p className="mt-1 text-text-primary">{city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
