const items: { title: string; lines: string[]; soon?: boolean }[] = [
  { title: "Apps", lines: ["Pay per call", "Pay by subscription"] },
  { title: "Specialized agents", lines: ["Pay per run"], soon: true },
  { title: "Ametyst Agent", lines: ["Monthly credit", "Pay per usage"] },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <p className="font-mono text-xs md:text-sm text-accent mb-3">Pricing</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight" style={{ fontWeight: 900 }}>
            Pay only for what you use.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="font-body text-base md:text-lg font-semibold text-fg">{it.title}</h3>
                {it.soon && <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">coming soon</span>}
              </div>
              <ul className="space-y-1">
                {it.lines.map((l) => (
                  <li key={l} className="font-headline text-xl md:text-2xl text-fg leading-tight" style={{ fontWeight: 900 }}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="font-body text-sm text-fg/70 mt-6">Free to start. No minimums. Never a share of your spend.</p>
      </div>
    </section>
  );
}
