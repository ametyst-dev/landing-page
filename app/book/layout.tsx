import type { Metadata } from "next";

/* The page itself is a client component (the Cal.com embed), so its title lives here. */
export const metadata: Metadata = { title: "Book a demo · Ametyst" };

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
