import { ImageResponse } from "next/og";

/* The large link preview (LinkedIn, X, Slack, WhatsApp, iMessage), built at
 * build time from the hero: brand word, the headline on two lines with
 * "break quietly." in accent, one line under it. Colours are the tokens in
 * app/globals.css. Fonts are fetched at build time from the same sources as
 * the site; if one is down the image still builds with the default sans. */

export const alt = "Ametyst – Your agent workflows break quietly.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The .ttf of the file the site loads: the image renderer reads TTF and OTF, not WOFF.
const NEUE_MACHINA = "https://db.onlinewebfonts.com/t/38d41072aa88a50711d4d50dd0d50f6b.ttf";
// Google Fonts answers a request without a browser user agent with TTF files.
const INTER_CSS = "https://fonts.googleapis.com/css2?family=Inter:wght@500";

const BG = "#F8F8FF";
const FG = "#0B0B0F";
const ACCENT = "#7A1FFF";
const MUTED = "#8a7a9f";

async function load(url: string) {
  try {
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function inter() {
  try {
    const css = await (await fetch(INTER_CSS)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return src ? await load(src) : null;
  } catch {
    return null;
  }
}

/* The site sets the display face at weight 900 and the browser thickens the
 * single cut it has; the renderer cannot, so a stroke in the text colour does. */
const heavy = (px: number, color: string) => ({ WebkitTextStroke: `${px}px ${color}` });

export default async function OpengraphImage() {
  const [machina, body] = await Promise.all([load(NEUE_MACHINA), inter()]);
  const head = machina ? "Neue Machina" : undefined;
  const fonts = [
    ...(machina ? [{ name: "Neue Machina", data: machina, weight: 900 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Inter", data: body, weight: 500 as const, style: "normal" as const }] : []),
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: BG,
        }}
      >
        <div style={{ display: "flex", fontFamily: head, fontSize: 46, color: ACCENT, letterSpacing: -1, ...heavy(1.2, ACCENT) }}>
          Ametyst
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: head, fontSize: 90, lineHeight: 1.05, letterSpacing: -2 }}>
          <span style={{ color: FG, ...heavy(2.6, FG) }}>Your agent workflows</span>
          <span style={{ color: ACCENT, ...heavy(2.6, ACCENT) }}>break quietly.</span>
        </div>
        <div style={{ display: "flex", fontFamily: body ? "Inter" : undefined, fontSize: 30, color: MUTED }}>
          The agent that looks after your workflows, all the time.
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
