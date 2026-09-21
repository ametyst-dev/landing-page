const pains = [
  {
    title: "You are the only one who can run it.",
    body: "The workflow lives on your machine, with your keys and your prompts. When you are out, it waits. When a colleague needs it, you run it for them.",
  },
  {
    title: "You are afraid to let it go.",
    body: "Give the agent the tools and it can spend without asking. Hold back and it does nothing. So you watch every run, and you never stop.",
  },
  {
    title: "It breaks without telling you.",
    body: "A folder gets renamed, a provider changes its response. The run still says done. You find out from the output, weeks later.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-x py-16 md:py-24 bg-accent-soft/60 border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
            You built the workflow. Now it depends on you.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pains.map((p) => (
            <li key={p.title} className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <h3 className="font-body text-lg md:text-xl font-semibold text-fg leading-snug mb-3">{p.title}</h3>
              <p className="font-body text-sm md:text-base text-fg/75 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
