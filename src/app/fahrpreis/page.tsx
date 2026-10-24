import { PageIntro, CallButton, WhatsAppButton, EmailButton } from '@/components/ui';
import { FareCalculator } from '@/components/fare-calculator';
import { tariff } from '@/config/tariff';
export const metadata = {
  title: 'Tarife & Fahrpreise',
  description:
    'Fahrpreise für regionale und bundesweite Fahrten persönlich abstimmen. Aktueller Kreistarif und optionale unverbindliche Streckenschätzung.',
  alternates: { canonical: '/fahrpreis' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Persönlich planen. Klar abstimmen." title="Tarife & Fahrpreise">
        <p>
          Ob Geschäftsreise, Krankenfahrt, Flughafentransfer oder lange Strecke: Fragen Sie uns nach
          dem voraussichtlichen Gesamtpreis. Wir berücksichtigen Ihre Strecke und die konkreten
          Anforderungen. Fahrten ins Ausland sind auf Anfrage möglich.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <div className="fare-contact-options">
            <WhatsAppButton>Fahrt & Preis anfragen</WhatsAppButton>
            <EmailButton />
            <CallButton />
          </div>
          <div className="prose">
            <h2>Regionaler Taxitarif – verständlich erklärt</h2>
            <p>
              Für Fahrten im Geltungsbereich gilt die Kreisverordnung Herzogtum Lauenburg vom 25.
              September 2026, gültig ab 1. Oktober 2026. Für Ziele außerhalb des Geltungsbereichs
              wird das Entgelt für die gesamte Strecke vor Fahrtbeginn vereinbart. Kommt keine
              Vereinbarung zustande, sieht § 1 Absatz 3 den Kreistarif als vereinbart vor.
            </p>
            <ul>
              <li>Grundpreis: 5,50 €.</li>
              <li>Werktags 06–22 Uhr: bis 3 km 2,90 €/km, danach 2,70 €/km.</li>
              <li>22–06 Uhr sowie sonn- und feiertags: bis 3 km 3,20 €/km, danach 2,90 €/km.</li>
              <li>Wartezeit: 50,00 €/Stunde; Taxameter-Fortschaltung: 0,10 €.</li>
              <li>
                Großraumzuschlag bei mehr als vier Fahrgästen im entsprechend zugelassenen Fahrzeug:
                12,00 €. Verfügbarkeit bitte anfragen.
              </li>
              <li>
                Eine Anfahrt kann unter den Voraussetzungen des § 2 Absatz 4 berechnet werden.
                Besondere Ausstattung kann nach Aufwand hinzukommen. Übliches Gepäck wird nach
                Maßgabe von § 5 unentgeltlich befördert.
              </li>
            </ul>
            <a href={tariff.sourceUrl} target="_blank" rel="noopener noreferrer">
              Vollständige Tarifverordnung als PDF ansehen
            </a>
            <h2>Für lange Strecken sprechen wir persönlich mit Ihnen.</h2>
            <p>
              Ein Kilometerwert allein sagt wenig über Ihren Gesamtpreis aus. Abholort, Anfahrt,
              Wartezeiten, Strecke und besondere Wünsche können relevant sein. Eine
              Krankenfahrt-Schätzung ist zudem keine Zusage zur Kostenübernahme durch eine
              Krankenkasse.
            </p>
          </div>
          <details className="optional-calculator">
            <summary>Optional: unverbindliche Streckenschätzung öffnen</summary>
            <p className="field-note">
              Nur für die ausgewählte Tarifzeit und bis zu vier Fahrgäste innerhalb des Kreises.
              Kein Angebot und kein Höchstpreis.
            </p>
            <FareCalculator />
          </details>
        </div>
      </section>
    </>
  );
}
