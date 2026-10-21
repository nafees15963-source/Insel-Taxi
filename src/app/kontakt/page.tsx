import { MessageCircle, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { PageIntro, WhatsAppButton, CallButton } from '@/components/ui';
import { company } from '@/config/company';
export const metadata = {
  title: 'Kontakt – Telefon & WhatsApp',
  description:
    'Insel Taxi Ratzeburg: Telefon 04541 802080, WhatsApp 0173 9189239. Täglich rund um die Uhr erreichbar. Taxi direkt anfragen.',
  alternates: { canonical: '/kontakt' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Ein kurzer Kontakt. Ihr nächster Weg."
        title="Wir sind für Sie erreichbar."
      >
        <p>
          Sie möchten ein Taxi anfragen oder haben eine Frage? Wählen Sie den Weg, der für Sie am
          einfachsten ist. Für kurzfristige Fahrten empfehlen wir den direkten Anruf.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <div className="contact-cards">
            <article className="contact-card highlight">
              <MessageCircle size={30} />
              <h2>Per WhatsApp</h2>
              <p>
                Schreiben Sie uns, wann und wohin Sie fahren möchten. Wir bestätigen die
                Verfügbarkeit persönlich.
              </p>
              <span className="contact-number">{company.whatsappDisplay}</span>
              <WhatsAppButton>Anfrage starten</WhatsAppButton>
            </article>
            <article className="contact-card">
              <Phone size={28} />
              <h2>Persönlich am Telefon</h2>
              <p>
                Für direkte Rückfragen und kurzfristige Fahrten. Täglich, rund um die Uhr
                erreichbar.
              </p>
              <a className="contact-number" href={`tel:${company.phone}`}>
                {company.phoneDisplay}
              </a>
              <CallButton />
            </article>
          </div>
          <div className="address-block">
            <div>
              <h2>Insel Taxi Ratzeburg</h2>
              <p>
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </p>
              <p>
                Erreichbarkeit:
                <br />
                <strong>{company.hours}</strong>
              </p>
            </div>
            <div>
              <h2>Weitere Anliegen</h2>
              <p>
                Für allgemeine Anfragen oder Geschäftsfahrten erreichen Sie uns auch per E-Mail.
              </p>
              <p>
                <a href={`mailto:${company.email}`}>
                  <Mail size={16} /> {company.email}
                </a>
              </p>
              <p className="field-note">Für dringende Fahrtwünsche bitte anrufen.</p>
            </div>
          </div>
          <p className="notice">
            Eine Anfrage per WhatsApp oder E-Mail ist noch keine Buchung. Bitte warten Sie auf
            unsere ausdrückliche Bestätigung.
          </p>
          {company.reviewUrl && (
            <a
              className="link-box"
              href={company.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unser Google-Unternehmensprofil
              <ArrowUpRight size={20} />
            </a>
          )}
        </div>
      </section>
    </>
  );
}
