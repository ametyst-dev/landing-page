const faqs: { q: string; a: string }[] = [
  {
    q: "Does it work with my agent?",
    a: "Yes, with Claude Code, Codex and Cursor. Ametyst is a set of tools your agent calls with one key. Installing takes a few minutes, and the setup guide is written for the agent itself.",
  },
  {
    q: "Do I still need my Claude, OpenAI or Cursor subscription?",
    a: "Yes. Your agent keeps thinking on your subscription. Ametyst credits pay for what the agent calls through Ametyst: the apps, and soon the specialized agents. They never pay for the model.",
  },
  {
    q: "What happens when a run hits a policy limit?",
    a: "The run stops and the agent asks. You approve or refuse from the app, per run or per day, and the workflow picks up from there.",
  },
  {
    q: "Can I use the Ametyst Agent today?",
    a: "Yes. It runs in our design partners' workspaces today, from the app and from their own agents. Ask it what went wrong and it answers with the run it looked at.",
  },
  {
    q: "Do my colleagues need to build workflows themselves?",
    a: "No. A workflow shared in the workspace runs from their own agent, with their own policy. They never see your keys.",
  },
  {
    q: "Do you take a share of what my agents spend?",
    a: "Never. Apps are paid per call or by subscription, the Ametyst Agent has a monthly credit. No minimums.",
  },
  {
    q: "Where are you based?",
    a: "In Europe. We work with our design partners on calls and in a shared Slack channel.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight" style={{ fontWeight: 900 }}>
            Before you start.
          </h2>
        </div>
        <dl className="lg:col-span-8 divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base md:text-lg font-semibold text-fg [&::-webkit-details-marker]:hidden">
                <dt>{f.q}</dt>
                <span className="font-mono text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <dd className="font-body text-sm md:text-base text-fg/75 leading-relaxed pt-3 max-w-2xl">{f.a}</dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
