import type { Metadata } from "next";
import LegalPage, { A, H2, P } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Refund and Cancellation Policy · Ametyst" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund and Cancellation Policy">
      <H2>Cancelling a plan</H2>
      <P>
        Pro is a monthly plan that renews automatically. You can cancel at any time from Settings or by writing to{" "}
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. Cancellation takes effect at the end of the month you have
        already paid: you keep the plan until then, you are not charged again, and your account continues on Pay per use. Plan
        fees for a month already started are not refunded.
      </P>

      <H2>Pay per use</H2>
      <P>There is nothing to cancel: you pay only when you choose to buy credits.</P>

      <H2>Credits are not refundable (business customers)</H2>
      <P>
        Credits are delivered to your account immediately after payment and can be used straight away, so top-ups are final.
        Credits you buy never expire, so they stay available for as long as your account is open. Credits included in a monthly
        plan reset at each renewal.
      </P>

      <H2>If you buy as an individual (consumer)</H2>
      <P>
        The same applies. Credits are digital content delivered immediately at your express request, given when you complete the
        purchase, so the 14-day right of withdrawal does not apply and top-ups are final. Billing errors are always corrected,
        see below.
      </P>

      <H2>When we refund</H2>
      <P>
        If we close your account or discontinue the Service without a breach on your side, we refund your paid, unused credits.
      </P>

      <H2>Billing errors are always corrected</H2>
      <P>
        If you were charged twice, charged a wrong amount, or a payment went through and the credits did not reach your
        account, write to us and we fix it: by delivering the credits or by returning the payment.
      </P>

      <H2>Closing your account</H2>
      <P>
        You can close your account at any time from Settings or by writing to{" "}
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. Unused credits are not refunded when you choose to close.
      </P>

      <H2>How to reach us</H2>
      <P>
        Email <A href="mailto:support@ametyst.ai">support@ametyst.ai</A> from an account admin address with the company name
        and the date and amount of the payment. We answer within 2 business days.
      </P>

      <H2>How refunds are paid</H2>
      <P>
        To the original payment method, within 5-10 business days. If your card was charged in a currency other than euro, you get
        back exactly the amount you paid, at the same exchange rate as the original payment. The corresponding credits are removed
        from the account and a credit note is issued for the invoice.
      </P>

      <H2>Disputes</H2>
      <P>
        If something looks wrong with a charge, write to us first. We resolve billing problems quickly and without the delays of a
        chargeback.
      </P>
    </LegalPage>
  );
}
