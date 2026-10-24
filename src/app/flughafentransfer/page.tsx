import type { Metadata } from 'next';
import { ArrowDown, Plane, Luggage, UsersRound } from 'lucide-react';
import { ContactActions, IconCard, PageIntro, SectionHeading } from '@/components/ui';
import { RideForm } from '@/components/ride-form';

export const metadata: Metadata = {
  title: 'Flughafentransfer ab Ratzeburg',
  description: 'Flughafentransfer von Ratzeburg nach Hamburg oder Lübeck anfragen. Für Einzelreisende und Gruppen mit Großraumtaxi, Gepäck und Rückfahrt nach Absprache.',
  alternates: { canonical: '/flughafentransfer/' },
};

export default function AirportPage() {
  return <>
    <PageIntro eyebrow="Flughafentransfer" title="Die Reise beginnt an Ihrer Haustür." description="Von Ratzeburg zum Flughafen und wieder nach Hause. Stimmen Sie Ihren Transfer frühzeitig mit uns ab – von der Abholzeit bis zum Platz für den letzten Koffer.">
      <a className="button button-primary" href="#transfer-anfragen">Transfer vorbereiten <ArrowDown size={18} aria-hidden="true" /></a>
    </PageIntro>
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Ihre Verbindung" title="Vom Inselalltag in die weite Welt." />
        <div className="split airport-destinations">
          <article className="card destination-card"><p className="eyebrow">Hamburg Airport</p><div className="airport-code" aria-hidden="true">HAM</div><h2>Hamburg</h2><p>Für Ihren Abflug oder die Abholung nach der Landung. Treffpunkt und Uhrzeit vereinbaren wir persönlich.</p></article>
          <article className="card destination-card"><p className="eyebrow">Flughafen Lübeck</p><div className="airport-code" aria-hidden="true">LBC</div><h2>Lübeck</h2><p>Ein Transfer passend zu Ihrer Reise. Geben Sie uns Reisedatum, Personenanzahl und Gepäck mit auf den Weg.</p></article>
        </div>
        <p className="form-note">Hannover (HAJ), Berlin Brandenburg (BER) und weitere Flughäfen auf Anfrage. Preise für Ziele außerhalb des Tarifgebiets vereinbaren wir vor Fahrtbeginn.</p>
      </div>
    </section>
    <section className="section section-muted">
      <div className="container card-grid">
        <IconCard icon={Plane} title="Hin. Zurück. Oder beides." description="Planen Sie Ihre Rückfahrt gleich mit. Eine Flugnummer hilft bei der Abstimmung; eine automatische Flugüberwachung findet nicht statt." />
        <IconCard icon={Luggage} title="Für alles, was mitreist." description="Bitte geben Sie Anzahl und Größe der Koffer sowie Kinderwagen oder Sondergepäck an. So können wir das passende Fahrzeug abstimmen." />
        <IconCard icon={UsersRound} title="Auch gemeinsam unterwegs." description="Unser 9-Sitzer bietet Platz für bis zu 8 Fahrgäste plus Fahrer. Für 9 Reisende besprechen wir die Aufteilung auf mehrere Fahrzeuge." />
      </div>
    </section>
    <section className="section" id="transfer-anfragen">
      <div className="container split form-layout">
        <div><SectionHeading eyebrow="Transfer anfragen" title="Ihr Flug. Unser Treffpunkt.">Tragen Sie Ihre gewünschte Abholzeit ein. Berücksichtigen Sie die Hinweise Ihrer Fluggesellschaft und ausreichend Zeit am Flughafen. Wir stimmen die Fahrt anschließend mit Ihnen ab.</SectionHeading><ContactActions message={'Hallo Insel Taxi, ich möchte einen Flughafentransfer anfragen.\n\nFlughafen:\nAbholort:\nDatum und Uhrzeit:\nPersonen und Gepäck:'} /></div>
        <RideForm mode="airport" />
      </div>
    </section>
  </>;
}
