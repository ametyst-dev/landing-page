/* Product-faithful mock frames used by TaskFlow and Pillars.
 * AmetystApp mirrors business-app (white 250px sidebar, bordered nav buttons,
 * 32px section title, periwinkle cards). NotionFrame and ClaudeFrame mirror the
 * respective apps' look so the reader recognizes where the work happens. */

export function AmetystApp({
  page,
  as,
  admin = true,
  children,
}: {
  page: "Tasks" | "Permissions" | "Specialized Agents" | "Ametyst Agent" | "Home" | "Apps";
  /** Title shown in the main area when it differs from the nav label. */
  as?: string;
  /** false = the Admin panel group stays collapsed (member view). */
  admin?: boolean;
  children: React.ReactNode;
}) {
  const main = ["Home", "Apps", "Specialized Agents", "Tasks", "Install"];
  const adminItems = ["Overview", "Permissions", "Tasks management", "Ametyst Agent"];
  const onAgent = page === "Ametyst Agent";
  const active = (label: string) =>
    label === page
      ? "border-[#7a1fff] bg-[#7a1fff] text-white"
      : "border-[#d6daff] text-[#0b0b0f]";
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-[#f8f8ff] shadow-[0_24px_60px_-32px_rgba(122,31,255,0.45)] font-body">
      <div className="flex min-h-[320px]">
        <aside className="hidden sm:flex w-[128px] shrink-0 flex-col gap-1 border-r border-[#d6daff] bg-white p-2.5">
          <div className="mb-1 flex items-center justify-between rounded-md border border-[#d6daff] px-2 py-1 text-[9px]">
            <span className="text-[#0b0b0f] font-medium">Organization</span>
            <span className="rounded bg-[#efe8ff] px-1 text-[8px] text-[#7a1fff]">{admin ? "Admin" : "Member"}</span>
          </div>
          <div className="rounded-md border border-[#d6daff] px-2 py-1 text-[9px] font-semibold text-[#0b0b0f]">🔔 Notifications</div>
          <div className="my-0.5 h-px bg-[#d6daff]" />
          {main.map((l) => (
            <div key={l} className={`rounded-md border px-2 py-1 text-[9px] font-semibold ${(!admin || l === "Tasks") && page === l ? active(l) : "border-[#d6daff] text-[#0b0b0f]"}`}>
              {l}
            </div>
          ))}
          <div className="my-0.5 h-px bg-[#d6daff]" />
          <div className={`rounded-md border px-2 py-1 text-[9px] font-semibold ${!admin && page === "Permissions" ? active(page) : "border-[#d6daff] text-[#0b0b0f]"}`}>{admin ? "▾" : "▸"} Admin panel</div>
          {admin && adminItems.map((l) => (
            <div key={l} className={`ml-2 rounded-md border px-2 py-1 text-[9px] font-semibold ${page === l && !main.includes(l) && !onAgent ? active(l) : "border-[#d6daff] text-[#0b0b0f]"}`}>
              {l}
            </div>
          ))}
          <div className="mt-auto flex flex-col gap-1 pt-1">
            {["Settings", "Invite"].map((l) => (
              <div key={l} className="rounded-md border border-[#d6daff] px-2 py-0.5 text-[8px] font-semibold text-[#0b0b0f]">{l}</div>
            ))}
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <p className="text-lg font-bold leading-tight text-[#0b0b0f]">{as ?? page}</p>
            {/* always one click away, from every page */}
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${onAgent ? "border-[#7a1fff] bg-[#7a1fff] text-white" : "border-[#7a1fff] text-[#7a1fff]"}`}>✦ Ametyst Agent</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AppCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[10px] border border-[#d6daff] bg-white p-3 ${className}`}>{children}</div>;
}

export function AppButton({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <span
      className={`inline-block rounded-[8px] border-2 px-2.5 py-1 text-[10px] font-bold ${
        secondary ? "border-[#7a1fff] text-[#7a1fff] bg-transparent" : "border-transparent bg-[#7a1fff] text-white"
      }`}
    >
      {children}
    </span>
  );
}

export function AppTabs({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div className="mb-3 flex gap-3 border-b border-[#d6daff]">
      {tabs.map((t) => (
        <span
          key={t}
          className={`pb-1.5 text-[10px] font-semibold ${t === active ? "border-b-2 border-[#7a1fff] text-[#0b0b0f]" : "text-[#8a7a9f]"}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function NotionFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-white shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)] font-body">
      <div className="flex min-h-[320px]">
        <aside className="hidden sm:block w-[128px] shrink-0 bg-[#f7f7f5] p-2.5 text-[9px] text-[#37352f]">
          <p className="mb-2 font-semibold">▾ GTM workspace</p>
          {["🔍 Search", "🏠 Home", "📥 Inbox"].map((l) => (
            <p key={l} className="rounded px-1 py-0.5 text-[#787774]">{l}</p>
          ))}
          <p className="mt-2 mb-1 text-[8px] uppercase tracking-wide text-[#9b9a97]">Private</p>
          {["📄 Playbook", "📊 Pipeline"].map((l) => (
            <p key={l} className="rounded px-1 py-0.5 text-[#787774]">{l}</p>
          ))}
          <p className="rounded bg-[#efefed] px-1 py-0.5 font-medium">🗂️ {title}</p>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 border-b border-[#efefed] px-4 py-1.5 text-[9px] text-[#787774]">
            <span>GTM workspace</span><span>/</span><span className="text-[#37352f]">{title}</span>
          </div>
          <div className="p-4">
            <p className="mb-3 text-lg font-bold text-[#37352f]">🗂️ {title}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClaudeFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-[#faf9f5] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)] font-body">
      <div className="flex min-h-[320px]">
        <aside className="hidden sm:flex w-[128px] shrink-0 flex-col bg-[#f0eee6] p-2.5 text-[9px] text-[#3d3929]">
          <p className="mb-2 flex items-center gap-1 font-semibold"><span className="inline-block h-3 w-3 rounded-sm bg-[#d97757]" />Claude</p>
          <p className="rounded bg-white/70 px-1.5 py-0.5">+ New chat</p>
          <p className="mt-2 mb-1 text-[8px] uppercase tracking-wide text-[#8c8677]">Recents</p>
          <p className="rounded bg-white px-1.5 py-0.5 font-medium">scoreboard</p>
          <p className="px-1.5 py-0.5 text-[#8c8677]">genera in alta 2</p>
          <p className="px-1.5 py-0.5 text-[#8c8677]">aggiungi competitor…</p>
          <div className="mt-auto flex items-center gap-1 text-[8px] text-[#8c8677]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7a1fff]" /> ametyst · connected
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}

export function SheetsFrame({ title, tabs, active, children }: { title: string; tabs: string[]; active: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-white shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)] font-body">
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-3 py-1.5">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#1e8e3e] text-[9px] font-bold text-white">S</span>
        <span className="text-[11px] text-[#202124]">{title}</span>
        <span className="ml-auto rounded-full bg-[#c2e7ff] px-2 py-0.5 text-[9px] text-[#001d35]">Share</span>
      </div>
      <div className="flex gap-2 border-b border-[#e0e0e0] px-3 py-1 text-[9px] text-[#5f6368]">
        {["File", "Edit", "View", "Insert", "Format", "Data"].map((m) => <span key={m}>{m}</span>)}
      </div>
      <div className="min-h-[232px] p-0">{children}</div>
      <div className="flex items-center gap-1 border-t border-[#e0e0e0] bg-[#f8f9fa] px-2 py-1 text-[9px]">
        <span className="px-1 text-[#5f6368]">+</span>
        {tabs.map((t) => (
          <span key={t} className={`rounded-t px-2.5 py-1 ${t === active ? "bg-white font-semibold text-[#188038] border-b-2 border-[#188038]" : "text-[#5f6368]"}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}
