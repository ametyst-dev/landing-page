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
  title: "Ametyst – Banking Platform for Autonomous Agents",
  description:
    "Ametyst is a banking platform for autonomous agents. Create bank-linked wallets, set spending policies, and enable agents to pay and get paid for services.",
  keywords: [
    "banking platform for agents",
    "autonomous agent payments",
    "AI agent wallets",
    "programmable wallets",
    "agent-native payments",
    "fintech infrastructure",
  ],
  authors: [{ name: "Ametyst" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ametyst.xyz",
    siteName: "Ametyst",
    title: "Ametyst – Banking Platform for Autonomous Agents",
    description:
      "Ametyst is a banking platform for autonomous agents. Create bank-linked wallets, set spending policies, and enable agents to pay and get paid for services.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Ametyst – Banking Platform for Autonomous Agents",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@ametyst_xyz",
    title: "Ametyst – Banking Platform for Autonomous Agents",
    description:
      "Ametyst is a banking platform for autonomous agents. Create bank-linked wallets, set spending policies, and enable agents to pay and get paid for services.",
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
