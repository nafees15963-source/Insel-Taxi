import type { Metadata } from 'next';
import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf der Website von Insel Taxi Ratzeburg und bei Fahrtanfragen.',
  alternates: { canonical: '/datenschutz/' },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageIntro eyebrow="Rechtliches" title="Ihre Daten. Verständlich erklärt." description="Was beim Besuch unserer Website und bei einer Fahrtanfrage mit Ihren Angaben geschieht." />
      <section className="section">
        <div className="container prose">
          <aside className="notice" aria-label="Hinweis zum Bearbeitungsstand">
            <strong>Noch vor dem öffentlichen Start zu vervollständigen</strong>
            <p>Diese Erklärung beschreibt die neu entwickelte Website. Der konkrete Hosting-Anbieter, dessen Log-Speicherfristen sowie die betrieblichen Löschfristen und die WhatsApp-Konfiguration sind noch vom Betreiber zu ergänzen. Auch die eingesetzten Auftragsverarbeiter und gegebenenfalls internationale Datenübermittlungen müssen mit dem tatsächlichen Betrieb abgeglichen werden. Eine rechtliche Prüfung steht aus.</p>
          </aside>

          <h2>1. Verantwortlicher und Kontakt</h2>
          <p>Verantwortlich für die Verarbeitung personenbezogener Daten durch Insel Taxi Ratzeburg ist:</p>
          <p><strong>{company.owner} – {company.name}</strong><br />{company.street}<br />{company.postalCode} {company.city}<br />Telefon: <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a><br />E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p>Für Anliegen zum Datenschutz können Sie sich über diese Kontaktdaten an uns wenden.</p>

          <h2>2. Aufruf der Website und Hosting</h2>
          <p>Ihr Browser übermittelt beim Aufruf dieser Website technisch notwendige Verbindungsdaten an den Hosting-Anbieter. Dazu können Ihre IP-Adresse, Datum und Uhrzeit, die angeforderte Seite oder Datei, der HTTP-Status, Browser- und Betriebssysteminformationen sowie die zuvor besuchte Seite gehören, sofern Ihr Browser diese übermittelt.</p>
          <p>Die Verarbeitung dient der Auslieferung der Website, der Fehleranalyse und der Sicherheit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb.</p>
          <p><strong>Offene Betreiberangaben:</strong> Name und Anschrift des Produktionshosters, Ort der Verarbeitung, tatsächlich protokollierte Daten, Log-Löschfrist, Vereinbarung zur Auftragsverarbeitung und gegebenenfalls Übermittlungsgrundlagen für Drittländer sind vor dem öffentlichen Betrieb hier einzutragen.</p>

          <h2>3. Cookies, Schriftarten und Reichweitenmessung</h2>
          <p>Die Website setzt in ihrer aktuellen Anwendung keine Analyse- oder Werbetracker und keine eigenen Cookies ein. Schriftarten und das Firmenlogo werden lokal mit der Website ausgeliefert. Es wird dadurch keine Verbindung zu einem externen Schriftanbieter aufgebaut.</p>
          <p>Externe Google-Funktionen werden erst nach einer gesonderten aktiven Freigabe geladen. Ihre Einwilligung in diese optionale Funktion gilt nur für die aktuelle Nutzung und kann durch das erneute Laden der Seite beendet werden. Bereits übermittelte Daten werden dadurch nicht zurückgerufen. Wenn der gewählte Hoster zusätzliche Funktionen einsetzt, sind diese vor der Veröffentlichung zu prüfen und hier zu ergänzen.</p>

          <h2>4. Fahrtanfragen im Formular</h2>
          <p>Sie können Abhol- und Zieladresse, Datum, Uhrzeit und Personenzahl sowie freiwillig Gepäck, Namen und Hinweise eingeben. Je nach Anfrage können Flughafen, Flugnummer oder Angaben zu einer Rückfahrt hinzukommen. Diese Angaben werden zunächst im Browser verarbeitet. Die Website speichert keine Anfragen in einer eigenen Datenbank und sendet die Formulare nicht automatisch an uns.</p>
          <p>Wenn Sie die Fahrt auf der Startseite vorbereiten, werden Abholort und Ziel kurzzeitig im lokalen URL-Fragment an das vollständige Formular übergeben und nach dem Einlesen aus der Adresszeile entfernt. Dieses Fragment wird nicht als Teil der Seitenanfrage an den Webserver gesendet.</p>
          <p>Erst wenn Sie WhatsApp öffnen, werden die dafür ausgewählten Angaben als vorbereiteter Nachrichtentext an WhatsApp übergeben. Sie können die Nachricht dort prüfen und selbst absenden. Das Öffnen oder Absenden ist noch keine Fahrtbestätigung. Sie können Ihre Fahrt ebenso telefonisch anfragen.</p>
          <p>Bitte tragen Sie keine Diagnosen, Befunde, Versicherungsnummern oder andere unnötige Gesundheitsdaten in die Formulare ein. Für Fragen zu Unterlagen oder besonderen Unterstützungsbedarfen nutzen Sie bitte das Telefon.</p>

          <h2>5. Kontakt per Telefon oder E-Mail</h2>
          <p>Wenn Sie uns kontaktieren, verarbeiten wir Ihre Kontaktdaten, Ihre Nachricht und die für die Bearbeitung erforderlichen Angaben. Bei Fahrtanfragen und der Durchführung einer Fahrt erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Bei sonstigen Anfragen stützen wir uns auf Art. 6 Abs. 1 lit. f DSGVO und unser berechtigtes Interesse, Ihr Anliegen zu beantworten.</p>
          <p>Angaben werden gelöscht, sobald sie für den jeweiligen Zweck nicht mehr benötigt werden, soweit keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen. Gesetzlich aufzubewahrende Geschäfts- und Abrechnungsunterlagen werden entsprechend den jeweils geltenden Fristen gespeichert. <strong>Die konkreten betrieblichen Löschfristen und genutzten E-Mail-Dienstleister sind noch zu bestätigen.</strong></p>

          <h2 id="whatsapp">6. WhatsApp</h2>
          <p>Die WhatsApp-Schaltflächen sind Links zum externen Dienst WhatsApp. Ohne Betätigung wird durch diese Links keine Verbindung zu WhatsApp aufgebaut. Wenn Sie den Link öffnen, erhält WhatsApp unter anderem Verbindungsdaten und den im Link enthaltenen vorbereiteten Nachrichtentext. Beim anschließenden Versenden verarbeitet WhatsApp außerdem Kommunikations- und Kontodaten nach seinen eigenen Bedingungen.</p>
          <p>WhatsApp wird für Nutzerinnen und Nutzer im Europäischen Wirtschaftsraum von WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, angeboten. Daten können auch durch verbundene Unternehmen und Dienstleister außerhalb der EU verarbeitet werden. Informationen zu Umfang, Speicherfristen, Empfängern und internationalen Übermittlungen finden Sie in der <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von WhatsApp</a>.</p>
          <p>Wir verwenden die von Ihnen an uns gesendeten Angaben zur Bearbeitung Ihrer Anfrage und gegebenenfalls zur Durchführung Ihrer Fahrt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die Nutzung von WhatsApp ist freiwillig; alternativ erreichen Sie uns telefonisch oder per E-Mail. <strong>Die konkrete betriebliche WhatsApp-Variante, Einstellungen zur Kontaktsynchronisierung, Backups und Löschfristen müssen vor dem öffentlichen Start geprüft und ergänzt werden.</strong></p>

          <h2 id="google">7. Optionale Google-Adressvorschläge</h2>
          <p>Falls die Funktion eingerichtet ist, können Sie in den Adressfeldern Google-Adressvorschläge ausdrücklich aktivieren. Ohne Aktivierung bleiben die Felder manuell nutzbar. Erst danach werden Google Maps JavaScript und Google Places geladen. Dabei können insbesondere Ihre IP-Adresse, Browserinformationen und eingegebene Suchbegriffe beziehungsweise Adressen an Google übermittelt werden.</p>
          <p>Anbieter im Europäischen Wirtschaftsraum ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Eine Verarbeitung durch Google LLC oder weitere Dienstleister außerhalb der EU ist möglich. Die Aktivierung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO sowie, soweit auf Informationen in Ihrem Endgerät zugegriffen oder solche gespeichert werden, § 25 Abs. 1 TDDDG.</p>
          <p>Sie können die Adressvorschläge im Formular wieder ausschalten. Danach werden keine neuen Adressvorschläge angefordert. Um auch die bereits geladene Google-Bibliothek aus der aktuellen Seite zu entfernen, laden Sie die Seite neu und aktivieren Sie die Funktion nicht erneut. Die Rechtmäßigkeit der Verarbeitung bis zum Widerruf bleibt unberührt. Weitere Informationen finden Sie in den <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">Datenschutzhinweisen von Google</a>. Vor einer produktiven Aktivierung sind die tatsächlichen Google-Verträge und Übermittlungsgrundlagen zu prüfen.</p>

          <h2>8. Externe Links und Google-Bewertungen</h2>
          <p>Verweise auf Google-Bewertungen, Behörden oder andere externe Seiten laden keine eingebetteten Inhalte dieser Anbieter. Erst beim Öffnen verlassen Sie unsere Website. Für die Datenverarbeitung auf der Zielseite ist der jeweilige Anbieter verantwortlich. Es werden keine Google-Bewertungen automatisch in diese Website eingebunden.</p>

          <h2>9. Ihre Rechte</h2>
          <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft über Ihre personenbezogenen Daten (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</p>
          <p><strong>Widerspruch:</strong> Werden Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeitet, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, nach Art. 21 DSGVO widersprechen. Für die Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannten Kontaktdaten.</p>
          <p>Sie können sich nach Art. 77 DSGVO bei einer Datenschutzaufsichtsbehörde beschweren. Die zuständige Landesaufsicht ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD), Holstenstraße 98, 24103 Kiel. Weitere Informationen: <a href="https://www.datenschutzzentrum.de/" target="_blank" rel="noopener noreferrer">www.datenschutzzentrum.de</a>.</p>

          <h2>10. Pflichtangaben und automatisierte Entscheidungen</h2>
          <p>Sie müssen kein Kundenkonto anlegen. Für die Bearbeitung einer Fahrtanfrage benötigen wir die zur Planung erforderlichen Angaben, etwa Strecke, Termin und Personenzahl. Ohne diese Angaben kann eine Fahrt nicht verlässlich abgestimmt werden. Es findet durch diese Website keine automatisierte Entscheidung über eine Buchung und kein Profiling statt.</p>
          <p>Bearbeitungsstand: 23. Oktober 2026. Diese Fassung muss nach Festlegung des tatsächlichen Hostings und der betrieblichen Abläufe vervollständigt werden.</p>
        </div>
      </section>
    </>
  );
}
