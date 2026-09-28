import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import TermsPage from "@/app/terms/page";
import PrivacyPage from "@/app/privacy/page";
import RefundsPage from "@/app/refunds/page";

/* The copy rules of the home page also hold for the legal pages and for the
 * agent guide at /skill.md, which agents read on the person's behalf. */
const BANNED = ["workspace", "wallet", "neobank", " bank", "banking", "optimiz", "platform", "ametyst agent", "—"];

describe.each([
  ["Terms", TermsPage],
  ["Privacy", PrivacyPage],
  ["Refunds", RefundsPage],
])("%s page copy", (_, Page) => {
  it("follows the copy rules", () => {
    const { container } = render(<Page />);
    const text = (container.textContent ?? "").toLowerCase();
    for (const banned of BANNED) expect(text, banned).not.toContain(banned);
  });
});

describe("Agent guide (public/skill.md)", () => {
  const text = readFileSync(join(process.cwd(), "public/skill.md"), "utf8").toLowerCase();

  it("follows the copy rules", () => {
    for (const banned of BANNED) expect(text, banned).not.toContain(banned);
  });

  it("tells the new story, not the old one", () => {
    expect(text).toContain("spend management for ai agents");
    expect(text).not.toContain("let them work");
    expect(text).not.toContain("work autonomously");
  });
});
