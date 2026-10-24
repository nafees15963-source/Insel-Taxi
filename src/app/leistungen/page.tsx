import type { Metadata } from 'next';
import Link from 'next/link';
import { CarFront, HeartPulse, Plane, BriefcaseBusiness, Package, UsersRound, ArrowUpRight, Check } from 'lucide-react';
import { ContactBand, IconCard, PageIntro, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Unsere Leistungen',
  description: 'Taxi, Krankenfahrten, Flughafentransfer und Großraumtaxi in Ratzeburg. Lernen Sie unsere Leistungen und die Flotte mit 9-Sitzer kennen.',
  alternates: { canonical: '/leistungen/' },
};

export default function ServicesPage() {
  return <>
    <PageIntro eyebrow="Für Ihren Alltag. Und alles darüber hinaus." title="Eine Fahrt. Viele Möglichkeiten." description="Zum Bahnhof, zum Arzt oder in den Urlaub: Wir bringen Sie von Ratzeburg aus an Ihr Ziel. Persönlich abgestimmt und einfach angefragt.">
      <Link className="button button-primary" href="/fahrt-anfragen/">Fahrt anfragen <ArrowUpRight size={19} aria-hidden="true" /></Link>
    </PageIntro>
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Unsere Leistungen" title="Wohin darf es gehen?" />
        <div className="card-grid">
          <IconCard icon={CarFront} title="Taxi & Alltagsfahrten" description="Zum Einkaufen, zum Bahnhof oder nach Hause. Für kurze Wege in Ratzeburg und längere Fahrten in ganz Deutschland." href="/fahrt-anfragen/" linkLabel="Taxi anfragen" />
          <IconCard icon={HeartPulse} title="Krankenfahrten" description="Fahrten zu Arzt, Klinik, Dialyse oder Reha. Auch wiederkehrende Termine können wir gemeinsam planen." href="/krankenfahrten/" linkLabel="Krankenfahrt planen" />
          <IconCard icon={Plane} title="Flughafentransfer" description="Nach Hamburg und Lübeck, weitere Flughäfen auf Anfrage. Abholzeit, Personen und Gepäck stimmen wir vorab ab." href="/flughafentransfer/" linkLabel="Transfer anfragen" />
          <IconCard icon={BriefcaseBusiness} title="Geschäftsfahrten" description="Für Kundentermine, Geschäftsreisen oder Ihre Gäste. Regelmäßige Fahrten und Rechnungsfahrten nach Vereinbarung." href="/kontakt/" linkLabel="Persönlich besprechen" />
          <IconCard icon={UsersRound} title="Kinder & Familien" description="Gemeinsam unterwegs. Bitte nennen Sie bei der Anfrage das Alter der Kinder und benötigte Kindersitze, damit wir die Fahrt abstimmen können." href="/fahrt-anfragen/" linkLabel="Familienfahrt anfragen" />
          <IconCard icon={Package} title="Kurierfahrten" description="Wenn Unterlagen oder eine Sendung persönlich ans Ziel sollen. Größe, Abholung und Übergabe klären wir direkt mit Ihnen." href="/kontakt/" linkLabel="Kurierfahrt besprechen" />
        </div>
      </div>
    </section>
    <section className="section section-muted" id="flotte">
      <div className="container">
        <SectionHeading eyebrow="Unsere Flotte" title="Alle einsteigen. Gemeinsam ankommen.">Ob allein oder als Gruppe: Sagen Sie uns, wie viele Personen und Gepäckstücke mitfahren. Wir stimmen das passende Fahrzeug mit Ihnen ab.</SectionHeading>
        <div className="split">
          <article className="card fleet-card">
            <div className="fleet-capacity">01—04</div>
            <p className="eyebrow">Fahrgäste</p>
            <h3>Der Kombi. Für jeden Tag.</h3>
            <p>Für einzelne Fahrgäste, Paare und kleine Familien. Mit Platz für Ihr Gepäck – bitte größere Gegenstände vorher angeben.</p>
            <ul className="check-list"><li><Check size={18} aria-hidden="true" /> Bis zu 4 Fahrgäste</li><li><Check size={18} aria-hidden="true" /> Alltag, Termine und Reisen</li><li><Check size={18} aria-hidden="true" /> Rollator nach Absprache</li></ul>
          </article>
          <article className="card fleet-card">
            <div className="fleet-capacity">05—08</div>
            <p className="eyebrow">Fahrgäste</p>
            <h3>Der 9-Sitzer. Mehr Platz für alle.</h3>
            <p>Unser Großraumtaxi bietet neun Sitzplätze einschließlich Fahrer. Ideal für Familien, kleine Gruppen und gemeinsame Transfers.</p>
            <ul className="check-list"><li><Check size={18} aria-hidden="true" /> Bis zu 8 Fahrgäste plus Fahrer</li><li><Check size={18} aria-hidden="true" /> Gepäckmenge bitte vorher angeben</li><li><Check size={18} aria-hidden="true" /> Verfügbarkeit auf Anfrage</li></ul>
          </article>
        </div>
        <p className="form-note">Sie reisen mit 9 Personen? Wählen Sie im Formular „9 Personen“. Wir klären mit Ihnen die Aufteilung auf mehrere Fahrzeuge. Bitte beachten Sie den <Link href="/fahrpreis/" className="text-link">Großraumzuschlag im Taxitarif</Link>.</p>
      </div>
    </section>
    <ContactBand />
  </>;
}
