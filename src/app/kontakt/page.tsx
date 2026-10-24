import type { Metadata } from 'next';
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';
import { whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Kontakt – Taxi anrufen oder per WhatsApp anfragen',
  description: 'Insel Taxi Ratzeburg erreichen: 04541 802080, täglich rund um die Uhr. Fahrt per WhatsApp anfragen oder direkt telefonisch bestellen.',
  alternates: { canonical: '/kontakt/' },
};

export default function ContactPage() {
  return <>
    <PageIntro eyebrow="Wir sind erreichbar" title="Ein Anruf. Ein guter Anfang." description="Ein Taxi für jetzt, eine Fahrt für morgen oder eine Frage vorab: Sprechen Sie mit uns. Täglich, rund um die Uhr." />
    <section className="section">
      <div className="container">
        <div className="split contact-options">
          <article className="card contact-option"><Phone size={28} aria-hidden="true" /><p className="eyebrow">Direkt & persönlich</p><h2>Rufen Sie uns an.</h2><a className="contact-number" href={`tel:${company.phone}`}>{company.phoneDisplay}</a><p>Besonders einfach, wenn Sie zeitnah ein Taxi benötigen oder Ihre Fahrt persönlich besprechen möchten.</p><a className="button button-primary" href={`tel:${company.phone}`}><Phone size={19} aria-hidden="true" /> Jetzt anrufen</a></article>
          <article className="card contact-option"><MessageCircle size={28} aria-hidden="true" /><p className="eyebrow">In Ihrem Tempo</p><h2>Schreiben Sie uns.</h2><p className="contact-number">{company.whatsappDisplay}</p><p>Schicken Sie uns Abholort, Ziel und Wunschtermin. Die Fahrt ist erst nach unserer persönlichen Bestätigung vereinbart.</p><a className="button button-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> WhatsApp öffnen <span className="sr-only">(externer Dienst, neuer Tab)</span></a></article>
        </div>
        <p className="form-note">WhatsApp wird erst geöffnet, wenn Sie den Link wählen. Dabei gelten die Datenschutzbedingungen von WhatsApp. Für sensible Angaben nutzen Sie bitte das Telefon.</p>
      </div>
    </section>
    <section className="section section-muted">
      <div className="container split">
        <div className="prose"><p className="eyebrow">In Ratzeburg zu Hause</p><h2>Hier erreichen Sie Insel Taxi.</h2><p>Wir sind in Ratzeburg und der Umgebung unterwegs. Längere Strecken und besondere Anforderungen stimmen wir gern mit Ihnen ab.</p><dl className="contact-details"><div><dt><MapPin size={20} aria-hidden="true" /> Geschäftsanschrift</dt><dd>{company.name}<br />{company.street}<br />{company.postalCode} {company.city}</dd></div><div><dt><Mail size={20} aria-hidden="true" /> E-Mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div><div><dt><Clock3 size={20} aria-hidden="true" /> Erreichbarkeit</dt><dd>{company.hours}</dd></div></dl></div>
        <aside className="card prose"><p className="eyebrow">Ihre Erfahrung zählt</p><h3>Schon mit uns gefahren?</h3><p>Teilen Sie Ihre Erfahrung auf unserem Google-Unternehmensprofil. Ihre Rückmeldung hilft anderen Fahrgästen bei der Orientierung und uns im Alltag.</p><a className="text-link" href={company.reviewUrl || 'https://g.page/r/CQj2XSd7t1QiEAE/review'} target="_blank" rel="noopener noreferrer">Bei Google bewerten <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only">(neuer Tab)</span></a><p className="form-note">Google wird erst nach dem Öffnen des Links aufgerufen. Auf dieser Website werden keine Google-Bewertungsdaten automatisch geladen.</p></aside>
      </div>
    </section>
  </>;
}
