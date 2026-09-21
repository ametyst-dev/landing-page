import type { Metadata } from "next";
import LegalPage, { A, H2, P, UL } from "@/components/LegalPage";
import { PlansTable } from "@/components/Pricing";

export const metadata: Metadata = { title: "Pricing · Ametyst" };

export default function PricingPage() {
  return (
    <LegalPage title="Pricing" updated={false}>
      <P>
        <strong>Everything on Ametyst is priced in credits.</strong> One balance, for everything: Ametyst Agent and external
        tools. Start on pay per use, or pick a monthly plan and get more credits for the same money.
      </P>
      <div className="my-8 xl:-mx-24">
        <PlansTable />
      </div>

      <H2>Buying credits</H2>
      <UL>
        <li>
          You buy credits in euro, at the rate shown on the top-up screen before you pay (for example &quot;1 € = 108
          credits&quot;). The rate is updated once a day and is locked from the preview until you complete the payment.
        </li>
        <li>Minimum top-up: €10. Amounts are VAT excluded.</li>
        <li>Payment methods: credit or debit card, bank transfer.</li>
        <li>
          Paying with a card in another currency (USD, GBP, ...)? Stripe, our payment processor, shows you the amount in your
          currency at checkout and converts it; the conversion cost is included in the amount Stripe shows you. You can always
          choose to pay in euro instead.
        </li>
        <li>
          VAT is added at checkout where applicable (22% for Italian customers; reverse charge for EU businesses with a valid VAT
          number; no Italian VAT outside the EU).
        </li>
        <li>You receive an invoice for every payment.</li>
        <li>
          <strong>Credits you buy never expire.</strong> Credits included in a monthly plan are for that month and are used
          first: what you do not use resets at renewal. Need more before renewal? Top up like anyone else.
        </li>
      </UL>

      <H2>What things cost</H2>
      <P>
        Every tool and every Ametyst Agent action has a listed price in credits, shown in the catalog and in your dashboard before
        your agent uses it. Listed prices include Ametyst&apos;s margin, and we may adjust them over time as our costs change; a
        new price applies only to what you use after it is shown. The price is deducted from your credit balance when the call
        succeeds.
      </P>

      <H2>What credits are</H2>
      <P>
        Credits are a prepayment for Ametyst services. They can be used only on Ametyst, only by the workspace that bought them.
        They cannot be transferred, exchanged for money, or used to pay anyone else. See the{" "}
        <A href="/terms">Terms of Service</A> and the <A href="/refunds">Refund Policy</A>.
      </P>
    </LegalPage>
  );
}
