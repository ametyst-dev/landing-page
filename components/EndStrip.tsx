/* The one footer, shared by the home page and the text pages, kept small:
 * the legal links and the X and LinkedIn marks on one row, the company data
 * line under a hairline. No line above it: sections on the page are separated
 * by space only. Marks are Simple Icons paths (24x24) in currentColor. */
const linkClass = "text-sm text-fg/70 hover:text-fg transition-colors font-body";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const LEGAL: [string, string][] = [
  ["Pricing", "/pricing"],
  ["Terms", "/terms"],
  ["Refunds", "/refunds"],
  ["Privacy", "/privacy"],
  ["Contact", "/contact"],
];

const FOLLOW: { name: string; href: string; d: string }[] = [
  {
    name: "X",
    href: "https://x.com/ametyst_ai",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/89660894/",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function EndStrip() {
  return (
    <footer className="bg-bg section-x pt-10 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL.map(([name, href]) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Follow">
            <ul className="flex items-center gap-4">
              {FOLLOW.map((f) => (
                <li key={f.name}>
                  <a href={f.href} {...external} aria-label={f.name} className="block text-fg/60 hover:text-fg transition-colors">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d={f.d} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p lang="it" className="font-body text-xs text-muted mt-6 pt-6 border-t border-border/40 leading-relaxed">
          AMETYST SRL · Corso Magenta 56, 20123 Milano (MI) · P.IVA e C.F. 14681630969 · REA MI-2800625
        </p>
      </div>
    </footer>
  );
}
