const plans: { name: string; step: string; title: string; lines: string[]; highlight?: boolean }[] = [
  {
    name: "Free",
    step: "Step 1",
    title: "Your agents connected",
    lines: ["€10 in usage credits", "Every app, one key", "Free until your first workflow runs on its own"],
  },
  {
    name: "Pro",
    step: "Steps 2 and 3",
    title: "Policies and the Ametyst Agent",
    lines: ["Spending policies per agent", "The Ametyst Agent, with a monthly credit", "Pay per usage beyond it"],
    highlight: true,
  },
  {
    name: "Team",
    step: "Step 2, for everyone",
    title: "The whole team runs them",
    lines: ["Invite your colleagues", "Shared workflows, a policy per person", "Everything in Pro"],
  },
];

const usage: [string, string][] = [
  ["Apps", "Pay per call, or by subscription"],
  ["Specialized agents", "Pay per run · coming soon"],
  ["Ametyst Agent", "Monthly credit, then pay per usage"],
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
            Pay only for what you use.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">The plans follow the three steps. You move up when the next step is yours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-xl border p-5 md:p-6 ${p.highlight ? "border-accent bg-accent-soft/60" : "border-border bg-surface"}`}>
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="font-headline text-2xl md:text-3xl text-fg leading-none" style={{ fontWeight: 900 }}>{p.name}</h3>
                <span className="font-body text-xs text-muted">{p.step}</span>
              </div>
              <p className="font-body text-base md:text-lg font-semibold text-fg mb-3">{p.title}</p>
              <ul className="space-y-1.5">
                {p.lines.map((l) => (
                  <li key={l} className="flex gap-2 font-body text-sm text-fg/80 leading-relaxed">
                    <span className="text-accent shrink-0" aria-hidden="true">·</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <dl className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 rounded-lg border border-border bg-surface px-5 py-4">
          {usage.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="font-body text-xs uppercase tracking-wide text-muted">{k}</dt>
              <dd className="font-body text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="font-body text-sm text-fg/70 mt-6">Free to start. No minimums. Never a share of your spend.</p>
      </div>
    </section>
  );
}
