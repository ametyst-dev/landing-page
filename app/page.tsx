import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import RealTasks from "@/components/RealTasks";
import Providers from "@/components/Providers";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import EndStrip from "@/components/EndStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <Problem />
      <Pillars />
      <RealTasks />
      <Providers />
      <Faq />
      <Cta />
      <EndStrip />
    </main>
  );
}
