export default function HowItWorks() {
  const steps = [
    {
      title: "Create your wallet.",
      description: "Open your workspace and create a wallet for your agents.",
    },
    {
      title: "Set the policies.",
      description: "Decide how much the wallet can spend, and on which services.",
    },
    {
      title: "Connect your agents to the wallet.",
      description: "One command links them. From there they pay for what they use, within policy.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20 border-b border-border/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-bold text-btn-fg text-2xl md:text-3xl mb-3 bg-btn-bg">
                {i + 1}
              </div>
              <p className="font-body text-base md:text-lg font-bold text-fg text-center mb-2">
                {step.title}
              </p>
              <p className="font-body text-sm md:text-base text-fg/70 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
