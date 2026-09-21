import TaskFlow from "@/components/TaskFlow";
import HarnessLogos from "@/components/HarnessLogos";

export default function Hero() {
  return (
    <section id="hero" className="section-x pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24 bg-bg border-b border-border/40">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6 min-w-0">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
            Your agent workflows <span className="text-accent">break quietly.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-fg/75 max-w-xl leading-relaxed mb-8">
            Ametyst is the agent that sits in every run of your workflows. It gives them the tools they need,
            keeps them inside the spending policies you set, and keeps them sharp over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-10">
            <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base text-center transition-opacity hover:opacity-90 font-body">
              Create your workspace
            </a>
            <a href="/book" target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-accent text-accent font-semibold py-3 px-6 text-sm md:text-base text-center transition-colors hover:bg-accent-soft font-body">
              Talk to the team
            </a>
          </div>
          <HarnessLogos />
        </div>
        <div className="lg:col-span-6 min-w-0">
          <TaskFlow />
        </div>
      </div>
    </section>
  );
}
