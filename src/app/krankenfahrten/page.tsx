import type { Metadata } from 'next';
import { ClipboardList, HeartHandshake, Phone, ArrowDown } from 'lucide-react';
import { ContactActions, IconCard, PageIntro, SectionHeading } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Krankenfahrten in Ratzeburg',
  description: 'Krankenfahrten zu Arzt, Klinik, Dialyse und Reha in Ratzeburg anfragen. Verständliche Informationen zu Unterlagen, Kostenübernahme und Rückfahrt.',
  alternates: { canonical: '/krankenfahrten/' },
};

export default function MedicalPage() {
  return <>
    <PageIntro eyebrow="Krankenfahrten" title="Ein Termin. Ein vertrauter Weg." description="Zum Arzt, zur Behandlung oder in die Reha: Wir helfen Ihnen, die Fahrt zu organisieren. In Ruhe, verständlich und am liebsten so, wie es für Sie am einfachsten ist.">
      <ContactActions message="Hallo Insel Taxi, ich möchte eine Krankenfahrt besprechen. Bitte melden Sie sich bei mir." />
      <a className="text-link" href="#krankenfahrt-anfragen">Oder die Fahrt Schritt für Schritt vorbereiten <ArrowDown size={16} aria-hidden="true" /></a>
    </PageIntro>
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Gut vorbereitet" title="Wir fahren. Sie konzentrieren sich auf Ihren Termin.">Krankenfahrten sind Fahrten zur medizinischen Behandlung ohne medizinische Betreuung während der Fahrt. Sie ersetzen keinen Rettungsdienst und keinen Krankentransport.</SectionHeading>
        <div className="card-grid">
          <IconCard icon={HeartHandshake} title="Einzelne & regelmäßige Termine" description="Zum Arzt, ins Krankenhaus, zur Dialyse, Chemotherapie oder Reha. Auch eine Serie von Fahrten lässt sich vorab besprechen." />
          <IconCard icon={ClipboardList} title="Unterlagen vorab klären" description="Je nach Fahrt benötigen Sie eine ärztliche Verordnung und eine vorherige Genehmigung Ihrer Krankenkasse. Fragen Sie bitte rechtzeitig nach." />
          <IconCard icon={Phone} title="Ein Anruf reicht für den Anfang" description="Sie müssen kein Formular ausfüllen. Nennen Sie uns Ihren Abholort, Ihr Ziel und den Termin. Alles Weitere besprechen wir persönlich." href={`tel:${company.phone}`} linkLabel={company.phoneDisplay} />
        </div>
      </div>
    </section>
    <section className="section section-muted">
      <div className="container split">
        <div className="prose">
          <p className="eyebrow">Kosten & Organisation</p>
          <h2>Was Sie vor der Fahrt wissen sollten.</h2>
          <p>Ob Ihre Krankenkasse die Kosten übernimmt, hängt von den persönlichen Voraussetzungen und der Fahrt ab. Eine Verordnung allein bedeutet nicht in jedem Fall eine Kostenübernahme.</p>
          <ol>
            <li><strong>Mit der Arztpraxis sprechen.</strong> Klären Sie, ob eine Verordnung einer Krankenbeförderung erforderlich und möglich ist.</li>
            <li><strong>Krankenkasse fragen.</strong> Erkundigen Sie sich nach einer nötigen Genehmigung und Ihrer möglichen Zuzahlung.</li>
            <li><strong>Fahrt mit uns abstimmen.</strong> Wir besprechen Abholung, Unterlagen, eine mögliche Direktabrechnung und Ihre Rückfahrt.</li>
          </ol>
          <p>Bitte geben Sie einen Rollator, eine Begleitperson oder benötigte Hilfe beim Einsteigen vorab an. Ob ein passendes Fahrzeug verfügbar ist, bestätigen wir persönlich.</p>
        </div>
        <div className="card prose">
          <h3>Häufige Fragen zu Krankenfahrten</h3>
          <details><summary>Kann ich direkt mit der Krankenkasse abrechnen lassen?</summary><p>Eine Direktabrechnung kann je nach Krankenkasse, Verordnung und Genehmigung möglich sein. Bitte klären Sie dies vor Ihrer Fahrt mit uns. Eine Kostenübernahme können wir nicht pauschal zusagen.</p></details>
          <details><summary>Was passiert, wenn mein Termin länger dauert?</summary><p>Besprechen Sie die Rückfahrt bei Ihrer Anfrage. Wenn die genaue Uhrzeit noch offen ist, vereinbaren wir mit Ihnen, wie Sie uns nach dem Termin erreichen.</p></details>
          <details><summary>Muss ich Gesundheitsdaten angeben?</summary><p>Nein. Für eine erste Anfrage benötigen wir keine Diagnose oder medizinischen Unterlagen. Bitte senden Sie keine Befunde, Rezepte oder Versichertennummern über das Formular oder WhatsApp.</p></details>
          <details><summary>Ist eine Fahrt im Rollstuhl möglich?</summary><p>Bitte rufen Sie uns an, um Ihren konkreten Bedarf zu besprechen. Eine Beförderung im besetzten Rollstuhl wird auf dieser Website nicht angeboten oder zugesagt.</p></details>
          <p className="form-note">Bei einem medizinischen Notfall wählen Sie bitte <a href="tel:112">112</a>.</p>
        </div>
      </div>
    </section>
    <section className="section" id="krankenfahrt-anfragen">
      <div className="container split form-layout">
        <div><SectionHeading eyebrow="Ihre Anfrage" title="Wir gehen den Weg mit Ihnen.">Bereiten Sie die wichtigsten Angaben vor und senden Sie die Anfrage anschließend selbst per WhatsApp. Ihre Fahrt ist erst nach unserer Bestätigung vereinbart.</SectionHeading><p>Lieber persönlich? <a className="text-link" href={`tel:${company.phone}`}>{company.phoneDisplay}</a></p></div>
        <RideForm mode="medical" />
      </div>
    </section>
  </>;
}
