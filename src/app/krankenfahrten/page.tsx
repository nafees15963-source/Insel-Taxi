import { Phone } from 'lucide-react';
import { PageIntro, CheckList, CallButton } from '@/components/ui';
import { RideForm } from '@/components/ride-form';
import { company } from '@/config/company';
export const metadata = {
  title: 'Krankenfahrten regional & bundesweit – einfach anfragen',
  description:
    'Krankenfahrt zum Arzt, zur Klinik oder zur regelmäßigen Behandlung regional und bundesweit anfragen. Einfacher Assistent und persönliche Hilfe per Telefon.',
  alternates: { canonical: '/krankenfahrten' },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Mit Ruhe. Mit Rücksicht. Mit Ihnen."
        title="Ihr Termin ist wichtig. Ihr Weg auch."
      >
        <p>
          Wir bieten Krankenfahrten zum Arzt, in die Klinik, zur Reha und zu regelmäßigen
          Behandlungen an – regional und bundesweit, auch über längere Entfernungen. Fragen Sie Ihre
          Fahrt mit unserem einfachen Assistenten an – oder sprechen Sie direkt mit uns.
        </p>
      </PageIntro>
      <section className="page-content">
        <div className="container content-grid reverse">
          <div>
            <div className="prose">
              <h2>Was ist eine Krankenfahrt?</h2>
              <p>
                Eine Krankenfahrt ist eine Fahrt zu oder von einer medizinischen Einrichtung. Diese
                Website bietet die Anfrage einer Taxifahrt an. Eine medizinische Betreuung während
                der Fahrt ist damit nicht verbunden.
              </p>
              <h2>Welche Fahrten können Sie anfragen?</h2>
              <CheckList
                items={[
                  'Arzt- und Kliniktermine',
                  'Regelmäßige Behandlungen, etwa Dialyse',
                  'Fahrten zur Reha',
                  'Abholung nach einem Klinikaufenthalt',
                  'Hin- und Rückfahrten nach Absprache',
                ]}
              />
              <h2>Welche Unterlagen brauche ich?</h2>
              <p>
                Wenn Ihre Krankenkasse die Fahrt bezahlen soll, können eine ärztliche Verordnung und
                eine vorherige Genehmigung erforderlich sein. Klären Sie vor der Fahrt mit Ihrer
                Praxis und Ihrer Krankenkasse, welche Unterlagen Sie benötigen.
              </p>
              <h2>Wer übernimmt die Kosten?</h2>
              <p>
                Eine Kostenübernahme hängt von den persönlichen Voraussetzungen und der Fahrt ab.
                Wir können dazu keine pauschale Zusage machen. Auch mögliche gesetzliche Zuzahlungen
                sollten Sie vorher klären.
              </p>
              <p>
                Die bisherige Unternehmenswebsite nennt die Direktabrechnung mit Krankenkassen.
                Bitte stimmen Sie die konkrete Abrechnung und die erforderlichen Unterlagen vorab
                telefonisch mit uns ab.
              </p>
            </div>
            <div className="help-panel">
              <h3>Unsicher? Wir sind für Sie da.</h3>
              <p>
                Keine Diagnosen oder Unterlagen über das Formular senden. Fragen zu Hilfsmitteln,
                Unterstützung oder Abrechnung klären wir am besten persönlich.
              </p>
              <a href={`tel:${company.phone}`}>
                <Phone size={21} />
                {company.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="form-panel">
            <h2>Krankenfahrt einfach anfragen</h2>
            <p className="form-description">Sechs kurze Schritte. Ohne Gesundheitsdaten.</p>
            <RideForm mode="medical" />
            <div className="help-panel">
              <h3>Lieber gemeinsam besprechen?</h3>
              <p>Wir nehmen Ihre Anfrage auch telefonisch entgegen.</p>
              <CallButton>{company.phoneDisplay}</CallButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
