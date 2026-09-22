import { ToolIcon, toolName } from "@/components/Providers";

/* Four workflows running with design partners today, all visible at once:
 * who uses it, what goes in, what comes out, the tools it calls and what one
 * run costs. Tool slugs must have a favicon in public/providers/. */

type Task = {
  who: string;
  title: string;
  input: string;
  output: string;
  tools: string[];
  cost: string;
  runs: string;
};

const TASKS: Task[] = [
  {
    who: "Sales team",
    title: "Event attendees into the CRM",
    input: "An attendee list: a screenshot, a link or rows in Notion.",
    output: "Verified contacts in the Notion CRM, with a LinkedIn message and an email for each. The team sends.",
    tools: ["exa", "companyenrich", "pdl", "hunter", "openrouter", "notion"],
    cost: "cents per person",
    runs: "Runs from Claude Desktop",
  },
  {
    who: "Events team",
    title: "Event calls into one sheet",
    input: "Calls dropped in a Granola folder, or just the name of an event.",
    output: "One row per event in Google Sheets, with takeaways and next steps from the calls.",
    tools: ["granola", "gdrive", "exa", "openrouter"],
    cost: "cents per call",
    runs: "Runs from Claude Code",
  },
  {
    who: "Engineering team",
    title: "Slack messages into pull requests",
    input: "Bugs, ideas and voice notes posted in a Slack channel.",
    output: "Reviewed pull requests on staging every 30 minutes. Anything that is not green waits for you.",
    tools: ["slack", "github", "openrouter", "exa", "firecrawl", "browserbase"],
    cost: "€2 to €4 per shipped item",
    runs: "Runs on a schedule, from the CLI",
  },
  {
    who: "Marketing team",
    title: "Competitor ads into a scoreboard",
    input: "The competitor list and your design system, once.",
    output: "Every active Meta ad ranked by EU reach, with on-brand concepts and image drafts to answer them.",
    tools: ["apify", "exa", "tavily", "openrouter", "stablestudio"],
    cost: "€1.50 per scoreboard",
    runs: "Runs from Claude Code",
  },
];

export default function RealTasks() {
  return (
    <section id="tasks" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight mb-4" style={{ fontWeight: 900 }}>
            Four workflows running today. One number each.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed">Built with our design partners. The number is what one run costs.</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {TASKS.map((t) => (
            <li key={t.who} className="flex flex-col rounded-xl border border-border bg-surface p-5 md:p-6">
              <p className="font-mono text-xs text-muted mb-2">{t.who}</p>
              <h3 className="font-body text-xl md:text-2xl font-semibold text-fg leading-snug mb-5">{t.title}</h3>
              <dl className="space-y-3 mb-5 font-body text-sm md:text-[15px]">
                {[["In", t.input], ["Out", t.output]].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-fg/85 leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="flex flex-wrap gap-1.5 mb-6" aria-label="Tools">
                {t.tools.map((slug) => (
                  <li key={slug} className="flex items-center gap-1.5 rounded-md border border-border bg-bg px-2 py-1">
                    <ToolIcon slug={slug} size="sm" bare />
                    <span className="font-body text-xs text-fg">{toolName(slug)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-t border-border/60 pt-4">
                <p className="font-headline text-xl md:text-2xl text-accent leading-tight" style={{ fontWeight: 900 }}>{t.cost}</p>
                <p className="font-body text-xs text-muted">{t.runs}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
