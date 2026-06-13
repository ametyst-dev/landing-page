export default function HowItWorks() {
  const steps = [
    {
      title: "Create your wallet.",
      description: "Create your workspace and set up your first wallet for your agents.",
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
    <section id="how-it-works" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-16 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-start text-left md:items-center md:text-center"
            >
              <div className="flex flex-row items-center gap-3 mb-2 md:mb-0 md:flex-col md:gap-0">
                <div className="shrink-0 w-9 h-9 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-btn-fg text-base md:text-2xl bg-btn-bg md:mb-3">
                  {i + 1}
                </div>
                <p className="font-headline text-lg md:text-xl font-bold text-fg leading-none md:leading-normal mt-1 md:mt-0 md:mb-2">
                  {step.title}
                </p>
              </div>
              <p className="font-body text-base md:text-lg text-fg/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
