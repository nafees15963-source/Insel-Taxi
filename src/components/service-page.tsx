import Link from 'next/link';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { PageIntro, CheckList, CallButton } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import type { ServicePageContent } from '@/config/service-pages';

export function ServicePage({ content }: { content: ServicePageContent }) {
  return (
    <>
      <PageIntro eyebrow={content.eyebrow} title={content.heading}>
        <p>{content.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#anfrage">
            {content.formTitle}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <CallButton />
        </div>
      </PageIntro>
      <section className="page-content">
        <div className="container">
          <Link href="/leistungen" className="text-link service-back-link">
            <ArrowLeft size={18} aria-hidden="true" />
            Alle Leistungen
          </Link>
          <div className="content-grid reverse">
            <div>
              <div className="prose service-details">
                {content.sections.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                    {section.items && <CheckList items={section.items} />}
                  </section>
                ))}
                <h2>Häufige Fragen</h2>
              </div>
              <div className="faq-list">
                {content.questions.map(({ question, answer }) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
              <div className="help-panel">
                <h3>Lieber persönlich besprechen?</h3>
                <p>Für kurzfristige Anfragen und Rückfragen erreichen Sie uns telefonisch.</p>
                <CallButton />
                <Link href="/fahrpreis" className="text-link">
                  Informationen zum Fahrpreis
                </Link>
              </div>
            </div>
            <div className="form-panel" id="anfrage">
              <h2>{content.formTitle}</h2>
              <p className="form-description">{content.formHint}</p>
              <RideForm key={content.rideType} initialType={content.rideType} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
