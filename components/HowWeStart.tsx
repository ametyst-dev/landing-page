const steps = [
  { title: "Walkthrough", body: "How your team works, a shared Slack channel, one workflow you want running on its own.", free: true },
  { title: "Onboarding", body: "CLI installed, your custom agent shown on the call. Your €10 in credits cover the trial.", free: true },
  { title: "It runs on its own", body: "The workflow runs in your harness. Everything up to here is free.", free: true },
  { title: "The Ametyst Agent and new workflows", body: "The Ametyst Agent keeps it sharp and proposes new workflows. Its monthly credit and your usage credits are paid.", free: false },
];

export default function HowWeStart() {
  return (
    <section id="how-we-start" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <p className="font-mono text-xs md:text-sm text-accent mb-3">How we start</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
            Free until the workflow runs. Paid from there.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">We are in beta with design partners. We finance the start, you pay when it works.</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className={`rounded-xl border p-5 md:p-6 ${s.free ? "border-border bg-surface" : "border-accent bg-accent-soft/60"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${s.free ? "bg-accent-soft text-accent" : "bg-accent text-btn-fg"}`}>{s.free ? "free" : "paid"}</span>
              </div>
              <h3 className="font-body text-base md:text-lg font-semibold text-fg mb-2">{s.title}</h3>
              <p className="font-body text-sm text-fg/75 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
