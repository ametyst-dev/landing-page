export default function Cta() {
  return (
    <section id="get-started" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4"
          style={{ fontWeight: 900 }}
        >
          Get your first workflow running on its own.
        </h2>
        <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed mb-8">
          €10 in credits when you sign up. Book a call and we set it up with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base transition-opacity hover:opacity-90 font-body"
          >
            Book a call
          </a>
          <a
            href="https://business.ametyst.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-accent text-accent font-semibold py-3 px-6 text-sm md:text-base transition-colors hover:bg-accent-soft font-body"
          >
            Create your workspace
          </a>
        </div>
      </div>
    </section>
  );
}
