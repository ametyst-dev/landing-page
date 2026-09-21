import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
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
      "How many of your AI workflows run without you?"
    );
    expect(screen.getByText("€10 in usage credits")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
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

describe("Pricing", () => {
  it("has the three plans mapped to the steps and no seats", () => {
    render(<Pricing />);
    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Team" })).toBeInTheDocument();
    expect(screen.queryByText(/seat/i)).toBeNull();
    expect(screen.queryByText(/share of/i)).not.toBeNull();
  });
});

describe("Cta", () => {
  it("has no email form", () => {
    const { container } = render(<Cta />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
