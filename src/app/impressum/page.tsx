import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung und Kontaktinformationen von Insel Taxi Ratzeburg, Inhaber Naeem Ahmed.',
  alternates: { canonical: '/impressum/' },
};

export default function ImpressumPage() {
  return (
    <>
      <PageIntro eyebrow="Rechtliches" title="Impressum" description="Wer hinter Insel Taxi Ratzeburg steht und wie Sie uns erreichen." />
      <section className="section">
        <div className="container prose">
          <aside className="notice" aria-label="Hinweis zum Bearbeitungsstand">
            <strong>Hinweis zum Bearbeitungsstand</strong>
            <p>Die folgenden Angaben wurden aus der bisherigen Unternehmenswebsite übernommen. Der Betreiber muss die Aktualität sowie gegebenenfalls erforderliche Register- und Wirtschafts-Identifikationsangaben vor dem öffentlichen Start bestätigen. Eine rechtliche Prüfung steht aus.</p>
          </aside>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p><strong>{company.name}</strong><br />Inhaber: {company.owner}<br />{company.street}<br />{company.postalCode} {company.city}<br />Deutschland</p>
          <h2>Kontakt</h2>
          <p>Telefon: <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a><br />E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a></p>
          <h2>Umsatzsteuer und Institutionskennzeichen</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: <strong>{company.vatId}</strong><br />Institutionskennzeichen (IK): {company.institutionId}</p>
          <h2>Zuständige Aufsichts- und Genehmigungsbehörde</h2>
          <p>Kreis Herzogtum Lauenburg<br />Barlachstraße 2<br />23909 Ratzeburg<br /><a href="https://www.kreis-rz.de/" target="_blank" rel="noopener noreferrer">www.kreis-rz.de</a></p>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          <p>Diese Erklärung entspricht dem bisherigen Impressum und ist vom Betreiber für den Relaunch zu bestätigen.</p>
          <h2>Fragen zu einer Fahrt</h2>
          <p>Für Fahrtanfragen, Änderungen und Rückfragen erreichen Sie uns direkt unter <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>. Eine Anfrage über die Website ist erst nach unserer ausdrücklichen Bestätigung verbindlich.</p>
          <p>Stand: 23. Oktober 2026</p>
        </div>
      </section>
    </>
  );
}
