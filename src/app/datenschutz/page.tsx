import { PageIntro } from '@/components/ui';
import { company } from '@/config/company';

export const metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung von Insel Taxi: Hosting, Fahrtanfragen per WhatsApp, E-Mail und Telefon, freiwillige Google-Dienste und Ihre Rechte.',
  alternates: { canonical: '/datenschutz' },
};
export default function Page() {
  return (
    <>
      <PageIntro eyebrow="Ihre Daten. Verständlich erklärt." title="Datenschutzerklärung">
        <p>Informationen zu Ihrem Websitebesuch und Ihrer Fahrtanfrage. Stand: 1. November 2026.</p>
      </PageIntro>
      <section className="page-content">
        <div className="container prose-narrow">
          <nav className="legal-nav" aria-label="Datenschutz – Inhalt">
            <a href="#verantwortlicher">Verantwortlicher</a>
            <a href="#hosting">Website & Hosting</a>
            <a href="#formulare">Formulare</a>
            <a href="#whatsapp">WhatsApp</a>
            <a href="#google">Google-Dienste</a>
            <a href="#rechte">Ihre Rechte</a>
          </nav>
          <div className="prose">
            <h2 id="verantwortlicher">1. Verantwortlicher und Kontakt</h2>
            <p>Verantwortlich für die in dieser Erklärung beschriebene Datenverarbeitung ist:</p>
            <p>
              {company.legalName}
              <br />
              Inhaber: {company.owner}
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city}, Deutschland
              <br />
              Telefon: <a href={'tel:' + company.phone}>{company.phoneDisplay}</a>
              <br />
              E-Mail: <a href={'mailto:' + company.email}>{company.email}</a>
            </p>
            <p>
              Über diese Kontaktdaten können Sie auch Datenschutzfragen stellen und Ihre Rechte
              ausüben.
            </p>

            <h2>2. Zwecke und Rechtsgrundlagen</h2>
            <p>
              Personenbezogene Daten sind Informationen, die sich auf eine bestimmte oder
              bestimmbare Person beziehen, etwa Name, Telefonnummer, IP-Adresse oder eine
              zugeordnete Fahrtstrecke. Wir verarbeiten diese Daten zweckgebunden und im
              erforderlichen Umfang.
            </p>
            <ul>
              <li>
                <strong>Fahrtanfrage und Beförderung:</strong> Art. 6 Abs. 1 Buchst. b DSGVO für
                vorvertragliche Maßnahmen auf Ihre Anfrage sowie die Durchführung eines Vertrags.
              </li>
              <li>
                <strong>Allgemeine Kommunikation und sicherer Websitebetrieb:</strong> Art. 6 Abs. 1
                Buchst. f DSGVO. Unsere berechtigten Interessen sind die Beantwortung von Anliegen,
                die Bereitstellung der Website sowie die Abwehr und Aufklärung von Störungen und
                Missbrauch.
              </li>
              <li>
                <strong>Gesetzliche Pflichten:</strong> Art. 6 Abs. 1 Buchst. c DSGVO, insbesondere
                für steuer- und handelsrechtliche Aufbewahrungspflichten.
              </li>
              <li>
                <strong>Freiwillige Zusatzfunktionen:</strong> Art. 6 Abs. 1 Buchst. a DSGVO
                aufgrund Ihrer Einwilligung. Für einwilligungspflichtige Zugriffe auf Ihr Endgerät
                gilt zusätzlich § 25 Abs. 1 TDDDG.
              </li>
            </ul>

            <h2 id="hosting">3. Website und Hosting</h2>
            <p>
              Diese Website wird über Vercel bereitgestellt. Anbieter ist Vercel Inc., 440 N
              Barranca Ave #4133, Covina, CA 91723, USA. Vercel stellt Server, ein Netzwerk zur
              Auslieferung der Inhalte und technische Sicherheitsfunktionen bereit.
            </p>
            <p>
              Beim Abruf werden technisch notwendige Daten verarbeitet. Dazu gehören insbesondere
              IP-Adresse, Datum und Uhrzeit, angeforderte Adresse beziehungsweise Datei,
              Antwortstatus, übertragene Datenmenge sowie Browser- und Geräteinformationen. Soweit
              Ihr Browser sie übermittelt, kann auch die verweisende Seite (Referrer) erfasst
              werden. Dies ist erforderlich, um Inhalte auszuliefern, Fehler zu erkennen und
              Angriffe abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO.
            </p>
            <p>
              Die Dauer der Verarbeitung technischer Protokolle richtet sich nach ihrem Betriebs-
              und Sicherheitszweck und den Aufbewahrungsregeln des Hosting-Dienstes.
              Sicherheitsrelevante Informationen können länger benötigt werden, wenn ein konkreter
              Vorfall untersucht oder ein Rechtsanspruch geklärt wird. Die Website führt kein
              zusätzliches eigenes Besucherprotokoll und keine Buchungsdatenbank.
            </p>
            <p>
              Vercel verarbeitet Hosting-Daten als Dienstleister. Die Bedingungen zur
              Auftragsverarbeitung und die dort beschriebenen Garantien für internationale
              Datenübermittlungen finden Sie im{' '}
              <a href="https://vercel.com/legal/dpa" target="_blank" rel="noopener noreferrer">
                Data Processing Addendum von Vercel
              </a>
              . Durch das internationale Auslieferungsnetz können Daten auch außerhalb der EU
              beziehungsweise des EWR, insbesondere in den USA, verarbeitet werden. Weitere
              Informationen enthält die{' '}
              <a
                href="https://vercel.com/legal/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung von Vercel
              </a>
              .
            </p>

            <h2 id="formulare">4. Fahrtformulare und Nachrichtenvorschau</h2>
            <p>
              Die Formulare bereiten Ihre Fahrtanfrage vor. Abgefragt werden Name, Fahrttyp, Start,
              Ziel, Datum, Uhrzeit und Personenzahl. Bei Kurierfahrten entfällt die Personenzahl.
              Anmerkungen sind freiwillig. Bei E-Mail wird zusätzlich eine Telefonnummer für
              Rückfragen benötigt; bei WhatsApp wird sie nicht zusätzlich abgefragt.
            </p>
            <p>
              Eingaben und Vorschau werden zunächst im Arbeitsspeicher Ihres Browsers verarbeitet.
              Die Formulardaten werden nicht automatisch an einen Buchungsserver übertragen und
              nicht in einer Website-Datenbank, in Cookies oder im dauerhaften Browserspeicher
              gespeichert. Beim Neuladen wird der Formularzustand zurückgesetzt. Eigene Ausfüll- und
              Wiederherstellungsfunktionen Ihres Browsers richten sich nach dessen Einstellungen.
            </p>
            <p>
              Erst durch den Anfragebutton wird ein Link mit Ihren Angaben an WhatsApp oder Ihr
              E-Mail-Programm übergeben. Dabei können die Angaben bereits vor dem tatsächlichen
              Absenden durch den gewählten Dienst verarbeitet werden. Sie prüfen und senden die
              Nachricht dort selbst. Die Vorschau und das Öffnen des Links sind keine
              Buchungsbestätigung.
            </p>
            <p>
              Die Pflichtangaben helfen uns, Ihre Fahrt zuzuordnen und ihre Durchführbarkeit zu
              prüfen. Freiwillige Angaben können Sie weglassen. Alternativ zum Formular können Sie
              uns telefonisch kontaktieren.
            </p>

            <h2 id="whatsapp">5. WhatsApp</h2>
            <p>
              WhatsApp ist ein freiwilliger Kontaktweg. Anbieter für Nutzer im EWR ist WhatsApp
              Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Unsere Website lädt kein
              WhatsApp-Chat-Plugin. Das Symbol wird lokal ausgeliefert und stellt allein keine
              Verbindung zu WhatsApp her.
            </p>
            <p>
              Die festen Kontaktbuttons öffnen den Chat mit unserer Rufnummer ohne vorgegebenen
              Nachrichtentext. Nur beim Absenden des ausgefüllten Fahrtformulars wird der
              vorbereitete Text als URL-Parameter an WhatsApp übergeben. Bereits beim Öffnen eines
              WhatsApp-Links erhält der Dienst technische Verbindungsdaten. Bei Formularlinks können
              außerdem die übergebenen Fahrtangaben verarbeitet und im Linkverlauf Ihres Browsers
              sichtbar werden.
            </p>
            <p>
              Wenn Sie uns schreiben, verarbeiten wir insbesondere Ihre Rufnummer, den angezeigten
              Namen und den Nachrichteninhalt. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. b DSGVO für
              Fahrtanfragen und Vertragsabwicklung beziehungsweise Art. 6 Abs. 1 Buchst. f DSGVO für
              sonstige Anliegen.
            </p>
            <p>
              WhatsApp verarbeitet darüber hinaus Daten in eigener Verantwortung, etwa zur
              Bereitstellung und Sicherheit seines Dienstes. Die Ende-zu-Ende-Verschlüsselung von
              Nachrichten verhindert nicht die Verarbeitung von Verbindungs- und Nutzungsdaten. Die
              weltweite Infrastruktur kann mit Verarbeitungen außerhalb des EWR verbunden sein.
              Empfänger, Speicherfristen, Rechtsgrundlagen und Übermittlungsgarantien erläutern die{' '}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzhinweise von WhatsApp
              </a>
              . Alternativ stehen Telefon und E-Mail zur Verfügung.
            </p>

            <h2>6. E-Mail und Telefon</h2>
            <p>
              Die festen E-Mail-Buttons öffnen Ihr E-Mail-Programm mit unserer Empfängeradresse,
              ohne vorgegebenen Betreff oder Nachrichtentext. Bei einer E-Mail-Anfrage aus dem
              Formular werden Betreff und Fahrtdaten über einen mailto-Link übergeben. Die Website
              versendet selbst keine E-Mails. Sie senden die Nachricht in Ihrem Programm ab.
            </p>
            <p>
              Bei E-Mail-Kontakt verarbeiten wir Ihre Absenderadresse, Namen, Inhalt und
              gegebenenfalls übermittelte Anhänge. Bei einem Anruf verarbeiten wir die Rufnummer,
              soweit sie übermittelt wird, sowie Ihre Angaben. Rechtsgrundlage ist Art. 6 Abs. 1
              Buchst. b DSGVO für Fahrtanfragen und Vertragsabwicklung beziehungsweise Art. 6 Abs. 1
              Buchst. f DSGVO für andere Anliegen. Beteiligte E-Mail- und Telekommunikationsanbieter
              verarbeiten technische Daten nach ihren jeweiligen Bedingungen.
            </p>

            <h2>7. Krankenfahrten und sensible Angaben</h2>
            <p>
              Die Website verlangt keine Diagnosen und keinen Upload medizinischer Unterlagen. Bitte
              geben Sie solche Informationen nicht in die Anmerkungen ein und senden Sie sie nicht
              unaufgefordert über WhatsApp oder E-Mail. Zur ersten Abstimmung genügen normalerweise
              organisatorische Fahrtdaten.
            </p>
            <p>
              Auch ein Fahrtziel oder die Angabe „Krankenfahrt“ kann Rückschlüsse auf die Gesundheit
              ermöglichen. Soweit für eine konkrete Krankenfahrt oder ihre Abrechnung
              Gesundheitsdaten notwendig sind, bedarf die Verarbeitung neben einer Rechtsgrundlage
              nach Art. 6 DSGVO einer einschlägigen Ausnahme nach Art. 9 Abs. 2 DSGVO, etwa Ihrer
              ausdrücklichen Einwilligung. Das bloße Ausfüllen des Formulars ersetzt eine solche
              Einwilligung nicht. Erforderliche Unterlagen und den geeigneten Übermittlungsweg
              stimmen wir gesondert ab. Eine Weitergabe an Kostenträger erfolgt nur, soweit die
              Voraussetzungen für die konkrete Abrechnung vorliegen.
            </p>

            <h2 id="google">8. Freiwillige Google-Dienste</h2>
            <p>
              Sofern eingerichtet, können Sie Google-Adressvorschläge freiwillig aktivieren. Ohne
              Freigabe werden keine Google-Adressvorschläge geladen und keine Routen an Google
              übermittelt. Die Fahrtanfrage funktioniert weiterhin mit manueller Adresseingabe.
            </p>
            <p>
              Bei Freigabe wird die Google-Maps-JavaScript-Schnittstelle geladen. Google erhält
              technische Verbindungsdaten, insbesondere IP-Adresse und Browserinformationen.
              Adresssuchtexte können während Ihrer Eingabe an Google Places übermittelt werden. Bei
              einer anschließend von Ihnen ausgelösten Routenberechnung sendet unser Server Start-
              und Zieladresse an Google Routes. Name, Telefonnummer und Anmerkungen werden von
              dieser Routenfunktion nicht übertragen. Die Anwendung speichert Routenergebnisse nicht
              dauerhaft.
            </p>
            <p>
              Für Google-Dienste im EWR ist grundsätzlich Google Ireland Limited, Gordon House,
              Barrow Street, Dublin 4, Irland, zuständig. Google LLC und weitere Unternehmen der
              Google-Gruppe können beteiligt sein. Eine Verarbeitung in den USA und anderen
              Drittländern ist möglich. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1
              Buchst. a DSGVO und, soweit Informationen auf Ihrem Endgerät gespeichert oder
              ausgelesen werden, § 25 Abs. 1 TDDDG.
            </p>
            <p>
              Die Freigabe wird nur für den aktuellen Seitenbesuch im Arbeitsspeicher gehalten. Über
              „Datenschutzeinstellungen“ im Footer können Sie sie widerrufen. Dabei wird die Seite
              neu geladen, damit bereits geladene Google-Komponenten nicht weiterarbeiten;
              ungesendete Formulareingaben werden zurückgesetzt. Der Widerruf gilt für die Zukunft
              und lässt die Rechtmäßigkeit der vorherigen Verarbeitung unberührt.
            </p>
            <p>
              Weitere Informationen:{' '}
              <a
                href="https://policies.google.com/privacy?hl=de"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google-Datenschutzerklärung
              </a>
              ,{' '}
              <a
                href="https://policies.google.com/privacy/frameworks?hl=de"
                target="_blank"
                rel="noopener noreferrer"
              >
                internationale Datenübermittlungen bei Google
              </a>{' '}
              und{' '}
              <a
                href="https://maps.google.com/help/terms_maps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps-Nutzungsbedingungen
              </a>
              .
            </p>

            <h2>9. Cookies, Schriften und externe Links</h2>
            <p>
              Die Website-Anwendung setzt keine eigenen Analyse- oder Werbecookies ein und verwendet
              keine eigenen Tracking- oder Analyseprogramme. Schriftdateien und Symbole werden lokal
              ausgeliefert. Es gibt keine automatisch geladenen Bewertungswidgets oder
              Social-Media-Feeds. Freigegebene Google-Dienste können eigene technische
              Verarbeitungen auslösen, wie in Abschnitt 8 beschrieben.
            </p>
            <p>
              Bei externen Links verlassen Sie unsere Website. Erst beim Aufruf stellt Ihr Browser
              die Verbindung zum jeweiligen Ziel her. Für die Verarbeitung auf der Zielseite ist
              deren Anbieter verantwortlich.
            </p>

            <h2>10. Empfänger und internationale Übermittlungen</h2>
            <p>
              Innerhalb unseres Betriebs erhalten die mit Ihrer Anfrage und Fahrt befassten Personen
              die erforderlichen Angaben. Weitere Empfänger können die beschriebenen Hosting- und
              Kommunikationsanbieter sowie, soweit für Vertrag oder gesetzliche Pflichten
              erforderlich, Abrechnungsdienstleister, Steuerberatung und zuständige Behörden sein.
              An einen Kostenträger werden Daten nur im für die konkrete Abrechnung erforderlichen
              und rechtlich zulässigen Umfang weitergegeben.
            </p>
            <p>
              Für Übermittlungen außerhalb der EU beziehungsweise des EWR gelten Art. 44 ff. DSGVO.
              Als Grundlage kommen insbesondere Angemessenheitsbeschlüsse nach Art. 45 DSGVO oder
              geeignete Garantien wie EU-Standardvertragsklauseln nach Art. 46 DSGVO in Betracht.
              Das EU-US Data Privacy Framework gilt nur für entsprechend zertifizierte US-Empfänger
              und erfasste Verarbeitungen. Die verlinkten Anbieterinformationen erläutern die für
              den jeweiligen Dienst verwendeten Mechanismen. Informationen zu den für unsere
              Verarbeitung einschlägigen Garantien können Sie bei uns anfordern.
            </p>

            <h2>11. Speicherdauer und Sicherheit</h2>
            <p>
              Ungesendete Formulareingaben werden von dieser Anwendung nur während des Seitenbesuchs
              gehalten. Erhaltene Anfragen und Korrespondenz verarbeiten wir so lange, wie dies für
              Bearbeitung, Durchführung und Abrechnung einer Fahrt oder die Klärung von Rückfragen
              erforderlich ist. Entfällt der Zweck und besteht keine gesetzliche
              Aufbewahrungspflicht oder ein anderer zulässiger Aufbewahrungsgrund, sind die Daten zu
              löschen.
            </p>
            <p>
              Für aufbewahrungspflichtige Unterlagen gelten insbesondere § 147 Abgabenordnung und,
              soweit anwendbar, § 257 Handelsgesetzbuch. Je nach Dokumentart können Fristen von
              sechs, acht oder zehn Jahren gelten. Zur Geltendmachung oder Abwehr von Ansprüchen
              können relevante Daten bis zum Ablauf der einschlägigen Verjährungsfrist auf Grundlage
              von Art. 6 Abs. 1 Buchst. f DSGVO benötigt werden. Dies betrifft die jeweils
              erforderlichen Unterlagen, nicht automatisch jede Nachricht.
            </p>
            <p>
              Die Website wird über HTTPS verschlüsselt übertragen. Die weitere Verarbeitung in
              Browser, E-Mail-Programm und Messenger hängt auch von deren Einstellungen und den
              jeweiligen Anbietern ab.
            </p>

            <h2 id="rechte">12. Ihre Rechte</h2>
            <p>Unter den gesetzlichen Voraussetzungen haben Sie folgende Rechte:</p>
            <ul>
              <li>
                <strong>Auskunft</strong> über Ihre Daten und deren Verarbeitung (Art. 15 DSGVO).
              </li>
              <li>
                <strong>Berichtigung</strong> und Vervollständigung Ihrer Daten (Art. 16 DSGVO).
              </li>
              <li>
                <strong>Löschung</strong> und <strong>Einschränkung der Verarbeitung</strong> (Art.
                17 und 18 DSGVO).
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO).
              </li>
              <li>
                <strong>Widerruf einer Einwilligung</strong> jederzeit mit Wirkung für die Zukunft
                (Art. 7 Abs. 3 DSGVO). Die vorherige rechtmäßige Verarbeitung bleibt unberührt.
              </li>
            </ul>
            <h3>Widerspruch nach Art. 21 DSGVO</h3>
            <p>
              <strong>
                Bei einer Verarbeitung aufgrund von Art. 6 Abs. 1 Buchst. f DSGVO können Sie aus
                Gründen Ihrer besonderen Situation widersprechen.
              </strong>{' '}
              Wir verarbeiten die Daten dann nicht weiter, es sei denn, zwingende schutzwürdige
              Gründe überwiegen Ihre Interessen, Rechte und Freiheiten oder die Verarbeitung dient
              der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Einer
              Verarbeitung für Direktwerbung können Sie jederzeit widersprechen.
            </p>
            <h3>Beschwerde bei einer Aufsichtsbehörde</h3>
            <p>
              Sie können sich nach Art. 77 DSGVO bei einer Datenschutzaufsichtsbehörde beschweren,
              insbesondere an Ihrem gewöhnlichen Aufenthaltsort, Arbeitsplatz oder am Ort des
              vermuteten Verstoßes. Eine vorherige Kontaktaufnahme mit uns ist nicht erforderlich.
            </p>
            <p>
              In Schleswig-Holstein: Landesbeauftragte für Datenschutz, Unabhängiges Landeszentrum
              für Datenschutz Schleswig-Holstein (ULD), Holstenstraße 98, 24103 Kiel. E-Mail:{' '}
              <a href="mailto:mail@datenschutzzentrum.de">mail@datenschutzzentrum.de</a>.
              Informationen und Beschwerdemöglichkeiten:{' '}
              <a
                href="https://www.datenschutzzentrum.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.datenschutzzentrum.de
              </a>
              .
            </p>
            <h2>13. Keine automatisierte Buchungsentscheidung</h2>
            <p>
              Diese Website trifft keine automatisierten Entscheidungen mit rechtlicher Wirkung im
              Sinne von Art. 22 DSGVO und betreibt kein Profiling. Eine Anfrage wird persönlich
              bearbeitet. Eine Fahrpreisschätzung ersetzt keine Buchungsbestätigung und keine
              verbindliche Preisvereinbarung.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
