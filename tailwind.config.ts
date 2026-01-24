import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        "btn-bg": "var(--color-btn-bg)",
        "btn-fg": "var(--color-btn-fg)",
        "btn-border": "var(--color-btn-border)",
      },
      fontFamily: {
        headline: ["var(--font-neue-machina)", "Arial Black", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
