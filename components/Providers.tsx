/* Every provider live on Ametyst, with its favicon. The list mirrors the
 * staging allowlist (merchants with WITHDRAWN in their description left out);
 * icons live in public/providers/<slug>.png. A provider without an icon gets
 * its initial in the tile, so nothing on the page is a wrong logo. */

type Provider = { slug: string; name: string; does: string; icon?: boolean };

const PROVIDERS: Provider[] = [
  { slug: "exa", name: "Exa", does: "Web search", icon: true },
  { slug: "tavily", name: "Tavily", does: "Web search", icon: true },
  { slug: "serper", name: "Serper", does: "Google results", icon: true },
  { slug: "parallel", name: "Parallel", does: "Deep research", icon: true },
  { slug: "x402atlas", name: "x402 Atlas", does: "Search & reader", icon: true },
  { slug: "webscout", name: "Webscout", does: "News & academic" },
  { slug: "firecrawl", name: "Firecrawl", does: "Scraping", icon: true },
  { slug: "apify", name: "Apify", does: "Scraping actors", icon: true },
  { slug: "browserbase", name: "Browserbase", does: "Cloud browser", icon: true },
  { slug: "stableflare", name: "StableFlare", does: "Headless browser", icon: true },
  { slug: "clawfetch", name: "ClawFetch", does: "Web fetch" },
  { slug: "sitecrawler", name: "Sitecrawler", does: "Crawling" },
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
  { slug: "emailscout", name: "Emailscout", does: "Email finder", icon: true },
  { slug: "agentmail", name: "AgentMail", does: "Email inbox", icon: true },
  { slug: "agentphone", name: "AgentPhone", does: "Calls & SMS", icon: true },
  { slug: "openrouter", name: "OpenRouter", does: "LLMs", icon: true },
  { slug: "x402engine", name: "x402engine", does: "109 APIs" },
  { slug: "embeddings", name: "Embeddings", does: "Vectors" },
  { slug: "reducto", name: "Reducto", does: "Document AI", icon: true },
  { slug: "relaystation", name: "RelayStation", does: "PDF & media tools", icon: true },
  { slug: "dictanotes", name: "Dictanotes", does: "Transcription" },
  { slug: "elevenlabs", name: "ElevenLabs", does: "Text to speech", icon: true },
  { slug: "delx", name: "Delx", does: "Text to speech", icon: true },
  { slug: "stablestudio", name: "StableStudio", does: "Image & video", icon: true },
  { slug: "suedeai", name: "Suede", does: "Music & video", icon: true },
  { slug: "x402video", name: "x402video", does: "Text to video", icon: true },
  { slug: "invoket", name: "Invoket", does: "Pre-action checks", icon: true },
  { slug: "lionx402", name: "LionX402", does: "Sanctions", icon: true },
  { slug: "eucompliancetools", name: "EU Compliance Tools", does: "E-invoicing", icon: true },
  { slug: "website2vat", name: "website2vat", does: "VAT lookup", icon: true },
  { slug: "greeneris", name: "Greeneris", does: "EU verification" },
  { slug: "strale", name: "Strale", does: "KYB & registries", icon: true },
  { slug: "onesource", name: "OneSource", does: "EVM chain data", icon: true },
  { slug: "nansen", name: "Nansen", does: "On-chain analytics", icon: true },
];

function Tile({ p }: { p: Provider }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-bg overflow-hidden">
      {p.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/providers/${p.slug}.png`} alt="" width={24} height={24} loading="lazy" className="h-6 w-6 object-contain" />
      ) : (
        <span className="font-headline text-base text-accent" style={{ fontWeight: 900 }} aria-hidden="true">{p.name[0]}</span>
      )}
    </span>
  );
}

export default function Providers() {
  return (
    <section id="providers" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight text-balance mb-4" style={{ fontWeight: 900 }}>
            Every app, one key.
          </h2>
          <p className="font-body text-base md:text-lg text-fg/75 leading-relaxed text-balance">
            {PROVIDERS.length} providers your agents can call today, each one tested and priced per call. Your agent picks, you set the limit.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl border border-border bg-border/60 overflow-hidden">
          {PROVIDERS.map((p) => (
            <li key={p.slug} className="flex items-center gap-4 bg-surface px-5 py-4">
              <Tile p={p} />
              <span className="min-w-0">
                <span className="block truncate font-body text-base font-semibold text-fg leading-tight">{p.name}</span>
                <span className="block truncate font-mono text-xs text-muted mt-1">{p.does}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
