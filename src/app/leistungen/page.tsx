import { PageIntro, ContactStrip } from '@/components/ui';
import { Services } from '@/components/sections';
export const metadata = {
  title: 'Leistungen – Taxi, Krankenfahrten & Transfers',
  description:
    'Taxi, Krankenfahrten, Flughafentransfers, Geschäfts-, Kinder- und Kurierfahrten in Ratzeburg. Fahrt direkt per WhatsApp oder Telefon anfragen.',
  alternates: { canonical: '/leistungen' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Für jeden Anlass der passende Weg" title="Unsere Leistungen.">
        <p>
          Für Ihre täglichen Wege, wichtige Termine und die nächste Reise. In Ratzeburg, im Kreis
          Herzogtum Lauenburg und nach Vereinbarung darüber hinaus.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container">
          <Services full />
          <p className="notice">
            Besondere Anforderungen, Kindersitze, Hilfsmittel oder größere Gepäckmengen sprechen Sie
            bitte vorab mit uns ab. Die bisherige Website nennt Fahrten für bis zu vier Personen.
          </p>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
