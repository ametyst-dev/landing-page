export default function Personas() {
  return (
    <section id="personas" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-body text-xl md:text-2xl font-bold text-fg mb-3">
              Your whole day already runs through agents.
            </h3>
            <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
              Every task you ship leans on a stack of external tools: search, scraping, enrichment, models. The bottleneck is everything around them: a subscription here, a credit pack there, another account to create. With one wallet your agents reach the best provider for every step of the task and pay only for what they use.
            </p>
          </div>
          <div>
            <h3 className="font-body text-xl md:text-2xl font-bold text-fg mb-3">
              Every call, on the books.
            </h3>
            <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
              Spend per person, per agent, per service, in real time. Limits are enforced by the wallet itself, not a dashboard warning after the money is gone. Your team moves faster. You finally see the bill.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
