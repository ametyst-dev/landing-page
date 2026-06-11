export default function Problem() {
  return (
    <section id="problem" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          Agents can do the work. Paying for it is broken.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
            Every service your agent calls wants its own account, its own credits, its own API key. Across a team that becomes hundreds of keys: created, pasted into Notion, shared in DMs, forgotten. One shared key in the wrong place and production goes down.
          </p>
          <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
            Meanwhile the AI bill grows and nobody can see it. No limits per person, no limits per agent, no view of where the money goes. Intelligence is becoming a real line on the P&amp;L, and right now it&apos;s invisible.
          </p>
        </div>
      </div>
    </section>
  );
}
