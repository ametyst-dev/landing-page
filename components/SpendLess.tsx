export default function SpendLess() {
  return (
    <section id="spend-less" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-16 text-center">
          Spend less the more they run
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-left">
            <p className="font-body text-base md:text-lg text-fg/70 leading-relaxed mb-4">
              You don&apos;t have to pick the tools or models yourself. Ametyst chooses what fits each
              step, and the cheapest way to get there.
            </p>
            <p className="font-body text-base md:text-lg text-fg/70 leading-relaxed">
              Over time it learns from how you spend and proposes better orchestrations: fewer tokens,
              smaller models where they&apos;re enough, the right provider per step.
            </p>
          </div>

          <div className="rounded-2xl bg-btn-bg text-btn-fg p-6 md:p-8 text-left">
            <p className="font-headline text-lg md:text-xl font-bold text-btn-fg mb-5">
              Lead-list task example
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-baseline justify-between">
                <span className="font-body text-base md:text-lg text-btn-fg/70">The usual way</span>
                <span className="font-headline text-lg md:text-xl text-btn-fg/70 line-through">€4.28</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-body text-base md:text-lg">With Ametyst</span>
                <span className="font-headline text-lg md:text-xl font-bold">€1.63</span>
              </div>
            </div>
            <p className="font-headline text-4xl md:text-5xl font-black mb-5">&minus;61.9%</p>
            <p className="font-body text-sm md:text-base text-btn-fg/80 leading-relaxed">
              Orchestrated across Exa, FullEnrich and Hunter, using a smaller model wherever a bigger
              one isn&apos;t needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
