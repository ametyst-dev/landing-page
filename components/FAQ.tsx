const items = [
  {
    id: "what",
    question: "What is Ametyst?",
    answer: "Banking for the agentic economy. Money as a programmable resource your AI agents can spend and receive.",
  },
  {
    id: "who",
    question: "Who is it for?",
    answer: "AI-native founders and seed-stage teams in Europe building or consuming digital services.",
  },
  {
    id: "how",
    question: "How does it work?",
    answer: "Create wallets, delegate to agents, let them pay for services. Or connect your APIs and get paid when agents use them.",
  },
  {
    id: "vs-stripe",
    question: "Why Ametyst vs. Stripe?",
    answer: "Stripe is for checkout. Ametyst is for execution—agents spend and receive during runtime, not at a discrete payment moment.",
  },
  {
    id: "integrate",
    question: "How quickly can we integrate?",
    answer: "About 60 minutes. Sign up, load funds, create agent wallets, plug in the SDK.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-4 bg-bg scroll-mt-20"
      aria-label="FAQ"
    >
      <div className="max-w-3xl mx-auto">
        <dl className="space-y-10">
          {items.map(({ id, question, answer }) => (
            <div key={id}>
              <dt className="text-base md:text-lg font-bold text-fg mb-2">
                {question}
              </dt>
              <dd className="text-base md:text-lg text-muted leading-relaxed">
                {answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
