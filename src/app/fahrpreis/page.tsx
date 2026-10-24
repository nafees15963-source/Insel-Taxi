import type { Metadata } from 'next';
import Link from 'next/link';
import { FileDown, ArrowUpRight } from 'lucide-react';
import { ContactBand, PageIntro, SectionHeading } from '@/components/ui';
import { euros, tariff } from '@/config/tariff';

export const metadata: Metadata = {
  title: 'Taxitarife ab 1. Oktober 2026',
  description: 'Die Taxitarife für Ratzeburg im Kreis Herzogtum Lauenburg: Grundpreis, Kilometerpreise, Wartezeit und Großraumzuschlag. Mit Original-Verordnung als PDF.',
  alternates: { canonical: '/fahrpreis/' },
};

export default function FarePage() {
  return <>
    <PageIntro eyebrow="Klar geregelt" title="Gute Fahrt. Klare Preise." description="Für Taxifahrten innerhalb des Kreises Herzogtum Lauenburg gilt der amtliche Taxitarif. Hier finden Sie die wichtigsten Beträge – transparent und ohne komplizierten Rechner.">
      <a className="button button-secondary" href={tariff.source} target="_blank" rel="noopener noreferrer"><FileDown size={19} aria-hidden="true" /> Tarifverordnung öffnen <span className="sr-only">(PDF, neuer Tab)</span></a>
    </PageIntro>
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Gültig seit 1. Oktober 2026" title="Der Tarif im Überblick.">Die Kilometerpreise beziehen sich auf die besetzte Fahrt. Für mehr als vier Fahrgäste im Großraumtaxi kommt unter den tariflichen Voraussetzungen ein Zuschlag hinzu.</SectionHeading>
        <div className="table-scroll">
          <table className="tariff-table">
            <caption className="sr-only">Taxitarife im Kreis Herzogtum Lauenburg seit 1. Oktober 2026</caption>
            <thead><tr><th scope="col">Tarifbestandteil</th><th scope="col">Tagtarif<span>Werktags 06–22 Uhr</span></th><th scope="col">Nachttarif<span>22–06 Uhr, sonn- und feiertags ganztägig</span></th></tr></thead>
            <tbody>
              <tr><th scope="row">Grundpreis</th><td>{euros(tariff.base)}</td><td>{euros(tariff.base)}</td></tr>
              <tr><th scope="row">Die ersten {tariff.boundaryKm} Kilometer<span>Je besetzt gefahrenem Kilometer</span></th><td>{euros(tariff.day.firstKm)}</td><td>{euros(tariff.night.firstKm)}</td></tr>
              <tr><th scope="row">Über {tariff.boundaryKm} Kilometer<span>Je weiterem besetzt gefahrenem Kilometer</span></th><td>{euros(tariff.day.followingKm)}</td><td>{euros(tariff.night.followingKm)}</td></tr>
              <tr><th scope="row">Wartezeit<span>Pro Stunde</span></th><td>{euros(tariff.waitingPerHour)}</td><td>{euros(tariff.waitingPerHour)}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="form-note">Werktage schließen Samstage ein. Abrechnung in Schritten von {euros(tariff.meterStep)}. Maßgeblich sind die vollständige Kreisverordnung und der Taxameter-Fahrpreis.</p>
        <div className="split tariff-extras">
          <article className="card"><p className="eyebrow">Großraumtaxi</p><h3>{euros(tariff.largeVehicleSurcharge)} Zuschlag</h3><p>Bei mehr als vier Fahrgästen in einem Großraumtaxi mit mehr als fünf eingetragenen Sitzplätzen. Unser 9-Sitzer hat Platz für bis zu acht Fahrgäste plus Fahrer.</p></article>
          <article className="card"><p className="eyebrow">Ihr Gepäck</p><h3>Handgepäck, Koffer & Rollator</h3><p>Diese werden ohne gesondertes Gepäckentgelt befördert, soweit Ladekapazität, zulässiges Gewicht und Verkehrssicherheit es erlauben. Größere Gepäckmengen bitte vorab angeben.</p></article>
        </div>
      </div>
    </section>
    <section className="section section-muted">
      <div className="container split">
        <div className="prose"><p className="eyebrow">Gut zu wissen</p><h2>Was den Fahrpreis beeinflusst.</h2><p>Fahrtstrecke, Tarifzeit und Wartezeit bestimmen den tatsächlichen Preis. Auch eine kostenpflichtige Anfahrt kann unter den Voraussetzungen der Verordnung hinzukommen.</p><Link className="text-link" href="/fahrt-anfragen/">Ihre Fahrt mit uns abstimmen <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="prose">
          <details><summary>Wann wird die Anfahrt berechnet?</summary><p>Grundsätzlich ist die Anfahrt kostenlos. Führt die anschließende Fahrt nicht zur Betriebssitzgemeinde zurück, kann nach § 2 Absatz 4 der Anfahrtstarif gelten. Die dabei zurückgelegte Strecke wird beim Wechsel in den Besetzttarif berücksichtigt; Wartezeit während der Anfahrt wird nicht berechnet. Wir erläutern Ihnen das gern für Ihre konkrete Fahrt.</p></details>
          <details><summary>Was gilt für Ziele außerhalb des Kreises?</summary><p>Für eine Fahrt mit Ziel außerhalb des Tarifgebiets wird der Preis für die gesamte Strecke vor Fahrtbeginn frei vereinbart. Kommt keine Vereinbarung zustande, gelten die Entgelte des Pflichtfahrgebiets als vereinbart (§ 1 Absatz 3).</p></details>
          <details><summary>Gibt es weitere mögliche Kosten?</summary><p>Besondere, ausdrücklich gewünschte Ausstattung kann nach Aufwand berechnet werden, zum Beispiel bei einer Hochzeitsfahrt oder Fahrradbeförderung. Wird ein bestelltes Taxi aus einem von Ihnen zu vertretenden Grund nicht genutzt, sieht § 6 ebenfalls ein Entgelt vor. Die vollständige Regelung finden Sie in der verlinkten Verordnung.</p></details>
          <details><summary>Warum gibt es keinen Online-Preisrechner?</summary><p>Ein Rechner kann Anfahrt, Wartezeit und individuelle Anforderungen oft nur unvollständig berücksichtigen. Teilen Sie uns deshalb die geplante Strecke mit. Wir besprechen den geltenden Tarif oder eine mögliche Preisvereinbarung mit Ihnen.</p></details>
        </div>
      </div>
    </section>
    <ContactBand />
  </>;
}
