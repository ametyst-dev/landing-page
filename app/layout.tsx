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
  title: "Ametyst – You have the agents. Let them work.",
  description:
    "You have the agents. Let them work. Ametyst gives your agents on Claude, Codex or Cursor every app and every specialized agent they need, and gives you the limits and the visibility that keep their work sharp.",
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
    title: "Ametyst – You have the agents. Let them work.",
    description:
      "You have the agents. Let them work. Ametyst gives your agents on Claude, Codex or Cursor every app and every specialized agent they need, and gives you the limits and the visibility that keep their work sharp.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Ametyst – You have the agents. Let them work.",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_ai",
    title: "Ametyst – You have the agents. Let them work.",
    description:
      "You have the agents. Let them work. Ametyst gives your agents on Claude, Codex or Cursor every app and every specialized agent they need, and gives you the limits and the visibility that keep their work sharp.",
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
