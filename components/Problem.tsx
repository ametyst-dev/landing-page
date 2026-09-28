const pains = [
  {
    title: "Your agents overpay at every step.",
    body: "They reach for the most expensive model or tool whether the task needs it or not, even when a cheaper one would do the same job.",
  },
  {
    title: "Nobody sees the whole picture.",
    body: "Costs sit in personal dashboards or are spread across ten providers. The total is a surprise at the end of every month.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-x py-16 md:py-24 bg-accent-soft/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance" style={{ fontWeight: 900 }}>
            Nobody is watching what your agents cost.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {pains.map((p) => (
            <li key={p.title} className="rounded-xl border border-border bg-surface p-5 md:p-7">
              <h3 className="font-body text-lg md:text-xl font-semibold text-fg leading-snug mb-3">{p.title}</h3>
              <p className="font-body text-sm md:text-base text-fg/75 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
