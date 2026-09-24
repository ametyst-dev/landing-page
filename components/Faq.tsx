const faqs: { q: string; a: string }[] = [
  {
    q: "Works with my agent?",
    a: "Yes. Claude Code, Codex, Cursor and any MCP client, set up in a few minutes.",
  },
  {
    q: "Do I need an account with each tool?",
    a: "No. One key covers every provider, and Ametyst pays them per call.",
  },
  {
    q: "Do I still need my model subscription?",
    a: "Yes, your agent runs on your own model. Ametyst credits pay for the tools and LLM calls inside your workflows.",
  },
  {
    q: "What happens at a policy limit?",
    a: "The call waits, and you approve or refuse it from the app.",
  },
  {
    q: "Is the Ametyst Agent live today?",
    a: "Yes, in our design partners' workspaces, from the app and from their own agents.",
  },
  {
    q: "Can colleagues run my workflows?",
    a: "Yes, from their own agent and under their own policy. They never see your keys.",
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
