import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Home from "@/app/page";

afterEach(() => cleanup());

describe("Page section order", () => {
  it("renders the sections in the playbook order", () => {
    render(<Home />);
    const text = document.body.textContent ?? "";
    const headings = [
      "your money.",
      "Nobody is watching what your agents cost.",
      "How Ametyst cuts your AI spend.",
      "AI spend by agent.",
      "Same work, cheaper route.",
      "Before you start.",
      "Then spend less.",
    ];
    const indices = headings.map((h) => text.indexOf(h));
    indices.forEach((idx, i) => expect(idx, headings[i]).toBeGreaterThanOrEqual(0));
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
  });

  it("has no line between sections, footer included", () => {
    const { container } = render(<Home />);
    const blocks = container.querySelectorAll("main > section, main > footer");
    expect(blocks.length).toBeGreaterThan(4);
    blocks.forEach((b) => expect(b.className, b.id || b.tagName).not.toMatch(/(^|\s)border-(t|b|y)(\s|$)/));
  });

  it("has no pricing section and no How we start section on the home page", () => {
    const { container } = render(<Home />);
    expect(container.querySelector('a[href="#pricing"], #pricing, #how-we-start')).toBeNull();
  });

  it("never uses the words the playbook bans in public copy", () => {
    render(<Home />);
    const text = (document.body.textContent ?? "").toLowerCase();
    for (const banned of ["wallet", "neobank", " bank", "banking", "optimiz", "platform", "skill"]) {
      expect(text, banned).not.toContain(banned);
    }
  });

  it("has no em dash anywhere on the page", () => {
    render(<Home />);
    expect(document.body.textContent ?? "").not.toContain("—");
  });

  it("has no ✦ glyph anywhere on the page", () => {
    render(<Home />);
    expect(document.body.textContent ?? "").not.toContain("✦");
  });
});
