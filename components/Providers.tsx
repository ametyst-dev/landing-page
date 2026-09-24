/* The tools an agent reaches through Ametyst, with their favicons in
 * public/providers/<slug>.png. APPS are the company apps a workspace connects
 * (live today). PROVIDERS mirror the staging allowlist (merchants with
 * WITHDRAWN in their description left out), trimmed to the ones with a
 * verified favicon and to a count that fills the 4-column grid. No logo, no row.
 * Rendered inside the second step of Pillars and as tool chips in RealTasks. */

export type Tool = { slug: string; name: string; does: string; icon?: boolean };

export const APPS: Tool[] = [
  { slug: "notion", name: "Notion", does: "Docs & CRM", icon: true },
  { slug: "gdrive", name: "Google Drive", does: "Files & sheets", icon: true },
  { slug: "granola", name: "Granola", does: "Call notes", icon: true },
  { slug: "slack", name: "Slack", does: "Messages", icon: true },
  { slug: "github", name: "GitHub", does: "Code", icon: true },
];

export const PROVIDERS: Tool[] = [
  { slug: "exa", name: "Exa", does: "Web search", icon: true },
  { slug: "tavily", name: "Tavily", does: "Web search", icon: true },
  { slug: "serper", name: "Serper", does: "Google results", icon: true },
  { slug: "parallel", name: "Parallel", does: "Deep research", icon: true },
  { slug: "firecrawl", name: "Firecrawl", does: "Scraping", icon: true },
  { slug: "apify", name: "Apify", does: "Scraping actors", icon: true },
  { slug: "browserbase", name: "Browserbase", does: "Cloud browser", icon: true },
  { slug: "stableflare", name: "StableFlare", does: "Headless browser", icon: true },
  { slug: "scrapecreators", name: "Scrape Creators", does: "Social scrape", icon: true },
  { slug: "twitsh", name: "twit.sh", does: "X data", icon: true },
  { slug: "apollo", name: "Apollo", does: "GTM data", icon: true },
  { slug: "pdl", name: "People Data Labs", does: "Person data", icon: true },
  { slug: "minerva", name: "Minerva", does: "Person data", icon: true },
  { slug: "clado", name: "Clado", does: "Contact data", icon: true },
  { slug: "companyenrich", name: "CompanyEnrich", does: "Company data", icon: true },
  { slug: "fullenrich", name: "FullEnrich", does: "Enrichment", icon: true },
  { slug: "akta", name: "Akta", does: "Company intel", icon: true },
  { slug: "signalbase", name: "Signalbase", does: "Sales signals", icon: true },
  { slug: "theirstack", name: "TheirStack", does: "Jobs & tech stack", icon: true },
  { slug: "hunter", name: "Hunter", does: "Email verify", icon: true },
  { slug: "agentmail", name: "AgentMail", does: "Email inbox", icon: true },
  { slug: "agentphone", name: "AgentPhone", does: "Calls & SMS", icon: true },
  { slug: "openrouter", name: "OpenRouter", does: "LLMs", icon: true },
  { slug: "reducto", name: "Reducto", does: "Document AI", icon: true },
  { slug: "relaystation", name: "RelayStation", does: "PDF & media tools", icon: true },
  { slug: "elevenlabs", name: "ElevenLabs", does: "Text to speech", icon: true },
  { slug: "stablestudio", name: "StableStudio", does: "Image & video", icon: true },
  { slug: "suedeai", name: "Suede", does: "Music & video", icon: true },
  { slug: "invoket", name: "Invoket", does: "Pre-action checks", icon: true },
  { slug: "strale", name: "Strale", does: "KYB & registries", icon: true },
  { slug: "onesource", name: "OneSource", does: "EVM chain data", icon: true },
  { slug: "nansen", name: "Nansen", does: "On-chain analytics", icon: true },
];

const ALL = new Map([...APPS, ...PROVIDERS].map((t) => [t.slug, t]));

export function toolName(slug: string) {
  return ALL.get(slug)?.name ?? slug;
}

export function ToolIcon({ slug, size = "md", bare = false }: { slug: string; size?: "sm" | "md"; bare?: boolean }) {
  if (bare) {
    const px = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/providers/${slug}.png`} alt="" width={20} height={20} loading="lazy" className={`${px} shrink-0 object-contain`} />;
  }
  const box = size === "sm" ? "h-6 w-6 rounded-md" : "h-8 w-8 rounded-lg";
  const img = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span className={`flex shrink-0 items-center justify-center border border-border bg-bg overflow-hidden ${box}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/providers/${slug}.png`} alt="" width={16} height={16} loading="lazy" className={`object-contain ${img}`} />
    </span>
  );
}

function ToolItem({ t }: { t: Tool }) {
  return (
    <li className="flex items-center gap-2.5 min-w-0">
      <ToolIcon slug={t.slug} size="md" bare />
      <span className="min-w-0 font-body text-sm font-medium leading-snug text-fg">{t.name}</span>
    </li>
  );
}

/* The visual of step 02: the tools the company already uses, then the
 * providers paid per call. One outer card and nothing boxed inside it:
 * bare logos, names, one hairline between the two groups. */
export default function ToolsCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-7">
      <p className="font-body text-sm font-semibold text-fg mb-4">The tools you already use</p>
      <ul className="flex flex-wrap gap-x-7 gap-y-3">
        {APPS.map((t) => <ToolItem key={t.slug} t={t} />)}
      </ul>
      <div className="my-6 h-px bg-border" />
      <p className="font-body text-sm font-semibold text-fg mb-4">50+ external providers</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-4">
        {PROVIDERS.map((t) => <ToolItem key={t.slug} t={t} />)}
      </ul>
    </div>
  );
}
