import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Same words as the hero, so search results and link previews say what the page says. */
const TITLE = "Ametyst – The agent that looks after your workflows, all the time";
const DESCRIPTION =
  "Ametyst is the agent that looks after your workflows, all the time. It fixes what breaks and, from what your team does every day, proposes new workflows for your company. Every tool with one key, inside the spending policies you set. Works with Claude Code, Codex and Cursor.";

export const metadata: Metadata = {
  metadataBase: new URL('https://ametyst.ai'),
  title: TITLE,
  description:
    DESCRIPTION,
  keywords: [
    "autonomous AI workflows",
    "agents that pay per use",
    "autonomous AI agents",
    "agent tool access",
    "agent spending policies",
    "AI agent spend management",
    "AI agent infrastructure",
    "on-demand tool access",
  ],
  authors: [{ name: "Ametyst" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ametyst.ai",
    siteName: "Ametyst",
    title: TITLE,
    description:
      DESCRIPTION,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_ai",
    title: TITLE,
    description:
      DESCRIPTION,
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
