import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ametyst.xyz'),
  title: "Ametyst – Wallets for AI Agents",
  description:
    "Ametyst offers wallets that give your AI agents on-demand access to every service they need. Set spending policies, link your agents, and let them call the tools they actually need.",
  keywords: [
    "AI agent wallets",
    "wallets for AI agents",
    "agent tool access",
    "programmable wallets",
    "AI agent infrastructure",
    "on-demand tool access",
  ],
  authors: [{ name: "Ametyst" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ametyst.xyz",
    siteName: "Ametyst",
    title: "Ametyst – Wallets for AI Agents",
    description:
      "Ametyst offers wallets that give your AI agents on-demand access to every service they need. Set spending policies, link your agents, and let them call the tools they actually need.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Ametyst – Wallets for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_xyz",
    title: "Ametyst – Wallets for AI Agents",
    description:
      "Ametyst offers wallets that give your AI agents on-demand access to every service they need. Set spending policies, link your agents, and let them call the tools they actually need.",
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
