#!/usr/bin/env node
/*
 * Static snapshot of the home page for design review.
 *
 *   npm run snapshot            builds, then writes ./snapshot
 *   npm run snapshot -- --no-build   reuses the last .next build
 *
 * The output is a self-contained folder (index.html + _next/static + icon)
 * that can be published as a Claude artifact or served from any static host at
 * any sub-path. Everything in it is relative: no leading slash anywhere, and
 * Next's /_next/static lives under assets/static because the artifact service
 * reserves names that start with an underscore.
 *
 * One-way only: code -> snapshot. Comments left on the artifact come back to a
 * person or an agent, who edits the components, rebuilds and republishes.
 */
import { cp, mkdir, readFile, writeFile, rm, readdir } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "snapshot");
const site = "https://ametyst.ai";
const noBuild = process.argv.includes("--no-build");

if (!noBuild) execSync("npx next build", { stdio: "inherit" });

const built = await readFile(path.join(root, ".next/server/app/index.html"), "utf8");

await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, "assets"), { recursive: true });
await cp(path.join(root, ".next/static"), path.join(out, "assets/static"), { recursive: true });
await cp(path.join(root, "public/icon.png"), path.join(out, "icon.png"));
await cp(path.join(root, "public/providers"), path.join(out, "providers"), { recursive: true });

/* 1. Stylesheets. Inter is self-hosted by next/font under /_next/static/media.
 *    Neue Machina comes from a third-party CDN in globals.css; the artifact
 *    sandbox only loads font files that ship with the page, so download it and
 *    point the CSS at the local copy. */
const cssDir = path.join(out, "assets/static/css");
const mediaDir = path.join(out, "assets/static/media");
await mkdir(mediaDir, { recursive: true });
for (const f of await readdir(cssDir)) {
  if (!f.endsWith(".css")) continue;
  let css = await readFile(path.join(cssDir, f), "utf8");
  for (const m of css.matchAll(/url\(["']?(https?:\/\/[^"')]+\.(woff2?))["']?\)/g)) {
    const [, url, ext] = m;
    const name = `neue-machina.${ext}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      await writeFile(path.join(mediaDir, name), Buffer.from(await res.arrayBuffer()));
      css = css.replaceAll(url, `../media/${name}`);
      console.log(`font: ${url} -> assets/static/media/${name}`);
    } catch (e) {
      console.warn(`font: could not fetch ${url} (${e.message}); headlines will fall back`);
    }
  }
  css = css.replaceAll("/_next/static/media/", "../media/");
  await writeFile(path.join(cssDir, f), css);
}

/* 2. The page. The artifact host wraps the file in its own html/head/body, so we
 *    ship head children + body children as a fragment and re-apply the classes
 *    next/font puts on <html> and the layout puts on <body>. */
const htmlClass = /<html[^>]*\sclass="([^"]*)"/.exec(built)?.[1] ?? "";
const bodyClass = /<body[^>]*\sclass="([^"]*)"/.exec(built)?.[1] ?? "";
let head = /<head>([\s\S]*?)<\/head>/.exec(built)?.[1] ?? "";
let body = /<body[^>]*>([\s\S]*?)<\/body>/.exec(built)?.[1] ?? "";
head = head.replace(/<meta name="viewport"[^>]*\/?>/i, "");

const sha = execSync("git rev-parse --short HEAD").toString().trim();
const branch = execSync("git branch --show-current").toString().trim();
const date = new Date().toISOString().slice(0, 10);

let page = [
  head,
  `<script>document.documentElement.className+=" ${htmlClass}";document.body.className+=" ${bodyClass}";</script>`,
  body,
  `<div id="snapshot-strip" style="position:fixed;bottom:0;left:0;right:0;z-index:60;padding:4px 12px calc(4px + env(safe-area-inset-bottom,0px));background:#0b0b0f;color:#f8f8ff;font:11px ui-monospace,SFMono-Regular,Menlo,monospace;text-align:center;opacity:.92">preview · ${branch} · ${sha} · ${date} · comments on this page reach the agent, the code lives in the branch</div>`,
].join("\n");

page = page
  /* the nomodule polyfills bundle is for legacy browsers only, and it carries
   * bytes the artifact service rejects; modern browsers never request it */
  .replace(/<script[^>]*polyfills-[^>]*><\/script>/, "")
  .replace(/<title>[^<]*<\/title>/, "<title>Ametyst Landing Preview</title>")
  .replaceAll('"/_next/', '"assets/')
  .replaceAll('"/icon.png"', '"icon.png"')
  .replaceAll('"/providers/', '"providers/')
  .replaceAll('href="/book"', `href="${site}/book"`)
  .replaceAll('href="/skill.md"', `href="${site}/skill.md"`);

const leftover = [...page.matchAll(/(?:href|src)="\/(?!\/)[^"]*"/g)].map((m) => m[0]);
if (leftover.length) console.warn("absolute paths left in the page:", [...new Set(leftover)]);

await writeFile(path.join(out, "index.html"), page);

const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push(path.relative(out, p));
  }
}
await walk(out);
for (const f of files.filter((f) => /polyfills-/.test(f))) await rm(path.join(out, f), { force: true });
const publish = files.filter((f) => f !== "index.html" && f !== "files.json" && !/polyfills-/.test(f));
await writeFile(path.join(out, "files.json"), JSON.stringify(publish, null, 2));
console.log(`snapshot: ${files.length} files in ./snapshot (${branch} @ ${sha})`);
