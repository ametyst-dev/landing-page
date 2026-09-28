// @vitest-environment node
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { SITE_URL } from "@/app/site";

describe("sitemap.xml and robots.txt", () => {
  it("lists the pages on www, without /pricing and /contact", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}/`);
    for (const u of urls) expect(u.startsWith("https://www.ametyst.ai/")).toBe(true);
    expect(urls.some((u) => u.includes("/pricing") || u.includes("/contact"))).toBe(false);
  });

  it("points crawlers at the sitemap", () => {
    expect(robots().sitemap).toBe("https://www.ametyst.ai/sitemap.xml");
  });
});
