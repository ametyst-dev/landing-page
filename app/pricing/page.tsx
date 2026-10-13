import type { Metadata } from "next";
import LegalPage, { A, H2, P, UL } from "@/components/LegalPage";
import { PlansTable } from "@/components/Pricing";

export const metadata: Metadata = { title: "Pricing · Ametyst" };

export default function PricingPage() {
  return (
    <LegalPage title="Pricing" updated={false}>
      <P>
        <strong>Opening a workspace is free.</strong> Invite your team, set the spending policies and see what every agent
        spends. Your agents pay for the tools they use, and nothing else. The figure you saved is always visible, and every
        month you get the five savings advice that save you most.
      </P>
      <P>
        <strong>Pro is for the whole workspace.</strong> Every seat goes on Pro, €15 per seat per month, and every seat gets
        unlimited savings advice: a cheaper model or tool for each step of every workflow, which you approve. The workspace
        gets unlimited agents and policies, roles for the admin and an audit log. Enterprise is custom, on top of Pro.
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
        <li>Credits are in euro: you add €10, your workspace has €10 to spend.</li>
        <li>
          If your card is in another currency, Stripe, our payment processor, shows you the amount in your currency at
          checkout and converts it. You can always choose to pay in euro.
        </li>
        <li>VAT is added at checkout where it applies, and you receive an invoice for every payment.</li>
        <li>
          Credits can be used only on Ametyst, by the workspace that bought them. They cannot be transferred or exchanged
          for money.
        </li>
      </UL>
      <P>
        The rules are in the <A href="/terms">Terms of Service</A> and the <A href="/refunds">Refund Policy</A>.
      </P>
    </LegalPage>
  );
}
