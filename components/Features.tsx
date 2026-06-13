export default function Features() {
  const features = [
    {
      title: "One key, every service",
      description:
        "Your agents reach any model, tool, or data service through a single wallet. No scattered accounts, no API keys to manage.",
    },
    {
      title: "Pay only for what they use",
      description:
        "Per-call pricing across providers. No subscriptions, no idle credits sitting in ten dashboards.",
    },
    {
      title: "Policies that enforce themselves",
      description:
        "Set how much each wallet can spend, and on which services. Limits live in the wallet, not in a warning email.",
    },
    {
      title: "Spend, fully on the books",
      description:
        "See every euro per person, per agent, and per service, in real time.",
    },
    {
      title: "The right provider for every step",
      description:
        "Search, scraping, enrichment, models. Your agents pick the best provider for each step and pay inline.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          Features
        </h2>
        <div>
          {features.map((feature) => (
            <div key={feature.title} className="py-5 md:py-6">

              <h3 className="font-headline text-xl md:text-2xl font-bold text-fg mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-base md:text-lg text-fg/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
