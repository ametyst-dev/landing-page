import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Short enough to show in full: Google cuts titles at about 60 characters and
 * descriptions at about 155, link previews at two or three lines. The large
 * preview image is app/opengraph-image.tsx (and twitter-image.tsx for X). */
const TITLE = "Ametyst – The agent that looks after your agent workflows";
const DESCRIPTION =
  "Ametyst fixes your agent workflows when they break and proposes new ones for your company. Every tool with one key, inside your spending policies.";

export const metadata: Metadata = {
  metadataBase: new URL('https://ametyst.ai'),
  title: TITLE,
  description: DESCRIPTION,
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
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@ametyst_ai",
    title: TITLE,
    description: DESCRIPTION,
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
