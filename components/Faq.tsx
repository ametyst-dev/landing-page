const faqs: { q: string; a: string }[] = [
  {
    q: "Works with my agent?",
    a: "Yes. Claude Code, Codex, Cursor, OpenClaw, OpenCode and any MCP client, set up in a few minutes.",
  },
  {
    q: "What does the dashboard show?",
    a: "What every person and agent spends, call by call.",
  },
  {
    q: "What happens at a spending limit?",
    a: "The call waits, and you approve or refuse it from the app.",
  },
  {
    q: "Will a cheaper route change my results?",
    a: "Nothing changes until you approve it. Each proposal shows the step, the new model or tool, and the saving in euro.",
  },
  {
    q: "Do I need an account with each tool?",
    a: "No. One key covers 30+ models and tools, and Ametyst pays them per call.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section-x py-16 md:py-24 bg-bg scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight" style={{ fontWeight: 900 }}>
            Before you start.
          </h2>
        </div>
        <dl className="max-w-2xl mx-auto divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-body text-base md:text-lg font-semibold text-fg hover:text-accent group-open:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                <dt>{f.q}</dt>
                <span className="shrink-0 font-mono text-lg text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <dd className="font-body text-sm md:text-base text-fg/75 leading-relaxed pt-2">{f.a}</dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
