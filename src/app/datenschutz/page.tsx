import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';
export const metadata = {
  title: 'Datenschutz',
  description:
    'Hinweise zur Verarbeitung Ihrer Daten bei Fahrtanfragen, WhatsApp-Kontakt und optionalen Google-Diensten. Entwurf zur Betreiberprüfung.',
  alternates: { canonical: '/datenschutz' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Ihre Daten. Verständlich erklärt." title="Datenschutzhinweise">
        <p>Informationen zur Website. Stand: 24. Oktober 2026.</p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <div className="legal-status">
            <strong>Entwurf – vor öffentlichem Betrieb vervollständigen</strong>Diese Hinweise
            beschreiben die implementierten Funktionen. Hosting-Anbieter, Auftragsverarbeitung,
            Rechtsgrundlagen, Löschfristen und internationale Übermittlungen müssen vor
            Veröffentlichung auf die tatsächliche Betriebssituation abgestimmt und rechtlich geprüft
            werden. Die Angaben des bisherigen Datenschutztextes widersprechen teilweise dem
            bisherigen Impressum.
          </div>
          <div className="prose">
            <h2>1. Verantwortlicher</h2>
            <p>
              {company.name}
              <br />
              Inhaber: {company.owner}
              <br />
              {company.street}, {company.postalCode} {company.city}
              <br />
              Telefon: <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
              <br />
              E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p>[Betreiberangaben vor Veröffentlichung bestätigen.]</p>
            <h2>2. Aufruf und Hosting der Website</h2>
            <p>
              Beim Abruf einer Website verarbeitet der Hosting-Anbieter technisch erforderliche
              Verbindungsdaten, beispielsweise IP-Adresse, Zeitpunkt und angeforderte Ressource. Die
              genaue Protokollierung und Speicherdauer hängen vom gewählten Hosting ab.
            </p>
            <p>
              [ZU ERGÄNZEN: Hosting-Anbieter mit Anschrift, Verarbeitungsorte,
              Auftragsverarbeitungsvertrag, konkrete Logdaten, Rechtsgrundlage und Löschfristen.]
            </p>
            <h2>3. Fahrtformulare</h2>
            <p>
              Die Angaben in den Fahrtformularen werden zunächst nur im Arbeitsspeicher Ihres
              Browsers verarbeitet. Diese Anwendung legt weder eine Buchungsdatenbank noch ein
              Benutzerkonto an und speichert die Formulardaten nicht in Cookies oder im dauerhaften
              Browserspeicher. Beim Neuladen gehen Ihre Eingaben verloren.
            </p>
            <p>
              Für eine Anfrage benötigen wir Ihren Namen, den Fahrttyp, Start, Ziel, Datum, Uhrzeit
              und Personenzahl (außer bei Kurierfahrten). Bei einer E-Mail-Anfrage wird zusätzlich
              eine Telefonnummer für Rückfragen abgefragt; bei WhatsApp ist sie nicht erforderlich
              und wird nicht in den Nachrichtentext übernommen. Eine Anmerkung ist freiwillig. Bitte
              geben Sie keine Diagnosen, medizinischen Unterlagen oder sonstigen unnötigen
              Gesundheitsdaten ein.
            </p>
            <h2>4. WhatsApp, E-Mail und telefonischer Kontakt</h2>
            <p>
              Bei „Per E-Mail anfragen“ wird ein mailto-Link mit Empfänger, Betreff und Ihren
              Fahrtangaben an Ihr eingerichtetes E-Mail-Programm übergeben. Ein Entwurf wird
              vorbereitet; die Website versendet keine E-Mails. Sie müssen die Nachricht selbst
              absenden. Ein eingerichtetes E-Mail-Programm ist erforderlich; alternativ können Sie
              den angezeigten Nachrichtentext kopieren. Es erfolgt keine Speicherung Ihrer Anfrage
              auf diesem Webserver.
            </p>
            <p>
              Erst wenn Sie einen WhatsApp-Link aktiv öffnen, wird die vorbereitete Nachricht als
              Bestandteil einer URL an WhatsApp übergeben. Dadurch können Ihre Fahrtangaben bereits
              beim Öffnen des Links an WhatsApp übermittelt werden. Sie versenden die Nachricht
              anschließend selbst. Die weitere Verarbeitung erfolgt durch WhatsApp und die
              beteiligten Kommunikationsanbieter nach deren Bedingungen. Die Kommunikation kann mit
              einer Übermittlung in Drittländer verbunden sein.
            </p>
            <p>
              Alternativ können Sie telefonisch anfragen. Bei einem Telefonanruf werden Ihre
              Rufnummer, sofern übertragen, und die besprochenen Angaben verarbeitet.
              Kontaktaufnahmen per E-Mail werden durch die beteiligten E-Mail-Anbieter verarbeitet.
            </p>
            <p>
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzhinweise von WhatsApp
              </a>
            </p>
            <p>
              [ZU PRÜFEN: tatsächliche WhatsApp-Nutzung des Unternehmens, Verantwortlichkeiten,
              Rechtsgrundlagen, Kontakt- und Buchungsdatenverarbeitung im Unternehmen sowie konkrete
              Löschfristen. Vorvertragliche Anfragen können unter Art. 6 Abs. 1 lit. b DSGVO fallen;
              die konkrete Einordnung ist durch den Betreiber vorzunehmen.]
            </p>
            <h2>5. Freiwillige Google-Dienste</h2>
            <p>
              Ohne Ihre aktive Freigabe lädt diese Anwendung keine Google-Adressvorschläge. Auch
              eine Routenberechnung über Google findet erst nach der Freigabe und einer von Ihnen
              ausgelösten Berechnung statt. Die Freigabe gilt im Arbeitsspeicher für den aktuellen
              Seitenbesuch.
            </p>
            <p>
              Bei aktivierten Adressvorschlägen werden Ihre eingegebenen Adressen und technische
              Verbindungsdaten an Google übermittelt. Bei der Routenberechnung sendet der Server
              ausschließlich Start- und Zieladresse an die Google Routes API. Name, Freitextwünsche
              oder Gesundheitsangaben werden von der Routenfunktion nicht übertragen.
            </p>
            <p>
              Sie können die Freigabe über „Datenschutzeinstellungen“ im Footer widerrufen. Die
              Seite wird dabei neu geladen, wodurch ungesendete Formulareingaben verloren gehen. Die
              bereits erfolgte Verarbeitung wird dadurch nicht rückgängig gemacht.
            </p>
            <p>
              <a
                href="https://policies.google.com/privacy?hl=de"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzhinweise von Google
              </a>
            </p>
            <p>
              [VOR AKTIVIERUNG ZU PRÜFEN: Google-Vertragspartner, Rechtsgrundlage der Einwilligung,
              Drittlandübermittlungen und Garantien, gegebenenfalls gesetzliche Vorgaben für
              Endgerätezugriffe sowie erforderliche Vertragsvereinbarungen.]
            </p>
            <h3>Nutzungsbedingungen der Google-Funktionen</h3>
            <p>
              Für die freiwillig aktivierten Google-Funktionen gelten ergänzend die{' '}
              <a
                href="https://maps.google.com/help/terms_maps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps-Nutzungsbedingungen
              </a>
              . Die Angaben zur Strecke sind unverbindliche Hilfen zur Planung. Es werden keine
              Google-Inhalte dauerhaft auf dieser Website gespeichert.
            </p>
            <h2>6. Schrift, Cookies und Analyse</h2>
            <p>
              Die Schriftdateien werden lokal ausgeliefert. Diese Anwendung setzt keine eigenen
              Analyse- oder Werbetracker und keine eigenen Cookies ein. Die optional freigegebenen
              Google-Dienste und der Hosting-Anbieter müssen im endgültigen Betrieb gesondert
              geprüft werden.
            </p>
            <h2>7. Bewertungen und externe Links</h2>
            <p>
              Es werden keine externen Bewertungswidgets automatisch geladen. Ein gegebenenfalls
              eingerichteter Link zu einem Google-Unternehmensprofil öffnet Google erst nach Ihrem
              Klick. Ab dann gelten die Datenschutzbedingungen des jeweiligen Anbieters.
            </p>
            <h2>8. Ihre Rechte</h2>
            <p>
              Nach Maßgabe der DSGVO können Rechte auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch bestehen. Eine
              erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen. Sie können
              sich bei einer Datenschutzaufsichtsbehörde beschweren.
            </p>
            <p>
              Für Schleswig-Holstein:{' '}
              <a
                href="https://www.datenschutzzentrum.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein
              </a>
              . Bitte wenden Sie sich für die Ausübung Ihrer Rechte zunächst an den oben genannten
              Kontakt.
            </p>
            <h2>9. Offene Betreiberangaben</h2>
            <p>
              [ZU ERGÄNZEN: gegebenenfalls Datenschutzbeauftragter, konkrete Speicher- und
              Löschfristen, Empfänger, eingesetzte Dienstleister und technische Schutzmaßnahmen des
              tatsächlichen Betriebs.]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
