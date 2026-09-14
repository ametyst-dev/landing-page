export default function Manifesto() {
  return (
    <section className="section-x py-16 md:py-24 bg-accent-soft/60 border-b border-border/40">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs md:text-sm text-accent mb-4">Remember</p>
        <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tight text-balance mb-6" style={{ fontWeight: 900 }}>
          Your workflows are your differentiation.
        </h2>
        <p className="font-body text-lg md:text-2xl text-fg/80 leading-relaxed text-balance">
          A generic agent gives everyone the same output.
          Build workflows that are yours, keep them sharp, share them when the team grows.
        </p>
      </div>
    </section>
  );
}
