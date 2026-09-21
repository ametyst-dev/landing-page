import TaskFlow from "@/components/TaskFlow";

export default function Hero() {
  return (
    <section id="hero" className="section-x pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-24 bg-bg border-b border-border/40">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6 min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs md:text-sm font-medium text-fg/70 font-body mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Works with Claude Code, Codex and Cursor
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
            How many of your AI workflows <span className="text-accent">run without you?</span>
          </h1>
          <p className="font-body text-lg md:text-xl font-semibold text-fg max-w-xl leading-relaxed mb-3">
            Build a workflow once. Your agents run it on their own, inside the limits you set.
          </p>
          <p className="font-body text-base md:text-lg text-fg/75 max-w-xl leading-relaxed mb-8">
            Ametyst is the agent that sits in every run of your workflows: it gives them the tools they need,
            keeps them inside the spending policies you set, and keeps them sharp over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a href="/book" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base text-center transition-opacity hover:opacity-90 font-body">
              Book a call
            </a>
            <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-accent text-accent font-semibold py-3 px-6 text-sm md:text-base text-center transition-colors hover:bg-accent-soft font-body">
              Create your workspace
            </a>
          </div>
          <p className="font-body text-sm md:text-base text-fg/80 mt-5">
            <span className="font-semibold text-accent">€10 in usage credits</span> when you sign up. Free until your first workflow runs on its own.
          </p>
        </div>
        <div className="lg:col-span-6 min-w-0">
          <TaskFlow />
        </div>
      </div>
    </section>
  );
}
