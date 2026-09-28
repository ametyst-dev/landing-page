export default function Cta() {
  return (
    <section id="get-started" className="section-x py-16 md:py-24 bg-bg scroll-mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance mb-4"
          style={{ fontWeight: 900 }}
        >
          See what your agents spend. <br className="hidden md:block" />
          <span className="text-accent">Then spend less.</span>
        </h2>
        <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed mb-8 text-balance">
          Connect the agent you already use, and let Ametyst find where every workflow can cost less.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://business.ametyst.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Get started
          </a>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
