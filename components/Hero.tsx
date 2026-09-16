import TaskFlow from "@/components/TaskFlow";

export default function Hero() {
  return (
    <section id="hero" className="section-x pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-24 bg-bg border-b border-border/40">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6 min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs md:text-sm font-medium text-fg/70 font-body mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Solo or with a team, on Claude, Codex or Cursor
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
            You have the agents.
            <br />
            <span className="text-accent">Let them work.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-fg/75 max-w-xl leading-relaxed mb-3">
            Give your agents the tools, <strong className="font-semibold text-fg">you fear what they do</strong>.
            Hold back, <strong className="font-semibold text-fg">they do nothing</strong>.
            Watch them, <strong className="font-semibold text-fg">you never stop</strong>. That is the wall.
          </p>
          <p className="font-body text-lg md:text-xl text-fg/75 max-w-xl leading-relaxed mb-4">
            Ametyst takes it down. <strong className="font-semibold text-fg">Your agents get every app, and every specialized agent</strong>.
            <strong className="font-semibold text-fg"> You get the limits and the visibility</strong> that keep the work sharp.
          </p>
          <p className="font-headline text-base md:text-lg text-accent mb-8">Welcome to the agentic economy.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a href="/book" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-btn-bg text-btn-fg font-bold py-3 px-6 text-sm md:text-base text-center transition-opacity hover:opacity-90 font-body">
              Book a call, we set up your first workflow
            </a>
            <a href="https://business.ametyst.ai" target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-accent text-accent font-semibold py-3 px-6 text-sm md:text-base text-center transition-colors hover:bg-accent-soft font-body">
              Create your workspace
            </a>
          </div>
          <p className="font-body text-sm md:text-base text-fg/80 mt-5">
            <span className="font-semibold text-accent">€10 in usage credits</span> when you sign up. Free until your workflow runs on its own.
          </p>
        </div>
        <div className="lg:col-span-6 min-w-0">
          <TaskFlow />
        </div>
      </div>
    </section>
  );
}
