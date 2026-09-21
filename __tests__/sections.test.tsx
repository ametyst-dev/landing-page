import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import { PlansTable } from "@/components/Pricing";
import Cta from "@/components/Cta";

afterEach(() => cleanup());

describe("TopBar", () => {
  it("links Book a call to /book and Sign in to the web app", () => {
    render(<TopBar />);
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
  });
});

describe("Hero", () => {
  it("renders the locked headline, the credits line and both CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "You have the agents.Let them work."
    );
    expect(screen.getByText("€10 in usage credits")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Book a call, we set up your first workflow" })
    ).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Create your workspace" })).toHaveAttribute(
      "href",
      "https://business.ametyst.ai"
    );
  });

  it("never says wallet", () => {
    const { container } = render(<Hero />);
    expect(container.textContent?.toLowerCase()).not.toContain("wallet");
  });
});

describe("PlansTable (unlisted /pricing page)", () => {
  it("shows the three plans with their prices and credits", () => {
    render(<PlansTable />);
    for (const plan of ["Pay per use", "Pro", "Team"]) {
      expect(screen.getByRole("columnheader", { name: plan })).toBeInTheDocument();
    }
    expect(screen.getByText("€20 per month")).toBeInTheDocument();
    expect(screen.getByText(/€25 per member per month/)).toBeInTheDocument();
    expect(screen.getByText(/2,400 credits every month/)).toBeInTheDocument();
    expect(screen.getByText(/3,000 credits every month per member/)).toBeInTheDocument();
  });

  it("never uses wallet or stablecoin wording", () => {
    const { container } = render(<PlansTable />);
    expect(container.textContent).not.toMatch(/wallet|usdc|stablecoin/i);
  });
});

describe("Cta", () => {
  it("has no email form", () => {
    const { container } = render(<Cta />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
