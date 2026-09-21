export default function Cta() {
  return (
    <section id="get-started" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4"
          style={{ fontWeight: 900 }}
        >
          Stop watching <span className="text-accent">every run.</span>
        </h2>
        <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed mb-8 text-balance">
          Create your workspace, connect your agent, and let Ametyst keep your workflows sharp.
          Free to start, and we set the first one up with you if you prefer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://business.ametyst.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-opacity hover:opacity-90 font-body"
          >
            Create your workspace
          </a>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-accent text-accent font-semibold py-3 px-6 text-sm md:text-base transition-colors hover:bg-accent-soft font-body"
          >
            Talk to the team
          </a>
        </div>
      </div>
    </section>
  );
}
