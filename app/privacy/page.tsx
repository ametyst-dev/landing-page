import type { Metadata } from "next";
import LegalPage, { A, H2, P, Table, UL } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy · Ametyst" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <H2>Who is responsible</H2>
      <P>
        AMETYST SRL, Corso Magenta 56, 20123 Milano (MI), Italy, VAT no. IT14681630969 (&quot;Ametyst&quot;) is the data
        controller for the personal data described here. Contact: <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>.
      </P>

      <H2>Who this covers</H2>
      <P>
        We process personal data of the people who use Ametyst (workspace admins and members acting for a company, and
        individuals who use it for themselves), of people who contact us, and of visitors to this website.
      </P>

      <H2>What we hold and why</H2>
      <Table
        head={["Data", "Purpose", "Legal basis (GDPR art. 6)"]}
        rows={[
          [
            "Workspace accounts: email, name, avatar and sign-in identifier of the people who sign in. No passwords are stored",
            "Create and run your account and workspace",
            "Contract",
          ],
          [
            "Credentials we issue: API keys and tokens, stored as hashes only; encrypted account keys we cannot read without the customer",
            "Securing access",
            "Contract",
          ],
          [
            "Technical identifiers of the workspace's and its agents' accounts",
            "Metering credits and enforcing budgets and policies",
            "Contract",
          ],
          [
            "Usage telemetry: for each tool call, which tool, the shape of the parameters (field names, never values), the outcome and a hashed user identifier. Deleted after 90 days",
            "Metering, reporting to workspace admins, improving the Service, security",
            "Contract; legitimate interest",
          ],
          [
            "Billing details: company name and VAT number, or, for individuals, name, address and Italian tax code (codice fiscale), plus payment and invoice history",
            "Billing, invoicing, tax and accounting duties",
            "Contract; legal obligation",
          ],
          ["Payment data", "Card payments go through Stripe Checkout. We keep Stripe's reference, never the card", "Contract"],
          ["Support messages", "Answering you", "Contract; legitimate interest"],
        ]}
      />

      <H2>Your tasks and their memory</H2>
      <P>
        The tasks you save in Ametyst (instructions, documents and records a task keeps between runs) are your content, stored in
        our database and readable only inside your workspace. You choose what to save. Ametyst Agent reads them inside your
        workspace to run and improve your tasks, and for nothing else. Where this content includes personal data, your company is
        the controller and Ametyst acts as its processor.
      </P>

      <H2>What passes through us, and what does not</H2>
      <UL>
        <li>
          <strong>Accounts you connect (for example Gmail, Notion, Slack, Granola): never through us.</strong> The token or key is
          stored in the keychain of your own machine and never reaches our servers. Calls go from your machine to the provider and
          back. We see only the tool name, the parameter shape and the outcome.
        </li>
        <li>
          <strong>Paid tools in the catalog: through our servers, not stored.</strong> The request and the provider&apos;s answer
          transit through our servers in the EU to reach your agent. We do not store the answers. Our logs keep method,
          destination address, transaction and amount; where a provider takes its input in the address itself (for example a
          domain to look up), that value is in the log. We are removing it.
        </li>
        <li>
          <strong>Your prompts to your model: never through us.</strong> Your agent runs on your own tools with your own model
          provider.
        </li>
      </UL>

      <H2>Who processes data for us</H2>
      <Table
        head={["Provider", "Role", "Region"]}
        rows={[
          ["Supabase", "database", "EU (Frankfurt)"],
          ["Railway", "API and tool-proxy hosting", "EU"],
          ["Cloudflare", "edge routing", "global edge"],
          ["Vercel", "web app hosting", "global edge"],
          ["Google, Privy", "sign-in (Google account or email one-time code)", "US"],
          ["Stripe", "payments", "US / EU"],
          ["A-Cube", "electronic invoicing, transmission to the Italian tax authority's SDI", "EU (Italy)"],
          ["Resend", "transactional email", "US"],
          ["PostHog", "product analytics", "US"],
          ["OpenRouter, Anthropic", "ranking of tool descriptions; no customer data", "US"],
          ["ZeroDev", "account infrastructure; technical account identifiers only", "global"],
        ]}
      />
      <P>
        The upstream providers of the paid tools receive the content of the call your agent makes, not your account data. All
        providers above act as processors under art. 28 GDPR. We do not sell personal data and do not use it for advertising.
      </P>

      <H2>Transfers outside the EEA</H2>
      <P>
        Transfers to the United States rely on the EU-US Data Privacy Framework where the provider is certified, otherwise on the
        European Commission&apos;s Standard Contractual Clauses.
      </P>

      <H2>How long we keep it</H2>
      <P>
        Usage telemetry: 90 days. Account data: for the life of the account and 12 months after closure. Invoices and accounting
        records: 10 years, as Italian law requires. Your tasks and their memory: until you delete them or close the workspace.
      </P>

      <H2>Your rights</H2>
      <P>
        You can ask to access, correct, delete, restrict or port your data, and object to processing based on legitimate interest,
        by writing to <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. We answer within 30 days. You can complain to
        the Italian data protection authority (Garante per la protezione dei dati personali, garanteprivacy.it).
      </P>

      <H2>Cookies</H2>
      <P>
        This website (ametyst.ai) uses no analytics or advertising cookies. The Ametyst web app, after you sign in, uses a
        technical session token (valid for one hour and renewed while you use the app) to keep you signed in, and product
        analytics cookies (PostHog) to understand how the app is used; analytics data is linked to your account email and is never
        used for advertising.
      </P>

      <H2>Changes</H2>
      <P>We post updates here and tell workspace admins by email when a change is material.</P>
    </LegalPage>
  );
}
