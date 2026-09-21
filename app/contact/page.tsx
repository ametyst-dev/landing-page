import type { Metadata } from "next";
import LegalPage, { A, H2, P } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Contact · Ametyst" };

export default function ContactPage() {
  return (
    <LegalPage title="Contact" updated={false}>
      <H2>Support</H2>
      <P>
        <A href="mailto:support@ametyst.ai">support@ametyst.ai</A>. We answer within 2 business days, Monday to Friday, 9:00-18:00
        CET.
      </P>
      <P>
        Phone: <A href="tel:+393466676803">+39 346 667 6803</A>
      </P>

      <H2>Sales</H2>
      <P>
        <A href="/book">Book a call</A> and we set Ametyst up with you.
      </P>

      <H2>Company</H2>
      <P>
        <strong>AMETYST SRL</strong>, single-member company (società con socio unico)
        <br />
        Corso Magenta 56, 20123 Milano (MI), Italy
        <br />
        VAT no. / tax code IT14681630969 · REA MI-2800625 · Share capital €10,000.00 fully paid-in
        <br />
        Certified email (PEC): ametystsrl@pec.it
      </P>
    </LegalPage>
  );
}
