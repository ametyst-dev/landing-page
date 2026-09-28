import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Short enough to show in full: Google cuts titles at about 60 characters and
 * descriptions at about 155, link previews at two or three lines. The large
 * preview image is app/opengraph-image.tsx (and twitter-image.tsx for X). */
const TITLE = "Ametyst – See what every agent does with your money";
const DESCRIPTION =
  "Spend management for AI agents. Monitor every AI cost in your company and find where every workflow can cost less.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI spend management",
    "AI cost monitoring",
    "AI token spend",
    "AI agent spend management",
    "agent spending policies",
    "reduce AI costs",
    "LLM cost control Europe",
    "AI spend by person and agent",
  ],
  authors: [{ name: "Ametyst" }],
  /* "./" resolves to each page's own path: /terms is canonical for /terms, not for the home page. */
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
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
