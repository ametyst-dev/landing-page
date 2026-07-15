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
  title: "Ametyst | Wallets for Agents",
  description:
    "Ametyst gives each of your agents its own wallet with the spending policies you set, then orchestrates across models and tools. Let your agents run on their own, spending only what you allow.",
  keywords: [
    "MCP wallet",
    "agent payments",
    "let my agent pay for tools",
    "AI spend management",
    "wallets for AI agents",
    "AI agent wallets",
    "agent tool access",
    "pay-per-use AI tools",
  ],
  authors: [{ name: "Ametyst" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ametyst.ai",
    siteName: "Ametyst",
    title: "Ametyst | Wallets for Agents",
    description:
      "Ametyst gives each of your agents its own wallet with the spending policies you set, then orchestrates across models and tools. Let your agents run on their own, spending only what you allow.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Ametyst | Wallets for Agents",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_ai",
    title: "Ametyst | Wallets for Agents",
    description:
      "Ametyst gives each of your agents its own wallet with the spending policies you set, then orchestrates across models and tools. Let your agents run on their own, spending only what you allow.",
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
