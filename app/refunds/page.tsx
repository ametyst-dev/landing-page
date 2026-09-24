import type { Metadata } from "next";
import LegalPage, { A, H2, P } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Refund and Cancellation Policy · Ametyst" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund and Cancellation Policy">
      <H2>Cancelling a plan</H2>
      <P>
        Pro and Team are monthly plans that renew automatically. You can cancel at any time from Settings or by writing to{" "}
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. Cancellation takes effect at the end of the month you have
        already paid: you keep the plan until then, you are not charged again, and your workspace continues on Pay per use. Plan
        fees for a month already started are not refunded.
      </P>

      <H2>Pay per use</H2>
      <P>There is nothing to cancel: you pay only when you choose to buy credits.</P>

      <H2>Credits are not refundable</H2>
      <P>
        Credits are delivered to your workspace immediately after payment and can be used straight away, so top-ups are final.
        Credits you buy never expire, so they stay available for as long as your workspace is open. Credits included in a monthly
        plan reset at each renewal.
      </P>

      <H2>When we refund</H2>
      <P>
        If we close your workspace or discontinue the Service without a breach on your side, we refund your paid, unused credits.
      </P>

      <H2>Billing errors are always corrected</H2>
      <P>
        If you were charged twice, charged a wrong amount, or a payment went through and the credits did not reach your
        workspace, write to us and we fix it: by delivering the credits or by returning the payment.
      </P>

      <H2>Closing your workspace</H2>
      <P>
        You can close your workspace at any time from Settings or by writing to{" "}
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. Unused credits are not refunded when you choose to close.
      </P>

      <H2>How to reach us</H2>
      <P>
        Email <A href="mailto:support@ametyst.ai">support@ametyst.ai</A> from a workspace admin address with the workspace name
        and the date and amount of the payment. We answer within 2 business days.
      </P>

      <H2>How refunds are paid</H2>
      <P>
        To the original payment method, within 5-10 business days. If your card was charged in a currency other than euro, you get
        back exactly the amount you paid, at the same exchange rate as the original payment. The corresponding credits are removed
        from the workspace and a credit note is issued for the invoice.
      </P>

      <H2>Disputes</H2>
      <P>
        If something looks wrong with a charge, write to us first. We resolve billing problems quickly and without the delays of a
        bank dispute.
      </P>
    </LegalPage>
  );
}
