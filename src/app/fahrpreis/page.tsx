import { PageIntro, CallButton, WhatsAppButton } from '@/components/ui';
import { FareCalculator } from '@/components/fare-calculator';
import { tariff } from '@/config/tariff';
export const metadata = {
  title: 'Fahrpreis – Strecke & Taxitarif',
  description:
    'Fahrpreis für Ihr Taxi in Ratzeburg anfragen. Transparente Tarifinformationen, optionale Routenberechnung und direkter Kontakt zu Insel Taxi.',
  alternates: { canonical: '/fahrpreis' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Transparenz vor der Fahrt"
        title="Ihre Strecke. Eine ehrliche Einschätzung."
      >
        <p>
          Geben Sie Start und Ziel ein. Sobald die aktuellen Tarifwerte vollständig geprüft sind,
          kann hier eine unverbindliche Schätzung berechnet werden. Bis dahin nennen wir Ihnen den
          voraussichtlichen Preis persönlich.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container content-grid">
          <div className="form-panel">
            <h2>Fahrpreis prüfen</h2>
            <p className="form-description">
              Google-Dienste sind freiwillig. Eine bekannte Entfernung können Sie selbst eintragen.
            </p>
            <FareCalculator />
          </div>
          <aside>
            <div className="aside-card">
              <h2>Zum geltenden Taxitarif</h2>
              <p>
                Die bisherige Website verweist auf die Kreisverordnung von 2024. Auf der Website des
                Kreises ist eine neue Verordnung ab 1. Oktober 2026 aufgeführt.
              </p>
              <p>
                Die aktuellen Tarifwerte konnten noch nicht vollständig geprüft werden. Deshalb
                veröffentlichen wir keine Eurobeträge aus der alten Tarifliste.
              </p>
              <a
                className="text-link"
                href={tariff.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Amtliche Bekanntmachungen ansehen ↗
              </a>
            </div>
            <div className="help-panel">
              <h3>Wir rechnen mit Ihren Fragen.</h3>
              <p>
                Bei Überlandfahrten, besonderen Anforderungen oder Fragen zu möglichen Zuschlägen
                sprechen Sie uns bitte direkt an.
              </p>
              <div className="fare-result-actions">
                <WhatsAppButton>Fahrpreis anfragen</WhatsAppButton>
                <CallButton />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
