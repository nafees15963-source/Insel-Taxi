import Link from 'next/link';
import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';

export const metadata = {
  title: 'Impressum',
  description:
    'Anbieterkennzeichnung von Insel Taxi, Inhaber Naeem Ahmed, in Ratzeburg. Kontakt, steuerliche Angaben und zuständige Aufsichtsbehörde.',
  alternates: { canonical: '/impressum' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Unternehmensangaben" title="Impressum">
        <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).</p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <nav className="legal-nav" aria-label="Impressum – Inhalt">
            <a href="#anbieter">Anbieter</a>
            <a href="#kontakt">Kontakt</a>
            <a href="#aufsicht">Aufsichtsbehörde</a>
            <a href="#kennzeichen">Kennzeichen</a>
          </nav>
          <div className="prose">
            <h2 id="anbieter">Anbieter und Inhaber</h2>
            <p>
              {company.legalName}
              <br />
              Inhaber: {company.owner}
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city}
              <br />
              Deutschland
            </p>
            <h2 id="kontakt">Kontakt</h2>
            <p>
              Telefon: <a href={'tel:' + company.phone}>{company.phoneDisplay}</a>
              <br />
              WhatsApp:{' '}
              <a
                href={'https://wa.me/' + company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.whatsappDisplay}
              </a>
              <br />
              E-Mail: <a href={'mailto:' + company.email}>{company.email}</a>
            </p>
            <h2 id="kennzeichen">Steuerliche Angaben und Institutionskennzeichen</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:{' '}
              <strong>{company.vatId}</strong>
            </p>
            <p>Steuernummer: {company.taxNumber}</p>
            <p>Institutionskennzeichen (IK): {company.institutionId}</p>
            <p>
              Das Institutionskennzeichen dient der Zuordnung bei der Abrechnung mit
              Sozialversicherungsträgern. Es ist keine Zusage einer Kostenübernahme für eine
              bestimmte Fahrt.
            </p>
            <h2 id="aufsicht">Zuständige Genehmigungs- und Aufsichtsbehörde</h2>
            <p>
              Kreis Herzogtum Lauenburg
              <br />
              Fachdienst 141 Straßenverkehr – Straßenverkehrsbehörde
              <br />
              Kesselflickerstraße 2<br />
              21493 Elmenhorst
              <br />
              Telefon: <a href="tel:+4945418010141">04541 801-0141</a>
              <br />
              E-Mail: <a href="mailto:strassenverkehr@kreis-rz.de">strassenverkehr@kreis-rz.de</a>
            </p>
            <p>
              <a
                href="https://www.kreis-rz.de/Strassenverkehr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fachdienst Straßenverkehr beim Kreis Herzogtum Lauenburg
              </a>
            </p>
            <h2>Rechtliche Grundlagen des Taxiverkehrs</h2>
            <p>
              Für den Taxiverkehr gelten insbesondere das Personenbeförderungsgesetz (PBefG),
              darunter § 47 zum Verkehr mit Taxen, und die Verordnung über den Betrieb von
              Kraftfahrunternehmen im Personenverkehr (BOKraft).
            </p>
            <ul>
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/pbefg/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Personenbeförderungsgesetz (PBefG)
                </a>
              </li>
              <li>
                <a
                  href="https://www.gesetze-im-internet.de/bokraft/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BOKraft
                </a>
              </li>
              <li>
                <Link href="/fahrpreis">Aktuelle Tarifinformationen und Kreisverordnung</Link>
              </li>
            </ul>
            <h2>Fahrtanfragen und Buchung</h2>
            <p>
              Die Formulare auf dieser Website bereiten eine Nachricht für WhatsApp oder Ihr
              E-Mail-Programm vor. Das Öffnen oder Versenden einer Anfrage bestätigt noch keine
              Fahrt. Eine Buchung kommt erst nach unserer ausdrücklichen Bestätigung zustande.
              Verfügbarkeit, Abholzeit und besondere Anforderungen stimmen wir persönlich mit Ihnen
              ab.
            </p>
            <h2>Inhalte und Nutzungsrechte</h2>
            <p>
              Die Inhalte dieser Website und das Logo von Insel Taxi unterliegen den jeweils
              geltenden Schutzrechten. Eine Nutzung außerhalb der gesetzlichen Erlaubnisse bedarf
              der Zustimmung des jeweiligen Rechteinhabers. Marken und Kennzeichen externer Dienste
              gehören ihren jeweiligen Inhabern.
            </p>
            <h2>Datenschutz</h2>
            <p>
              Wie wir personenbezogene Daten verarbeiten und welche Rechte Sie haben, erläutern wir
              in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
            <p>Stand: 1. November 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}
