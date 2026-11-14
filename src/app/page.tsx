import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, HeartPulse, Plane, Phone } from 'lucide-react';
import { company } from '@/config/company';
import { EmailButton, CallButton, Eyebrow, TextLink, ContactStrip } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { Benefits, FAQ, Fleet, Services } from '@/components/sections';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <section className="hero atlas-hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Insel Taxi · Ratzeburg</Eyebrow>
            <h1 id="hero-title" className="hero-title">
              <span>Ihr Ziel.</span> <span className="hero-title-accent">Unser Weg.</span>
            </h1>
            <p className="hero-description">
              Von Ratzeburg dorthin, wo Sie sein möchten. Fahrtdaten eintragen, per WhatsApp
              anfragen – wir stimmen Ihre Fahrt persönlich mit Ihnen ab.
            </p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href="#whatsapp-formular">
                <WhatsAppIcon size={22} />
                Zum WhatsApp-Formular
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <CallButton>Anrufen</CallButton>
              <EmailButton className="button-text">Lieber per E-Mail</EmailButton>
            </div>
            <div className="journey-atlas">
              <div className="atlas-caption">
                <span>VON DER INSEL. IN ALLE RICHTUNGEN.</span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </div>
              <svg viewBox="0 0 560 310" fill="none" aria-hidden="true" className="atlas-drawing">
                <path
                  className="atlas-water"
                  d="M0 75C75 25 127 42 168 93S218 199 170 246S61 266 0 300ZM313 0C269 57 303 91 346 117S436 112 462 166S487 253 560 269V0Z"
                />
                <path
                  className="atlas-shore"
                  d="M0 92C75 42 114 61 151 103S199 190 151 232M331 0C286 60 318 78 360 101S452 98 477 152S504 238 560 250"
                />
                <path
                  className="atlas-street"
                  d="M0 173L560 173M245 0V310M93 0L428 310M75 310L454 0"
                />
                <path
                  className="atlas-road"
                  d="M113 242H196Q245 242 245 193V135Q245 84 299 84H455"
                />
                <path
                  className="atlas-road-track"
                  d="M113 242H196Q245 242 245 193V135Q245 84 299 84H455"
                />
                <circle cx="113" cy="242" r="12" fill="#ffd02c" />
                <circle cx="113" cy="242" r="4" fill="#152b40" />
                <circle cx="455" cy="84" r="12" fill="#fff" />
                <circle cx="455" cy="84" r="4" fill="#152b40" />
                <rect x="221" y="148" width="48" height="32" rx="10" fill="#ffd02c" />
                <path d="M232 159h7v7h-7zm7 7h7v7h-7zm7-7h7v7h-7zm7 7h7v7h-7z" fill="#152b40" />
                <text x="94" y="280">
                  Ratzeburg
                </text>
                <text x="414" y="53">
                  Ihr Ziel
                </text>
              </svg>
              <p>
                Regional & bundesweit <span>Ausland auf Anfrage</span>
              </p>
            </div>
            <a className="hero-discover" href="#fuhrpark">
              Unsere Fahrzeuge entdecken <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <div
            className="hero-booking"
            id="whatsapp-formular"
            tabIndex={-1}
            aria-labelledby="request-title"
          >
            <div className="booking-card">
              <div className="booking-channel-banner">
                <WhatsAppIcon size={23} />
                <span>Ihre Fahrt. Direkt per WhatsApp.</span>
              </div>
              <div className="booking-card-body">
                <div className="booking-card-title">
                  <p className="small-label">Hier beginnt Ihre Anfrage</p>
                  <h2 id="request-title">Wohin darf’s gehen?</h2>
                  <p>
                    Hier ausfüllen, anschließend in WhatsApp selbst senden. Auch per E-Mail möglich.
                  </p>
                </div>
                <RideForm compact />
              </div>
              <div className="booking-card-bottom">
                <Phone size={17} aria-hidden="true" />
                <span>
                  Kurzfristig unterwegs? <a href={`tel:${company.phone}`}>Bitte anrufen.</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <Benefits />
      </div>
      <Fleet />
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>Unsere Leistungen</Eyebrow>
              <h2>
                Für die kleinen Wege.
                <br />
                Und die großen Pläne.
              </h2>
            </div>
            <TextLink href="/leistungen">Alle Leistungen</TextLink>
          </div>
          <Services full />
        </div>
      </section>
      <section className="section feature-section">
        <div className="container feature-grid">
          <article className="medical-feature">
            <HeartPulse size={32} strokeWidth={1.5} aria-hidden="true" />
            <Eyebrow>Krankenfahrten</Eyebrow>
            <h2>
              Ein Termin, der zählt.
              <br />
              Ein persönlicher Kontakt.
            </h2>
            <p>
              Zum Arzt, in die Klinik oder zur regelmäßigen Behandlung. Wir stimmen Ihre Fahrt
              direkt mit Ihnen ab.
            </p>
            <Link className="text-link" href="/krankenfahrten">
              Krankenfahrt anfragen <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="field-note">
              Bitte klären Sie eine mögliche Kostenübernahme vorab mit Ihrer Krankenkasse.
            </p>
          </article>
          <article className="airport-feature">
            <Plane size={32} strokeWidth={1.5} aria-hidden="true" />
            <Eyebrow>Flughafentransfer</Eyebrow>
            <h2>
              Die Reise beginnt
              <br />
              an Ihrer Haustür.
            </h2>
            <p>
              Nach Hamburg, Lübeck oder auf Anfrage zu einem weiteren Flughafen. Abholzeit und
              Gepäck besprechen wir persönlich.
            </p>
            <Link className="text-link" href="/flughafentransfer">
              Transfer anfragen <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <div className="airport-tags">
              <span>
                Hamburg <b>HAM</b>
              </span>
              <span>
                Lübeck <b>LBC</b>
              </span>
            </div>
          </article>
        </div>
      </section>
      <section className="section process-section">
        <div className="container process-layout">
          <div>
            <Eyebrow>So geht’s</Eyebrow>
            <h2>
              Einfach anfragen.
              <br />
              Persönlich abstimmen.
            </h2>
            <p>Sie sagen uns, wohin es geht. Wir klären die Einzelheiten mit Ihnen.</p>
            <TextLink href="/fahrt-anfragen">Fahrt anfragen</TextLink>
          </div>
          <ol className="process-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Fahrtdaten eintragen</h3>
                <p>Name, Strecke und Wunschzeit – alles in einem übersichtlichen Formular.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Nachricht senden</h3>
                <p>
                  WhatsApp oder E-Mail wählen. Die vorbereitete Nachricht prüfen und selbst
                  absenden.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Bestätigung erhalten</h3>
                <p>
                  Wir melden uns zur Verfügbarkeit. Erst mit unserer Bestätigung ist Ihre Fahrt
                  gebucht.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="fare-secondary">
        <div className="container">
          <p>Sie möchten den Fahrpreis vorab klären? Sprechen Sie uns auf Ihre Strecke an.</p>
          <TextLink href="/fahrpreis">Tarifinformationen</TextLink>
        </div>
      </section>
      <FAQ />
      <ContactStrip />
    </>
  );
}
