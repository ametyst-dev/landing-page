const items = [
  { title: "Apps: pay per call or by subscription", body: "Each app is paid per call from your workspace credits, or by subscription where the provider works that way. No minimums." },
  { title: "Specialized agents: pay per output", body: "Every job handed to a specialized agent, Ametyst's Maintenance and Behaviours agents included, is paid per output from a budget you set, held until the output is validated. Not a share of your spend." },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <p className="font-mono text-xs md:text-sm text-accent mb-3">Pricing</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight" style={{ fontWeight: 900 }}>
            You pay for what your agents do.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <h3 className="font-body text-base md:text-lg font-semibold text-fg mb-2">{it.title}</h3>
              <p className="font-body text-sm text-fg/75 leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
