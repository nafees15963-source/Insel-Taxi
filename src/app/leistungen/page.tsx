import { PageIntro, ContactStrip } from '@/components/ui';
import { Fleet, Services } from '@/components/sections';
export const metadata = {
  title: 'Leistungen – Taxi, Krankenfahrten & Transfers',
  description:
    'Taxi, Krankenfahrten, Flughafentransfers, Geschäfts-, Kinder- und Kurierfahrten in Ratzeburg. Fahrt direkt per WhatsApp, E-Mail oder Telefon anfragen.',
  alternates: { canonical: '/leistungen' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Für jeden Anlass der passende Weg" title="Unsere Leistungen.">
        <p>
          Für Ihre täglichen Wege, wichtige Termine und die nächste Reise. In Ratzeburg, im Kreis
          Herzogtum Lauenburg und bundesweit. Fahrten ins Ausland auf Anfrage. Wählen Sie eine
          Leistung für weitere Informationen und das passende Anfrageformular.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container">
          <Services full />
          <p className="notice">
            Fahrgäste, Kindersitze, Hilfsmittel und größere Gepäckmengen stimmen wir vorab
            persönlich mit Ihnen ab. Auch längere Strecken planen wir passend zu Ihrer Anfrage.
          </p>
        </div>
      </section>
      <Fleet />
      <ContactStrip />
    </>
  );
}
