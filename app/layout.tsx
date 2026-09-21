import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ametyst.ai'),
  title: "Ametyst – The agent that sits in every run of your workflows",
  description:
    "Build a workflow once. Your agents run it on their own, inside the limits you set. Ametyst gives them the tools they need, keeps them inside your spending policies, and keeps them sharp over time. Works with Claude Code, Codex and Cursor.",
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
    title: "Ametyst – The agent that sits in every run of your workflows",
    description:
      "Build a workflow once. Your agents run it on their own, inside the limits you set. Ametyst gives them the tools they need, keeps them inside your spending policies, and keeps them sharp over time. Works with Claude Code, Codex and Cursor.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Ametyst – The agent that sits in every run of your workflows",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_ai",
    title: "Ametyst – The agent that sits in every run of your workflows",
    description:
      "Build a workflow once. Your agents run it on their own, inside the limits you set. Ametyst gives them the tools they need, keeps them inside your spending policies, and keeps them sharp over time. Works with Claude Code, Codex and Cursor.",
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
