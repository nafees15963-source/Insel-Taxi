import Link from 'next/link';
import { ArrowDown, Phone, ArrowUpRight } from 'lucide-react';
import { company } from '@/config/company';
import { EmailButton, CallButton, Eyebrow, TextLink, ContactStrip } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { JourneyScene } from '@/components/ride-visual';
import { Benefits, FAQ, Fleet, Services } from '@/components/sections';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <section className="hero daylight-hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Ihr Taxi in Ratzeburg & darüber hinaus</Eyebrow>
            <h1 id="hero-title" className="hero-title">
              <span>Ihr Ziel.</span> <span className="hero-title-accent">Unser Weg.</span>
            </h1>
            <p className="hero-description">
              Zum Termin. Zum Flughafen. Nach Hause. Wir bringen Sie hin – mit persönlicher
              Absprache und einem direkten Draht zu uns.
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
            <JourneyScene />
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
                <span>
                  Fahrt per WhatsApp anfragen
                  <small>Direkt an Insel Taxi · ohne Registrierung</small>
                </span>
              </div>
              <div className="booking-card-body">
                <div className="booking-card-title">
                  <p className="small-label">Ihre nächste Fahrt</p>
                  <h2 id="request-title">Wohin darf’s gehen?</h2>
                  <p>Hier eintragen. In WhatsApp senden. Wir antworten persönlich.</p>
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
      <Fleet />
      <section className="section reach-section" aria-labelledby="reach-title">
        <div className="container reach-layout">
          <div>
            <Eyebrow>Hier zu Hause. Überall unterwegs.</Eyebrow>
            <h2 id="reach-title">
              Einsteigen.
              <br />
              Weiterkommen.
            </h2>
            <p>
              Kurze Wege in Ratzeburg oder eine längere Fahrt: Wir besprechen Ihre Strecke und die
              passende Abholzeit direkt mit Ihnen.
            </p>
            <TextLink href="/fahrt-anfragen">Ihre Strecke anfragen</TextLink>
          </div>
          <div className="destination-board">
            <Link href="/taxifahrten">
              <span>01</span>
              <div>
                <strong>Ratzeburg & Umgebung</strong>
                <small>Für die täglichen Wege</small>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/flughafentransfer">
              <span>02</span>
              <div>
                <strong>Hamburg & Lübeck</strong>
                <small>Entspannt zum Flughafen</small>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/geschaeftsfahrten">
              <span>03</span>
              <div>
                <strong>Deutschlandweit</strong>
                <small>Geschäftlich oder privat · Ausland auf Anfrage</small>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
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
