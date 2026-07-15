export default function ValueProps() {
  const props = [
    {
      title: "Your agents pay per use",
      description:
        "Pay per use across every model, tool and data service, all through one key. No subscriptions, no scattered API keys.",
    },
    {
      title: "Your agents orchestrate",
      description:
        "Your agents pick the right tool and model for each step, and switch between them frictionlessly.",
    },
    {
      title: "You set the spend policies",
      description:
        "Set how much each agent can spend, and on which services. The limits are enforced by the wallet itself.",
    },
  ];

  return (
    <section id="value-props" className="py-16 md:py-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-16 text-center">
          What Ametyst unlocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="rounded-2xl bg-border/40 p-6 md:p-8 text-left"
            >
              <h3 className="font-headline text-xl md:text-2xl font-bold text-fg mb-3">
                {prop.title}
              </h3>
              <p className="font-body text-base md:text-lg text-fg/70 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
