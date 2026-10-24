import Link from 'next/link';
import { ArrowDown, ArrowRight, HeartPulse, Plane, Phone } from 'lucide-react';
import { company } from '@/config/company';
import {
  WhatsAppButton,
  EmailButton,
  CallButton,
  Eyebrow,
  TextLink,
  ContactStrip,
} from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { Benefits, FAQ, Fleet, Services } from '@/components/sections';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <svg
          className="hero-waves"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="gold-wave"
              x1="0"
              y1="500"
              x2="1100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#e3a913" stopOpacity=".35" />
              <stop offset=".4" stopColor="#ffc000" stopOpacity=".9" />
              <stop offset="1" stopColor="#eeb81d" stopOpacity=".55" />
            </linearGradient>
            <linearGradient
              id="gold-thread"
              x1="0"
              y1="400"
              x2="1440"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#e2ae22" stopOpacity=".1" />
              <stop offset=".55" stopColor="#e6b426" stopOpacity=".7" />
              <stop offset="1" stopColor="#ffdc61" stopOpacity=".1" />
            </linearGradient>
          </defs>
          <path
            className="wave-main"
            d="M-80 420C270 620 480 480 740 295S1180 60 1510 210"
            stroke="url(#gold-wave)"
            strokeWidth="92"
          />
          <path
            className="wave-fine"
            d="M-60 360C260 580 510 470 760 280S1180 40 1520 160"
            stroke="url(#gold-thread)"
            strokeWidth="2"
          />
          <path
            className="wave-fine"
            d="M-80 395C270 605 480 480 740 295S1180 60 1510 210"
            stroke="url(#gold-thread)"
            strokeWidth="1"
          />
        </svg>
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Insel Taxi · Ratzeburg</Eyebrow>
            <h1 id="hero-title" className="hero-title">
              <span>Ihr Ziel.</span> <span className="hero-title-accent">Unser Weg.</span>
            </h1>
            <p className="hero-description">
              Zum nächsten Termin oder quer durch Deutschland: Wir bringen Sie auf den Weg.
              Persönlich erreichbar, einfach anzufragen.
            </p>
            <div className="hero-actions">
              <WhatsAppButton>WhatsApp-Anfrage</WhatsAppButton>
              <CallButton>Anrufen</CallButton>
              <EmailButton className="button-text">Lieber per E-Mail</EmailButton>
            </div>
            <div className="hero-phone-block">
              <span>Direkt mit uns sprechen · rund um die Uhr</span>
              <a className="hero-phone" href={`tel:${company.phone}`}>
                <Phone size={22} aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </div>
            <div className="hero-route" aria-label="Regional und bundesweit. Ausland auf Anfrage.">
              <span className="hero-route-start">Ratzeburg</span>
              <span className="hero-route-track" aria-hidden="true">
                <span />
              </span>
              <span>Ihr Ziel</span>
              <p>Regional & bundesweit. Ausland auf Anfrage.</p>
            </div>
            <a className="hero-discover" href="#fuhrpark">
              Unsere Fahrzeuge entdecken <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-booking">
            <div className="booking-card">
              <div className="booking-card-body">
                <div className="booking-card-title">
                  <p className="small-label">Ihre Fahrt beginnt hier</p>
                  <h2>Wohin darf’s gehen?</h2>
                  <p>Fahrtdaten eintragen. Nachricht senden. Persönliche Bestätigung erhalten.</p>
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
          <Services />
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
