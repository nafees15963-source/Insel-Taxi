import Link from 'next/link';
import { ArrowUpRight, HeartPulse, Plane, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { company } from '@/config/company';
import {
  WhatsAppButton,
  EmailButton,
  CallButton,
  Eyebrow,
  TextLink,
  ContactStrip,
  CheckList,
} from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { Benefits, FAQ, Reviews, RouteIllustration, Services } from '@/components/sections';
export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Regional verwurzelt. Bundesweit unterwegs.</Eyebrow>
            <h1>
              Ihr Ziel. Unser Weg.
              <br />
              Bundesweit.
              <br />
              <span>
                Regional. Überregional.
                <br />
                Persönlich.
              </span>
            </h1>
            <p className="hero-description">
              Ob lange Geschäftsreise, private Fahrt, Krankenfahrt oder Flughafentransfer: Wir
              fahren regional und bundesweit. Fragen Sie Ihre Fahrt per WhatsApp, E-Mail oder
              Telefon an.
            </p>
            <div className="hero-actions">
              <WhatsAppButton />
              <CallButton />
              <EmailButton />
            </div>
            <a className="hero-phone" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
              <span>Ein Anruf. Ein persönlicher Ansprechpartner.</span>
            </a>
            <div className="hero-local">
              <span className="status-dot" />
              Regional & bundesweit · Fahrten ins Ausland auf Anfrage.
            </div>
          </div>
          <div className="hero-booking">
            <div className="booking-card">
              <div className="booking-tabs">
                <span>
                  <MessageCircle size={17} />
                  Fahrt anfragen
                </span>
                <Link href="/fahrt-anfragen">
                  <span>Fernfahrt planen</span>
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
                <h3>WhatsApp oder E-Mail wählen</h3>
                <p>
                  Wir bereiten Ihre Nachricht vor. Sie prüfen die Angaben und senden sie per
                  WhatsApp oder E-Mail selbst ab.
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
      <section className="section feature-section">
        <div className="container feature-grid">
          <article className="medical-feature">
            <span className="feature-icon">
              <HeartPulse size={27} strokeWidth={1.5} />
            </span>
            <Eyebrow>Krankenfahrten – regional & bundesweit</Eyebrow>
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
      <section className="fare-secondary">
        <div className="container">
          <p>
            Sie möchten Ihre Fahrt vorab planen? Für lange Strecken und individuelle Ziele stimmen
            wir den Preis persönlich mit Ihnen ab.
          </p>
          <TextLink href="/fahrpreis">Tarifinformationen & optionale Streckenschätzung</TextLink>
        </div>
      </section>
      <Reviews />
      <FAQ />
      <ContactStrip />
    </>
  );
}
