const plans = ["Pay per use", "Pro", "Team"] as const;

const rows: { label: string; sub?: boolean; group?: boolean; cells: [string, string, string] }[] = [
  { label: "Price", cells: ["No fixed fee", "€20 per month", "€25 per member per month, minimum 2 members"] },
  {
    label: "Credits",
    cells: [
      "You buy them when you need them, about 108 credits per €",
      "2,400 credits every month (120 per €)",
      "3,000 credits every month per member (120 per €), shared by the workspace",
    ],
  },
  { label: "Tools connected", cells: ["30+", "30+", "30+"] },
  { label: "Policies on your agents", cells: ["✓", "✓", "✓"] },
  { label: "Ametyst Agent", cells: ["✓ With your credits", "✓ With your plan credits", "✓ With your plan credits"] },
  { label: "Other members in the workspace", group: true, cells: ["", "", ""] },
  { label: "Policies on their agents", sub: true, cells: ["✓ You set them", "✓ You set them", "✓ You set them"] },
  {
    label: "Access to tools",
    sub: true,
    cells: ["✓ From the budget you give them", "✓ From the budget you give them", "✓ From the budget you give them"],
  },
  {
    label: "Ametyst Agent",
    sub: true,
    cells: ["From the budget you give them", "From the budget you give them", "✓ For every member, from the shared plan credits"],
  },
  { label: "Shared tasks", sub: true, cells: ["No", "No", "✓ The team shares tasks and builds its own"] },
];

export function PlansTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[640px] border-collapse font-body text-xs md:text-sm text-fg/80">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-4 border-b border-border" />
            {plans.map((p) => (
              <th key={p} scope="col" className="px-4 py-4 border-b border-border text-left align-top">
                <span className="font-headline text-lg md:text-xl text-fg" style={{ fontWeight: 900 }}>
                  {p}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0">
              <th
                scope="row"
                className={`px-4 py-3 text-left align-top ${r.sub ? "pl-8 font-normal text-fg/70" : "font-semibold text-fg"}`}
              >
                {r.label}
              </th>
              {r.cells.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="section-x py-16 md:py-24 bg-bg border-b border-border/40 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-10">
          <p className="font-mono text-xs md:text-sm text-accent mb-3">Pricing</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-fg leading-tight tracking-tight" style={{ fontWeight: 900 }}>
            Pay only for what you use.
          </h2>
        </div>
        <PlansTable />
        <p className="font-body text-sm text-fg/70 mt-6">
          Everything is priced in credits, one balance for tools and Ametyst Agent. Credits you buy never expire. Prices in euro,
          VAT excluded.{" "}
          <a href="/pricing" className="text-accent underline underline-offset-2 hover:opacity-80">
            Full pricing details
          </a>
        </p>
      </div>
    </section>
  );
}
