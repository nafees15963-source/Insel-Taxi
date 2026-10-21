import Link from 'next/link';
import { ArrowUpRight, HeartPulse, Plane, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { company } from '@/config/company';
import {
  WhatsAppButton,
  CallButton,
  Eyebrow,
  TextLink,
  ContactStrip,
  CheckList,
} from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { FareCalculator } from '@/components/fare-calculator';
import { Benefits, FAQ, Reviews, RouteIllustration, Services } from '@/components/sections';
export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Ihr Weg beginnt in Ratzeburg</Eyebrow>
            <h1>
              Ihr Taxi in <br />
              Ratzeburg.
              <br />
              <span>
                Einfach. Schnell. <br />
                Zuverlässig.
              </span>
            </h1>
            <p className="hero-description">
              Ob Alltagsfahrt, Krankenfahrt oder Flughafentransfer – fragen Sie Ihre Fahrt bequem
              per WhatsApp oder Telefon an.
            </p>
            <div className="hero-actions">
              <WhatsAppButton />
              <CallButton />
            </div>
            <a className="hero-phone" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
              <span>Ein Anruf. Ein persönlicher Ansprechpartner.</span>
            </a>
            <div className="hero-local">
              <span className="status-dot" />
              In Ratzeburg zu Hause. Für Sie unterwegs.
            </div>
          </div>
          <div className="hero-booking">
            <div className="booking-card">
              <div className="booking-tabs">
                <span>
                  <MessageCircle size={17} />
                  Fahrt anfragen
                </span>
                <Link href="/fahrpreis">
                  <span>Fahrpreis</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="booking-card-body">
                <div className="booking-card-title">
                  <div>
                    <p className="small-label">WENIGE ANGABEN. DIREKTER KONTAKT.</p>
                    <h2>Wohin darf’s gehen?</h2>
                  </div>
                  <span className="card-title-icon">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <RideForm compact />
              </div>
              <div className="booking-card-bottom">
                <Phone size={15} />
                Kurzfristige Fahrt?{' '}
                <a href={`tel:${company.phone}`}>
                  Am besten anrufen
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <RouteIllustration />
          </div>
        </div>
      </section>
      <div className="container">
        <Benefits />
      </div>
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>Für Ihren Alltag. Und alles darüber hinaus.</Eyebrow>
              <h2>
                Jeder Weg hat einen Anlass.
                <br />
                Wir haben die passende Fahrt.
              </h2>
            </div>
            <TextLink href="/leistungen">Alle Leistungen entdecken</TextLink>
          </div>
          <Services />
        </div>
      </section>
      <section className="section process-section">
        <div className="container process-layout">
          <div>
            <Eyebrow>So einfach geht’s</Eyebrow>
            <h2>
              Wenig tippen.
              <br />
              Persönlich ankommen.
            </h2>
            <p>
              Sie sagen uns, wohin es geht.
              <br />
              Den Rest besprechen wir direkt mit Ihnen.
            </p>
            <TextLink href="/fahrt-anfragen">Fahrt mit allen Details anfragen</TextLink>
          </div>
          <ol className="process-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Ihre Fahrt eintragen</h3>
                <p>Abholort, Ziel und Wunschzeit. Mehr braucht es für den Anfang nicht.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>WhatsApp-Nachricht senden</h3>
                <p>
                  Wir bereiten Ihre Nachricht vor. Sie prüfen die Angaben und senden sie selbst ab.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Persönliche Bestätigung erhalten</h3>
                <p>
                  Wir melden uns zur Verfügbarkeit. Erst mit unserer Bestätigung ist Ihre Fahrt
                  gebucht.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="section fare-home">
        <div className="container fare-home-grid">
          <div>
            <Eyebrow>Mit einem guten Gefühl losfahren</Eyebrow>
            <h2>
              Was kostet
              <br />
              meine Fahrt?
            </h2>
            <p>
              Eine klare Frage verdient eine ehrliche Antwort. Fragen Sie Ihre Strecke an – wir
              helfen Ihnen bei der Einschätzung.
            </p>
            <div className="tariff-status">
              <span className="small-label">TRANSPARENT VON ANFANG AN</span>
              <h3>Keine ungeprüften Preisangaben.</h3>
              <p>
                Die aktuelle Tarifkonfiguration wird geprüft. Bis dahin erhalten Sie den
                voraussichtlichen Preis direkt von uns.
              </p>
            </div>
            <TextLink href="/fahrpreis">Mehr zu Tarif & Berechnung</TextLink>
          </div>
          <div className="panel">
            <h3>Ihre Strecke, Ihr Fahrpreis.</h3>
            <FareCalculator compact />
          </div>
        </div>
      </section>
      <section className="section feature-section">
        <div className="container feature-grid">
          <article className="medical-feature">
            <span className="feature-icon">
              <HeartPulse size={27} strokeWidth={1.5} />
            </span>
            <Eyebrow>Krankenfahrten in Ratzeburg</Eyebrow>
            <h2>
              Ein wichtiger Termin.
              <br />
              Ein vertrauter Kontakt.
            </h2>
            <p>
              Ob Arzttermin, Klinik oder regelmäßige Behandlung: Fragen Sie Ihre Fahrt mit wenigen,
              gut verständlichen Schritten an.
            </p>
            <CheckList
              items={[
                'Einfacher Assistent ohne medizinische Angaben',
                'Hin- und Rückfahrt nach Absprache',
                'Fragen zur Abrechnung persönlich klären',
              ]}
            />
            <Link className="button button-navy" href="/krankenfahrten">
              Krankenfahrt anfragen
              <ArrowRight size={18} />
            </Link>
            <p className="field-note">
              Eine Kostenübernahme muss vorab mit der Krankenkasse geklärt werden.
            </p>
          </article>
          <article className="airport-feature">
            <span className="feature-icon">
              <Plane size={28} strokeWidth={1.5} />
            </span>
            <Eyebrow>Flughafentransfer</Eyebrow>
            <h2>
              Die Reise beginnt
              <br />
              an Ihrer Haustür.
            </h2>
            <p>
              Nach Hamburg, Lübeck oder auf Anfrage zu einem weiteren Flughafen. Abholzeit, Gepäck
              und Rückfahrt stimmen wir persönlich ab.
            </p>
            <div className="airport-tags">
              <span>
                Hamburg <b>HAM</b>
              </span>
              <span>
                Lübeck <b>LBC</b>
              </span>
            </div>
            <Link className="button button-outline" href="/flughafentransfer">
              Transfer planen
              <ArrowRight size={18} />
            </Link>
            <div className="airport-line" aria-hidden="true">
              <span>Ratzeburg</span>
              <i />
              <Plane size={21} />
              <i />
              <span>Ihr Flughafen</span>
            </div>
          </article>
        </div>
      </section>
      <Reviews />
      <FAQ />
      <ContactStrip />
    </>
  );
}
