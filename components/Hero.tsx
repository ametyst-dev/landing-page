import HarnessLogos from "@/components/HarnessLogos";

export default function Hero() {
  return (
    <section id="hero" className="section-x pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 bg-bg">
      <div className="max-w-6xl w-full mx-auto">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
            See what every agent does with <span className="text-accent">your money.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-fg/75 max-w-3xl leading-relaxed mb-8 text-balance">
            Spend management for AI agents. Monitor every AI cost in your company and find where every workflow can
            cost less.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center mb-10">
            <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Get started
            </a>
            <a href="/book" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              Book a demo
            </a>
          </div>
          <HarnessLogos centered />
        </div>
      </div>
    </section>
  );
}
