import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Manifesto from "@/components/Manifesto";
import RealTasks from "@/components/RealTasks";
import HowWeStart from "@/components/HowWeStart";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import EndStrip from "@/components/EndStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <Pillars />
      <Manifesto />
      <RealTasks />
      <HowWeStart />
      <Pricing />
      <Cta />
      <EndStrip />
    </main>
  );
}
