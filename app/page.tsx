import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import EndStrip from "@/components/EndStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <EndStrip />
    </main>
  );
}
