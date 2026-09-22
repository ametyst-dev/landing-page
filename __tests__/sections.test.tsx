import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Cta from "@/components/Cta";
import Pillars from "@/components/Pillars";

afterEach(() => cleanup());

describe("TopBar", () => {
  it("has the two CTAs and no section links", () => {
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "Create your workspace" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
    expect(screen.getByRole("link", { name: "Talk to the team" })).toHaveAttribute("href", "/book");
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Pricing" })).toBeNull();
  });
});

describe("Hero", () => {
  it("renders the angle 3 headline, both CTAs and the three harnesses", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Your agent workflows break quietly."
    );
    expect(screen.queryByText(/usage credits/)).toBeNull();
    expect(screen.getByRole("link", { name: "Talk to the team" })).toHaveAttribute("href", "/book");
    for (const h of ["Claude Code", "Codex", "Cursor"]) expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create your workspace" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
  });

  it("shows the same run without and with the Ametyst Agent", () => {
    render(<Hero />);
    expect(screen.getByText("Without the Ametyst Agent")).toBeInTheDocument();
    expect(screen.getByText("✦ With the Ametyst Agent")).toBeInTheDocument();
    expect(screen.getByText("0 ads")).toBeInTheDocument();
    expect(screen.getByText(/I updated step 1 before this run/)).toBeInTheDocument();
    expect(screen.queryByText(/Replay/)).toBeNull();
  });

  it("never says wallet", () => {
    const { container } = render(<Hero />);
    expect(container.textContent?.toLowerCase()).not.toContain("wallet");
  });
});

describe("Cta", () => {
  it("has no email form", () => {
    const { container } = render(<Cta />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});

describe("Pillars", () => {
  it("puts the Ametyst Agent first, then the tools, then the policies with a denied call", () => {
    render(<Pillars />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual([
      "The Ametyst Agent sits in every run.",
      "Every tool your workflows need, with one key.",
      "Spending policies you set once.",
    ]);
    for (const app of ["Notion", "Google Drive", "Granola", "Slack", "GitHub"]) expect(screen.getByText(app)).toBeInTheDocument();
    expect(screen.getByText("denied")).toBeInTheDocument();
  });
});
