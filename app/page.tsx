import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import EndStrip from "@/components/EndStrip";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <EndStrip />
      <ThemeSwitcher />
    </main>
  );
}
