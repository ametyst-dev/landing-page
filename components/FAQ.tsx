const items = [
  {
    id: "what",
    question: "What is Ametyst?",
    answer: "A wallet connected to your bank account",
  },
  {
    id: "who",
    question: "Who is it for?",
    answer: "Allowing you to spin up virtual wallets and equip your agents with them",
  },
  {
    id: "how",
    question: "How does it work?",
    answer: "Integrate Ametyst SDK in 3 lines of code to set paywalls on your API endpoints.",
  },
  {
    id: "vs-stripe",
    question: "Why Ametyst vs. Stripe?",
    answer: "Built on stablecoins, x402 and integrable with MCP, A2A, skills.",
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
