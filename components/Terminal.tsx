import type { ReactNode } from "react";

/* A flat terminal window for what the agent does: dark surface, hairline
 * border, no shadow or glow. Used by the hero run and the Ametyst Agent step. */
export default function Terminal({
  title,
  aside,
  footer,
  children,
}: {
  title: string;
  aside?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-term-line bg-term-bg text-term-fg font-mono text-left">
      <div className="flex items-center gap-3 border-b border-term-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-term-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-line" />
        </span>
        <span className="text-xs text-term-muted truncate">{title}</span>
        {aside && <span className="ml-auto shrink-0 text-xs text-term-muted">{aside}</span>}
      </div>
      <div className="px-4 py-4 md:px-6 md:py-5 text-[12px] md:text-[13px] leading-relaxed">{children}</div>
      {footer && <div className="border-t border-term-line px-4 py-2.5 md:px-6 text-xs text-term-muted">{footer}</div>}
    </div>
  );
}
