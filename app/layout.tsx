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
  title: "Ametyst | Wallets for Agents",
  description:
    "Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.",
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
    url: "https://ametyst.xyz",
    siteName: "Ametyst",
    title: "Ametyst | Wallets for Agents",
    description:
      "Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.",
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
    site: "@ametyst_xyz",
    title: "Ametyst | Wallets for Agents",
    description:
      "Ametyst gives your agents a wallet. One key unlocks every model, tool, and data service they need, pay-per-use. Set policies, track every agent payment, and manage AI spend in real time.",
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
