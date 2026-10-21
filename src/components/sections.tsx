import Link from 'next/link';
import {
  CarFront,
  HeartPulse,
  Plane,
  BriefcaseBusiness,
  Package,
  Baby,
  ArrowUpRight,
  Quote,
  MessageCircle,
  Phone,
  Check,
  MapPin,
} from 'lucide-react';
import { company } from '@/config/company';
import { Eyebrow, TextLink } from './ui';
export const services = [
  {
    icon: CarFront,
    title: 'Taxi & Alltagsfahrten',
    text: 'Ob kurzer Weg oder lange Strecke: Wir fahren regional und bundesweit. Fahrten ins Ausland auf Anfrage.',
    href: '/fahrt-anfragen',
    tag: 'Ihre täglichen Wege',
  },
  {
    icon: HeartPulse,
    title: 'Krankenfahrten',
    text: 'Zum Arzt, zur Behandlung oder in die Klinik – regional und bundesweit. Auch für längere Krankenfahrten.',
    href: '/krankenfahrten',
    tag: 'Gut begleitet',
  },
  {
    icon: Plane,
    title: 'Flughafentransfer',
    text: 'Entspannt nach Hamburg oder Lübeck. Hin- und Rückfahrt nach persönlicher Abstimmung.',
    href: '/flughafentransfer',
    tag: 'Die Reise beginnt hier',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Geschäftsfahrten',
    text: 'Für Geschäftsreisende, Mitarbeitende und Gäste – auch auf langen Strecken bundesweit. Rechnung nach Vereinbarung.',
    href: '/kontakt',
    tag: 'Beruflich unterwegs',
  },
  {
    icon: Baby,
    title: 'Kinderfahrten',
    text: 'Zur Schule, zum Sport oder zu einem Termin. Passenden Kindersitz bitte vorab anfragen.',
    href: '/fahrt-anfragen',
    tag: 'Für die Familie',
  },
  {
    icon: Package,
    title: 'Kurierfahrten',
    text: 'Dokumente, Pakete und Waren – regional und auf längeren Strecken nach persönlicher Abstimmung.',
    href: '/kontakt',
    tag: 'Wichtiges auf den Weg bringen',
  },
];
export function Services({ full = false }: { full?: boolean }) {
  return (
    <div className={`services-grid ${full ? 'services-full' : ''}`}>
      {services.slice(0, full ? 6 : 4).map((s, i) => (
        <Link key={s.title} href={s.href} className="service-card">
          <div className="service-card-top">
            <s.icon size={25} strokeWidth={1.5} aria-hidden="true" />
            <ArrowUpRight size={19} aria-hidden="true" />
          </div>
          <p className="service-index">
            0{i + 1} / {s.tag}
          </p>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </Link>
      ))}
    </div>
  );
}
export function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container reviews-inner">
        <div>
          <Eyebrow>Ihre Erfahrung zählt</Eyebrow>
          <h2>
            Vertrauen beginnt
            <br />
            mit echten Erfahrungen.
          </h2>
          <p>
            Sie sind schon mit uns gefahren? Teilen Sie Ihre Erfahrung. Oder machen Sie sich vor
            Ihrer ersten Fahrt selbst ein Bild.
          </p>
        </div>
        <div className="review-card">
          <Quote size={32} strokeWidth={1.3} aria-hidden="true" />
          <h3>Wie war Ihre Fahrt?</h3>
          <p>Ihre Rückmeldung hilft uns und anderen Fahrgästen.</p>
          {company.reviewUrl ? (
            <a
              className="button button-outline"
              href={company.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Auf Google ansehen & bewerten
              <ArrowUpRight size={17} />
            </a>
          ) : (
            <>
              <a
                className="button button-outline"
                href={`mailto:${company.email}?subject=R%C3%BCckmeldung%20zu%20meiner%20Fahrt`}
              >
                Persönliche Rückmeldung senden
                <ArrowUpRight size={17} />
              </a>
              <p className="field-note">Rückmeldungen erreichen uns direkt per E-Mail.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    'Fahren Sie auch bundesweit und ins Ausland?',
    'Ja. Wir bieten regionale und bundesweite Fahrten an – auch für Geschäftsreisende, längere private Reisen und Krankenfahrten. Fahrten ins Ausland sind auf Anfrage möglich. Strecke, Verfügbarkeit und Preis stimmen wir persönlich ab.',
  ],
  [
    'Wie bestelle ich ein Taxi in Ratzeburg?',
    'Rufen Sie uns unter 04541 802080 an oder fragen Sie Ihre Fahrt per WhatsApp oder E-Mail an. Im Formular können Sie Abholort, Ziel und Wunschzeit eingeben. Wir bestätigen die Verfügbarkeit persönlich.',
  ],
  [
    'Ist meine Anfrage schon eine feste Buchung?',
    'Nein. Das Formular bereitet nur Ihre Nachricht vor. Sie senden diese selbst per WhatsApp oder E-Mail ab. Erst wenn Insel Taxi die Fahrt bestätigt hat, ist sie verbindlich gebucht. Für dringende Fahrten rufen Sie bitte direkt an.',
  ],
  [
    'Kann ich eine Fahrt im Voraus anfragen?',
    'Ja, geben Sie im Formular das gewünschte Datum und die Uhrzeit an. Ob die Fahrt möglich ist, stimmen wir anschließend persönlich mit Ihnen ab.',
  ],
  [
    'Übernimmt die Krankenkasse meine Fahrt?',
    'Das hängt von Ihren persönlichen Voraussetzungen und der Fahrt ab. Eine ärztliche Verordnung und gegebenenfalls eine vorherige Genehmigung der Krankenkasse können erforderlich sein. Bitte klären Sie die Kostenübernahme vor der Fahrt mit Ihrer Krankenkasse.',
  ],
  [
    'Welche Flughäfen kann ich anfragen?',
    'Transfers nach Hamburg und Lübeck sind möglich. Hannover, Berlin Brandenburg und weitere Flughäfen können Sie individuell anfragen. Abholzeit, Gepäck und eine mögliche Rückfahrt sprechen wir mit Ihnen ab.',
  ],
  [
    'Funktioniert die Anfrage auch ohne Google Maps?',
    'Ja. Sie können alle Adressen selbst eingeben und die Fahrt per WhatsApp, E-Mail oder Telefon anfragen. Google-Adressvorschläge und Routenberechnung sind freiwillige Zusatzfunktionen.',
  ],
];
export function FAQ() {
  return (
    <section className="section">
      <div className="container faq-layout">
        <div>
          <Eyebrow>Gut zu wissen</Eyebrow>
          <h2>
            Kurze Antworten.
            <br />
            Gute Fahrt.
          </h2>
          <p>
            Noch eine Frage offen?
            <br />
            Wir helfen Ihnen persönlich weiter.
          </p>
          <TextLink href="/kontakt">Kontakt aufnehmen</TextLink>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function RouteIllustration() {
  return (
    <div className="route-illustration" aria-hidden="true">
      <div className="route-lake lake-one" />
      <div className="route-lake lake-two" />
      <div className="route-grid" />
      <svg viewBox="0 0 500 300" fill="none">
        <path
          d="M15 225H155Q177 225 177 202V151Q177 134 197 134H302Q325 134 325 112V64Q325 44 349 44H500"
          stroke="#d7dfe7"
          strokeWidth="26"
        />
        <path
          d="M15 225H155Q177 225 177 202V151Q177 134 197 134H302Q325 134 325 112V64Q325 44 349 44H500"
          stroke="white"
          strokeWidth="21"
        />
        <path
          d="M105 225H155Q177 225 177 202V151Q177 134 197 134H302Q325 134 325 112V75"
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <circle cx="105" cy="225" r="8" fill="white" stroke="#2563eb" strokeWidth="3" />
        <circle cx="325" cy="75" r="8" fill="#ffcf24" stroke="#14263d" strokeWidth="3" />
      </svg>
      <div className="route-label">
        <MapPin size={15} />
        Regional & bundesweit
      </div>
      <span className="route-caption">Kleine Wege. Große Pläne.</span>
    </div>
  );
}
export function Benefits() {
  return (
    <div className="benefits-line">
      <span>
        <Check size={16} />
        Ohne Registrierung
      </span>
      <span>
        <MessageCircle size={16} />
        Persönliche Bestätigung
      </span>
      <span>
        <Phone size={16} />
        24 Stunden erreichbar
      </span>
    </div>
  );
}
