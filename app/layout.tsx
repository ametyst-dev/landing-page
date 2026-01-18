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
  title: "Ametyst - Banking Platform for the Agentic Economy",
  description: "Unlock the agentic economy with the banking platform that powers it. Spend and receive money through AI agents.",
  keywords: ["agentic economy", "AI banking", "autonomous payments", "AI agents", "banking platform", "fintech"],
  authors: [{ name: "Ametyst" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ametyst.xyz",
    siteName: "Ametyst",
    title: "Ametyst - Banking Platform for the Agentic Economy",
    description: "Unlock the agentic economy with the banking platform that powers it. Spend and receive money through AI agents.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ametyst - Own The Bank",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ametyst_xyz",
    title: "Ametyst - Banking Platform for the Agentic Economy",
    description: "Unlock the agentic economy with the banking platform that powers it. Spend and receive money through AI agents.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
