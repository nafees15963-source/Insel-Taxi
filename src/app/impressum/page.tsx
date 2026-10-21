import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';
export const metadata = {
  title: 'Impressum',
  description:
    'Unternehmens- und Kontaktangaben von Insel Taxi Ratzeburg. Prüfhinweise für die Betreiberfreigabe.',
  alternates: { canonical: '/impressum' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Unternehmensangaben" title="Impressum">
        <p>
          Angaben aus dem bisherigen Unternehmensauftritt. Stand der Übernahme: 21. Oktober 2026.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <div className="legal-status">
            <strong>Entwurf – Betreiberprüfung erforderlich</strong>Die bisherige Website enthält
            widersprüchliche Angaben zum Inhaber und zur Anschrift. Die folgenden Angaben stammen
            aus deren Impressum und Kontaktseite. Bitte vor Veröffentlichung bestätigen und
            rechtlich prüfen lassen. Dieser Text ist nicht rechtlich geprüft.
          </div>
          <div className="prose">
            <h2>Anbieter</h2>
            <p>
              {company.name}
              <br />
              Inhaber: {company.owner}
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city}
              <br />
              Deutschland
            </p>
            <h2>Kontakt</h2>
            <p>
              Telefon: <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
              <br />
              WhatsApp: {company.whatsappDisplay}
              <br />
              E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <h2>Umsatzsteuer-Identifikationsnummer</h2>
            <p>
              {company.vatId}
              <br />
              Aus der bisherigen Website übernommen; durch den Betreiber zu bestätigen.
            </p>
            <h2>Genehmigung und Aufsicht</h2>
            <p>
              Die bisherige Website nennt eine Genehmigung nach § 47 Personenbeförderungsgesetz und
              als zuständige Behörde den Kreis Herzogtum Lauenburg, Barlachstraße 2, 23909
              Ratzeburg. Aktuelle Zuständigkeit, Behördenanschrift und Genehmigungsangaben sind vor
              Veröffentlichung zu bestätigen.
            </p>
            <p>
              <a href="https://www.kreis-rz.de/" target="_blank" rel="noopener noreferrer">
                Website des Kreises Herzogtum Lauenburg
              </a>
            </p>
            <h2>Weitere erforderliche Angaben</h2>
            <p>
              [VOM BETREIBER ZU PRÜFEN: Rechtsform, gegebenenfalls Registereintrag, zuständige
              Aufsichtsbehörde, berufsrechtliche Pflichtangaben und Angaben zur
              Verbraucherschlichtung.]
            </p>
            <h2>Inhalte und Original-Logo</h2>
            <p>
              Das vom Betreiber bereitgestellte Original-Logo darf ausschließlich mit den
              entsprechenden Nutzungsrechten verwendet werden. Es wird kein Ersatzlogo erstellt. Der
              vollständige Marken- und Bildnachweis ist vor Veröffentlichung durch den Betreiber zu
              bestätigen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
