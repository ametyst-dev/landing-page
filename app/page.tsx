import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ChatDemo from "@/components/ChatDemo";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import SpendLess from "@/components/SpendLess";
import Waitlist from "@/components/Waitlist";
import EndStrip from "@/components/EndStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <ChatDemo />
      <ValueProps />
      <HowItWorks />
      <SpendLess />
      <Waitlist />
      <EndStrip />
    </main>
  );
}
