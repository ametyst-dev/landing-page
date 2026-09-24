import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "font-inter" }) }));

import { metadata } from "@/app/layout";

describe("Page metadata (search results and link previews)", () => {
  it("keeps the title and the description short enough to show in full", () => {
    expect(String(metadata.title).length).toBeLessThanOrEqual(60);
    expect(String(metadata.description).length).toBeLessThanOrEqual(155);
  });

  it("uses the large preview card on X", () => {
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("follows the copy rules", () => {
    const text = [metadata.title, metadata.description].join(" ").toLowerCase();
    expect(text).not.toContain("—");
    for (const banned of ["wallet", "neobank", " bank", "banking", "optimiz", "platform", "skill"]) {
      expect(text, banned).not.toContain(banned);
    }
  });
});
