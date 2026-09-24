import HarnessLogos from "@/components/HarnessLogos";

export default function Hero() {
  return (
    <section id="hero" className="section-x pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 bg-bg">
      <div className="max-w-6xl w-full mx-auto">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
            Your agent workflows <span className="text-accent">break quietly.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-fg/75 max-w-3xl leading-relaxed mb-8 text-balance">
            Ametyst is the agent that looks after your workflows, all the time. It fixes what breaks and, from what your
            team does every day, proposes new workflows for your company. Every tool with one key, inside the spending
            policies you set.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center mb-10">
            <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Create your workspace
            </a>
            <a href="/book" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              Talk to the team
            </a>
          </div>
          <HarnessLogos centered />
        </div>
      </div>
    </section>
  );
}
