import { Phone } from 'lucide-react';
import Link from 'next/link';
import { PageIntro, CheckList } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { company } from '@/config/company';
export const metadata = {
  title: 'Fahrt per WhatsApp oder E-Mail anfragen',
  description:
    'Taxi in Ratzeburg ohne Registrierung anfragen: Strecke, Datum und Uhrzeit eingeben und die vorbereitete Nachricht per WhatsApp oder E-Mail senden.',
  alternates: { canonical: '/fahrt-anfragen' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Wenige Angaben. Direkter Kontakt." title="Wohin dürfen wir Sie bringen?">
        <p>
          Tragen Sie Ihre Fahrt ein. Wir bereiten eine übersichtliche Nachricht für WhatsApp oder
          E-Mail vor, die Sie selbst absenden. Anschließend bestätigen wir persönlich die
          Verfügbarkeit.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container content-grid">
          <div className="form-panel">
            <h2>Ihre Fahrtanfrage</h2>
            <RideForm />
          </div>
          <aside>
            <div className="aside-card">
              <h2>Einfach anfragen.</h2>
              <CheckList
                items={[
                  'Kein Benutzerkonto erforderlich',
                  'Keine Onlinezahlung',
                  'Keine Speicherung Ihrer Formulareingaben auf dieser Website',
                  'Persönliche Bestätigung durch Insel Taxi',
                ]}
              />
              <p>
                Das Öffnen oder Absenden einer WhatsApp-Nachricht oder E-Mail ist noch keine
                verbindliche Buchung.
              </p>
              <Link href="/datenschutz" className="text-link">
                So gehen wir mit Ihren Daten um
              </Link>
            </div>
            <div className="help-panel">
              <h3>Sie möchten jetzt los?</h3>
              <p>Für kurzfristige Fahrten und Rückfragen rufen Sie uns direkt an.</p>
              <a href={`tel:${company.phone}`}>
                <Phone size={20} />
                {company.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
