import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Home from "@/app/page";

afterEach(() => cleanup());

describe("Page section order", () => {
  it("renders the sections in the playbook order", () => {
    render(<Home />);
    const text = document.body.textContent ?? "";
    const headings = [
      "break quietly.",
      "You built the workflow. Now it depends on you.",
      "Three things Ametyst does in every run.",
      "The Ametyst Agent sits in every run.",
      "Every tool your workflows need, with one key.",
      "Spending policies you set once.",
      "Four workflows running today. One number each.",
      "Before you start.",
      "Stop watching every run.",
    ];
    const indices = headings.map((h) => text.indexOf(h));
    indices.forEach((idx, i) => expect(idx, headings[i]).toBeGreaterThanOrEqual(0));
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
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
