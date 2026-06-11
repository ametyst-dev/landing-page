import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ChatDemo from "@/components/ChatDemo";
import Problem from "@/components/Problem";
import Personas from "@/components/Personas";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import EndStrip from "@/components/EndStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <ChatDemo />
      <Problem />
      <Personas />
      <HowItWorks />
      <Waitlist />
      <EndStrip />
    </main>
  );
}
