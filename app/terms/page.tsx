import type { Metadata } from "next";
import LegalPage, { A, H2, P } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service · Ametyst" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <H2>1. Who we are</H2>
      <P>
        The Ametyst platform (&quot;Service&quot;) is provided by <strong>AMETYST SRL</strong>, a single-member limited liability
        company (società a responsabilità limitata con socio unico), registered office Corso Magenta 56, 20123 Milano (MI), Italy,
        VAT no. and tax code IT14681630969, Milan Companies Register no. 14681630969, REA MI-2800625, share capital €10,000.00
        fully paid-in, certified email ametystsrl@pec.it (&quot;Ametyst&quot;, &quot;we&quot;). Contact:{" "}
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>.
      </P>

      <H2>2. Who can use the Service</H2>
      <P>
        The Service is offered to companies, professionals and other organisations acting for purposes related to their trade,
        business or profession (&quot;Business Customers&quot;), and to individuals acting for purposes outside their trade,
        business or profession (&quot;Consumers&quot;). Business Customers and Consumers are together the &quot;Customer&quot;.
        If you create a workspace on behalf of an organisation you confirm that you have authority to bind it. If you are a
        Consumer, the mandatory protections of the law of your country of residence, including the Italian Consumer Code
        (Legislative Decree 206/2005) where applicable, prevail over anything in these Terms that would reduce them; clause 18
        says how these Terms apply to you.
      </P>

      <H2>3. The Service</H2>
      <P>
        Ametyst is a platform on which the Customer runs its AI agent workflows. At its centre is <strong>Ametyst Agent</strong>,
        Ametyst&apos;s own agent inside the Customer&apos;s workspace: it observes the runs of the Customer&apos;s workflows,
        reports what went wrong, proposes fixes, cost reductions and new workflows, and helps the Customer structure its tasks.
        Ametyst Agent never changes a workflow without the Customer&apos;s approval.
      </P>
      <P>
        By installing the Ametyst MCP on its own agent, the Customer also equips that agent to call external tools and APIs from
        the Ametyst catalog, within the budgets and policies the Customer sets, with reporting of every call.
      </P>
      <P>
        Ametyst Agent and all tools in the catalog are supplied to the Customer by Ametyst, in Ametyst&apos;s own name and at
        Ametyst&apos;s listed prices. Ametyst sources some tools from third-party providers, which act as Ametyst&apos;s
        suppliers. The Customer has no contract with those providers and makes no payment to them through the Service.
      </P>
      <P>
        Accounts the Customer connects itself (for example its email, documents or chat tools) remain the Customer&apos;s: the
        Customer&apos;s agent accesses them with the Customer&apos;s own credentials, which are not sent to Ametyst.
      </P>

      <H2>4. Accounts and workspaces</H2>
      <P>
        The Customer is responsible for the people and agents it authorises in its workspace, for the budgets and policies it
        sets, for the changes it approves, and for keeping credentials secure. Activity carried out with the Customer&apos;s
        credentials is treated as the Customer&apos;s.
      </P>

      <H2>5. Credits</H2>
      <P>
        <strong>5.1 Nature.</strong> Credits are a prepayment for Ametyst services and the unit in which all Ametyst prices are
        expressed. Credits are not money, electronic money, a deposit or a financial instrument, and earn no interest.
      </P>
      <P>
        <strong>5.2 Limits.</strong> Credits (a) can be used only to pay for services supplied by Ametyst through the Service;
        (b) cannot be used to pay third parties; (c) cannot be transferred, sold or assigned to another workspace or person; (d)
        cannot be converted into or redeemed for money, except where the Refund Policy or mandatory law provides for a refund.
      </P>
      <P>
        <strong>5.3 Purchase.</strong> Credits are bought in the dashboard, in euro, by card or bank transfer, at the rate of
        credits per euro shown to the Customer before payment, or are included in a Plan. Ametyst updates the rate daily and may
        change it at any time; the rate shown in the preview applies to that purchase, and a change never affects credits already
        bought. If the Customer pays with a card in a currency other than euro, the payment processor converts the amount at
        checkout, at the rate and cost it shows the Customer before payment; the Customer may choose to pay in euro instead.
        Payments are processed by Stripe; Ametyst does not store card data. Credits are added to the workspace after payment is
        confirmed.
      </P>
      <P>
        <strong>5.4 Use.</strong> Each tool call and each Ametyst Agent action has a listed price in credits, shown before use,
        deducted from the credit balance when the call succeeds.
      </P>
      <P>
        <strong>5.5 No expiry.</strong> Purchased credits do not expire while the workspace is open.
      </P>
      <P>
        <strong>5.6 Promotional and plan credits.</strong> Credits granted free of charge have no cash value and are never
        refundable. Credits included in a Plan are added to the same balance, can be used for everything, are granted for the
        monthly billing period and are used before purchased credits; plan credits not used by the end of the period are
        cancelled at renewal and do not carry over. Purchased credits are never affected by the reset. On Team, plan credits are
        shared by the workspace.
      </P>

      <H2>6. Plans</H2>
      <P>
        Ametyst offers Pay per use and monthly plans (Pro, Team) described on the <A href="/pricing">pricing page</A>. A monthly
        plan is billed in advance each month, per workspace (Pro) or per member (Team, minimum two members), includes the number
        of credits stated on the pricing page, and renews automatically until cancelled. Ametyst may change the price of a plan
        or the credits it includes from the next renewal, with at least 15 days&apos; notice by email. The Customer can cancel at
        any time from Settings; cancellation takes effect at the end of the billing period already paid, and the workspace then
        continues on Pay per use. Fees for a period already started are not refunded.
      </P>

      <H2>7. Prices, taxes and invoices</H2>
      <P>
        Prices of tools and of Ametyst Agent are listed in credits and include Ametyst&apos;s margin. Ametyst may change listed
        prices and plan prices over time, including to reflect changes in its costs. A new listed price applies only to use after
        it is shown in the catalog and never affects credits already spent; a new plan price applies from the next renewal, with
        at least 15 days&apos; notice by email.
      </P>
      <P>
        Credits and plans are sold in euro, VAT excluded. VAT is applied at payment according to the Customer&apos;s country and
        VAT status. Ametyst issues an invoice for each payment, always in euro on the euro amount (also when the Customer&apos;s
        card was charged in another currency), showing the amount paid and, for top-ups, the credits received, to the billing
        details the Customer enters in Settings → Invoice; the Customer is responsible for their accuracy. Italian customers
        receive an electronic invoice through the Sistema di Interscambio (SDI).
      </P>

      <H2>8. Refunds and cancellation</H2>
      <P>
        Governed by the <A href="/refunds">Refund and Cancellation Policy</A>, which forms part of these Terms.
      </P>

      <H2>9. Chargebacks and payment disputes</H2>
      <P>
        If a payment is disputed, reversed or flagged as fraudulent, Ametyst may suspend the workspace, remove the corresponding
        credits, and, where those credits were already used, invoice the Customer for the amount used. Please contact support
        before opening a dispute with your bank: we can usually resolve it faster.
      </P>

      <H2>10. Acceptable use</H2>
      <P>
        The Customer must not: use the Service unlawfully or to infringe others&apos; rights; resell or sublicense credits or raw
        access to the Service; attempt to bypass budgets, policies, rate limits or security controls; use a tool in breach of the
        usage restrictions shown for it in the catalog. Ametyst may suspend access in case of breach, security risk or suspected
        fraud.
      </P>

      <H2>11. Ametyst Agent&apos;s suggestions, availability and changes to the catalog</H2>
      <P>
        Ametyst Agent&apos;s reports and proposals are suggestions produced by automated systems: they can be wrong, and the
        Customer decides whether to apply them. Ametyst may add, change or remove tools. If a tool is removed, unused credits
        remain usable on the rest of the Service. The Service is provided with reasonable skill and care; Ametyst does not
        guarantee that a given tool is uninterrupted or that third-party data is accurate or complete.
      </P>

      <H2>12. Customer data</H2>
      <P>
        The Customer&apos;s tasks, their memory and the content of tool calls are the Customer&apos;s. Ametyst processes them only
        to deliver the Service, and Ametyst Agent reads them inside the Customer&apos;s workspace for that purpose only. Personal
        data is handled as described in the <A href="/privacy">Privacy Policy</A>.
      </P>

      <H2>13. Intellectual property</H2>
      <P>
        Ametyst keeps all rights in the platform and in Ametyst Agent. The Customer keeps all rights in its tasks, inputs and, as
        between the parties, in the outputs it obtains, subject to the terms shown for each tool.
      </P>

      <H2>14. Liability</H2>
      <P>
        Nothing limits liability for wilful misconduct or gross negligence, or where the law does not allow limitation.
        Otherwise, Ametyst&apos;s total liability in any 12-month period is limited to the amount the Customer paid to Ametyst in
        that period, and Ametyst is not liable for loss of profit, loss of data or indirect damage.
      </P>

      <H2>15. Term and termination</H2>
      <P>
        These Terms apply while the Customer has a workspace. The Customer may close its workspace at any time. Ametyst may
        terminate for material breach, or on 30 days&apos; notice for convenience; in the latter case paid, unused credits are
        refunded.
      </P>

      <H2>16. Changes to these Terms</H2>
      <P>
        We may update these Terms. Material changes are notified to workspace admins by email at least 15 days before they apply.
      </P>

      <H2>17. Governing law and jurisdiction</H2>
      <P>
        Italian law. For Business Customers, exclusive jurisdiction: the Court of Milan. For Consumers, the courts of the
        Consumer&apos;s place of residence or domicile, and any mandatory choice-of-law rules of the Consumer&apos;s country
        apply.
      </P>

      <H2>18. Consumers: withdrawal and how these Terms apply to you</H2>
      <P>
        <strong>18.1 Right of withdrawal.</strong> If you are a Consumer, you may withdraw from a purchase of credits within 14
        days of payment, without giving a reason, by writing to <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>.
        Because credits are delivered to your workspace immediately, by completing the purchase you ask us to start providing
        the Service at once and acknowledge that, for the credits you have already used, you lose the right of withdrawal; we
        refund the credits you have not used, at the price you paid for them, to the original payment method within 14 days of
        your request. The same applies to the first month of a Plan, in proportion to the days already elapsed.
      </P>
      <P>
        <strong>18.2 Plans.</strong> A monthly Plan renews automatically; you can cancel at any time from Settings, with effect
        at the end of the paid month. We remind you by email before each renewal where the law requires it.
      </P>
      <P>
        <strong>18.3 Clauses that do not apply to Consumers.</strong> Clause 14 (liability limits) does not limit our liability
        towards Consumers for damages caused by our fault; clause 9 applies to Consumers only to the extent permitted by law;
        clause 16 changes apply to Consumers only from the first renewal or purchase after the notice.
      </P>
      <P>
        <strong>18.4 Disputes.</strong> You can contact us at <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>; if we
        cannot resolve a dispute, you may use the out-of-court dispute resolution bodies available in your country of residence.
      </P>
    </LegalPage>
  );
}
