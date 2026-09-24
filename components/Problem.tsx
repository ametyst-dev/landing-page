const pains = [
  {
    title: "Only you can run it.",
    body: "It runs on your laptop, with your keys. When you are away, it stops.",
  },
  {
    title: "You can't let it go.",
    body: "Give it the tools and it spends without asking. So you check every run.",
  },
  {
    title: "It breaks in silence.",
    body: "A tool changes and the run still says done. You find out weeks later.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-x py-16 md:py-24 bg-accent-soft/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto text-center mb-10">
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
