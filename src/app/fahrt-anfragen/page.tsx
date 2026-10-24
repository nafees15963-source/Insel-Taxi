import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Phone, Check } from 'lucide-react';
import { PageIntro } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Taxi einfach anfragen',
  description: 'Taxi in Ratzeburg per WhatsApp anfragen. Abholort, Ziel und Termin eintragen – ohne Registrierung. Auch Gruppen bis 9 Personen anfragen.',
  alternates: { canonical: '/fahrt-anfragen/' },
};

export default function RidePage() {
  return <>
    <PageIntro eyebrow="Ihre Fahrtanfrage" title="Wohin geht’s für Sie?" description="Ein paar Angaben genügen. Wir bereiten Ihre Nachricht vor – Sie senden sie per WhatsApp und wir stimmen die Fahrt mit Ihnen ab." />
    <section className="section">
      <div className="container split form-layout">
        <aside className="prose">
          <p className="eyebrow">Einfach persönlich</p><h2>Ihr direkter Draht zu uns.</h2>
          <ul className="check-list"><li><Check size={18} aria-hidden="true" /> Keine Registrierung</li><li><Check size={18} aria-hidden="true" /> Keine Onlinezahlung</li><li><Check size={18} aria-hidden="true" /> Persönliche Bestätigung Ihrer Fahrt</li></ul>
          <p>Wenn es schnell gehen muss oder Sie etwas besprechen möchten, rufen Sie uns einfach an.</p>
          <a className="button button-secondary" href={`tel:${company.phone}`}><Phone size={19} aria-hidden="true" />{company.phoneDisplay}</a>
          <p className="form-note">Täglich rund um die Uhr erreichbar. Eine WhatsApp-Anfrage ist noch keine bestätigte Buchung.</p>
          <p>Für eine <a className="text-link" href="/krankenfahrten/#krankenfahrt-anfragen">Krankenfahrt</a> oder einen <a className="text-link" href="/flughafentransfer/#transfer-anfragen">Flughafentransfer</a> gibt es passende Anfrageformulare.</p>
        </aside>
        <Suspense fallback={<p>Die Fahrtanfrage wird geladen. Sie erreichen uns auch telefonisch unter {company.phoneDisplay}.</p>}><RideForm mode="taxi" /></Suspense>
      </div>
    </section>
  </>;
}
