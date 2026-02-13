"use client";

import { useState } from "react";

const items = [
  {
    id: "funds-held",
    question: "Where are my funds held?",
    answer: "Your funds are held in a self-custodial wallet connected to your bank account. You remain the sole controller of your funds at all times. You can withdraw back to your connected bank account whenever you choose."
  },
  {
    id: "security",
    question: "What happens if I lose access or my account is compromised?",
    answer: "Ametyst wallets are linked to your verified bank account and to addresses you explicitly authorize. Funds cannot be sent to unknown or unapproved destinations. If you suspect unauthorized access, you can immediately freeze your wallet and return the funds to your connected bank account.\n\nSecurity and recovery mechanisms are designed to minimize the risk of fund loss."
  },
  {
    id: "compliance",
    question: "Is Ametyst compliant?",
    answer: "Yes. Ametyst is not a custodian and does not hold client funds. It provides self-custodial wallet infrastructure built on blockchain technology. Bank connectivity and identity verification are performed through regulated third-party providers."
  },
  {
    id: "guardrails",
    question: "How can I be sure my agent only spends where I want?",
    answer: "Ametyst allows you to define strict spending policies for each agent wallet.\nYou can whitelist approved services, set spending limits, and define thresholds that trigger additional controls.\nIf an agent attempts to interact with a new or unrecognized service, you can require human approval before the transaction is executed.\nThis ensures agents operate autonomously, but always within the boundaries you define."
  },
  {
    id: "authentication",
    question: "How can I verify which agents are allowed to pay for my services?",
    answer: "Ametyst enables agent authentication at the wallet level.\nAs a service provider, you can require that payments originate only from registered or authorized agent wallets.\nThis allows you to restrict access to verified users and ensure that only approved agents can consume your services.\nCombined with programmable payment rules, this provides full visibility and control over who is interacting with your product."
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="pt-24 md:pt-32 pb-16 md:pb-24 px-8 md:px-16 lg:px-24 xl:px-32 bg-bg scroll-mt-20 border-b border-border/20"
      aria-label="FAQ"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-fg mb-8 md:mb-10 text-center">
          FAQs
        </h2>
        <dl className="space-y-4">
          {items.map(({ id, question, answer }) => {
            const isOpen = openId === id;
            return (
              <div key={id} className="border-b border-border/20 pb-4">
                <dt>
                  <button
                    type="button"
                    onClick={() => toggleItem(id)}
                    className="w-full flex items-center justify-between text-left text-base md:text-lg font-bold text-fg py-2 hover:opacity-80 transition-opacity"
                    aria-expanded={isOpen}
                  >
                    <span>{question}</span>
                    <svg
                      className={`w-5 h-5 text-fg transition-transform duration-200 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </dt>
                <dd
                  className={`text-base md:text-lg text-muted leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="whitespace-pre-line">{answer}</div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
