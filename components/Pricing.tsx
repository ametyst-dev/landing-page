const plans = ["Pay per use", "Pro", "Enterprise"] as const;

const rows: { label: string; cells: [string, string, string] }[] = [
  { label: "Price", cells: ["No fixed fee", "€15 per person per month", "Custom"] },
  {
    label: "Cheaper routes",
    cells: [
      "No. You see how much you could save",
      "✓ On every workflow: a cheaper model or tool for each step, you approve",
      "✓ The same, reviewed with us",
    ],
  },
  { label: "Tools connected", cells: ["30+", "30+", "30+"] },
  {
    label: "Spend dashboard",
    cells: ["Last 30 days", "✓ Full history, per agent and per person", "✓ Full, with export and audit"],
  },
  { label: "Agents connected", cells: ["Up to 3", "✓ Unlimited", "✓ Unlimited"] },
  {
    label: "Policies on your agents",
    cells: ["Limited: up to 2", "✓ Unlimited", "✓ Unlimited, with custom approval flows"],
  },
  {
    label: "Members",
    cells: [
      "✓ Invite as many as you want",
      "✓ Invite as many as you want. Pay for the people who build, invite for free the people who only spend",
      "✓ Unlimited",
    ],
  },
  {
    label: "Support",
    cells: ["Documentation", "Email", "Office hours, dedicated channel, onboarding, SSO, invoicing and DPA"],
  },
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
              <th scope="row" className="px-4 py-3 text-left align-top font-semibold text-fg">
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
