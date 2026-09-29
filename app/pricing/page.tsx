import type { Metadata } from "next";
import LegalPage, { A, H2, P, UL } from "@/components/LegalPage";
import { PlansTable } from "@/components/Pricing";

export const metadata: Metadata = { title: "Pricing · Ametyst" };

export default function PricingPage() {
  return (
    <LegalPage title="Pricing" updated={false}>
      <P>
        <strong>Opening a workspace is free.</strong> Invite your whole team, set the spending policies and see what every
        agent spends. Your agents pay for the tools they use, and nothing else.
      </P>
      <P>
        <strong>Pro is for the people who want every workflow to cost less.</strong> Ametyst finds a cheaper model or tool
        for each step, and you approve it. You choose who goes on Pro and pay €15 a month for each of them. Enterprise is
        for larger companies.
      </P>
      <div className="my-8 xl:-mx-24">
        <PlansTable />
      </div>

      <H2>How you pay for what your agents use</H2>
      <UL>
        <li>
          Your agents pay from the credits of your workspace. The price of every tool and model is shown before your agent
          uses it.
        </li>
        <li>You add credits in euro, by card or bank transfer, from €10. They never expire.</li>
        <li>VAT is added at checkout where it applies, and you receive an invoice for every payment.</li>
      </UL>
      <P>
        The rules are in the <A href="/terms">Terms of Service</A> and the <A href="/refunds">Refund Policy</A>.
      </P>
    </LegalPage>
  );
}
