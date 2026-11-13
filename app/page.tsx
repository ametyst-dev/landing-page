import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Pillars from '@/components/Pillars';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import EndStrip from '@/components/EndStrip';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <TopBar />
      <Hero />
      <Problem />
      <Pillars />
      <Pricing />
      <Faq />
      <EndStrip />
    </main>
  );
}
