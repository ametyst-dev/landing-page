const plans = ["Pay per use", "Pro", "Team"] as const;

const rows: { label: string; sub?: boolean; group?: boolean; cells: [string, string, string] }[] = [
  { label: "Price", cells: ["No fixed fee", "€20 per month", "€25 per member per month, minimum 2 members"] },
  {
    label: "Credits",
    cells: [
      "You buy them when you need them, about 108 credits per €",
      "2,400 credits every month",
      "3,000 credits every month per member, shared by the workspace",
    ],
  },
  { label: "Tools connected", cells: ["30+", "30+", "30+"] },
  { label: "Policies on your agents", cells: ["Limited: up to 2", "✓ Unlimited", "✓ Unlimited"] },
  {
    label: "Ametyst Agent",
    cells: [
      "Limited: answers when you ask, with your credits",
      "✓ Watches every run, fixes what breaks, proposes what to build",
      "✓ The same, for every member",
    ],
  },
  { label: "Your tasks", cells: ["Up to 3", "✓ Unlimited, with scheduled runs", "✓ Unlimited, with scheduled runs"] },
  { label: "Run history and spend reports", cells: ["Last 7 days", "✓ Full", "✓ Full, per member"] },
  { label: "Other members in the workspace", group: true, cells: ["", "", ""] },
  { label: "Invite people", sub: true, cells: ["✓", "✓", "✓"] },
  {
    label: "Policies on their agents",
    sub: true,
    cells: ["Limited: one standard policy", "Limited: one standard policy", "✓ One per member"],
  },
  { label: "Access to tools", sub: true, cells: ["✓", "✓", "✓"] },
  { label: "Ametyst Agent", sub: true, cells: ["No", "No", "✓"] },
  { label: "Shared tasks", sub: true, cells: ["No", "No", "✓ The team shares tasks and builds its own"] },
  { label: "Admin panel: requests, approvals, spend per member", sub: true, cells: ["No", "No", "✓"] },
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
