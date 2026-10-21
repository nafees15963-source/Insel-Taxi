# Prüfbericht des ursprünglichen Relaunch-Stands

Geprüft am **21. Oktober 2026** im vorhandenen Linux-Workspace. Getestet wurde ein lokaler Produktions-Build mit Next.js 16.4.2, React 19.3.1, Node.js 24.19.0 und systemseitigem Chromium. Es wurde keine Nachricht versendet, kein Anruf ausgelöst und keine bestehende Website geändert.

## Ergebnisse

- Produktions-Build erfolgreich; neun Inhaltsseiten, Fehlerseiten, Sitemap, robots.txt und Routen-API erzeugt.
- ESLint ohne Fehler und Warnungen.
- TypeScript-Prüfung erfolgreich.
- Formatprüfung erfolgreich.
- Sieben automatisierte fachliche Tests erfolgreich.
- Alle neun Inhaltsseiten bei 320, 390, 768 und 1440 Pixeln geprüft: keine horizontalen Layoutüberläufe nach Korrekturen.
- axe-core-Prüfung aller neun Seiten mit WCAG-2-A/AA-, WCAG-2.1-AA- und WCAG-2.2-AA-Tags: keine automatisiert festgestellten Verstöße.
- Keine JavaScript-Laufzeitfehler in den Browserabläufen.

## Lighthouse

Lokale mobile Simulation mit Standarddrosselung und Produktionsserver. Keine reale Mobilfunkverbindung und kein öffentliches Hosting. Einzelmessungen können schwanken.

| Konfiguration | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Auslieferungsstand mit Indexierungssperre | 98 | 100 | 100 | 66 |
| Lokal getesteter Freigabestand mit `NEXT_PUBLIC_LAUNCH_READY=true` | 94 | 100 | 100 | 100 |

Der SEO-Abzug im Auslieferungsstand entsteht durch die bewusst gesetzten `noindex`-/robots-Sperren. Zur Prüfung des Freigabestands wurden ausschließlich lokal `NEXT_PUBLIC_LAUNCH_READY=true` und die vorgesehene Hauptdomain beim Build gesetzt. Es fand keine öffentliche Veröffentlichung statt. Anschließend wurde der Standardzustand mit gesperrter Indexierung wiederhergestellt.

Die Messberichte liegen unter `docs/reports/`. Diese Werte sind keine Garantie für einen anderen Host, ein anderes Endgerät, ein später ergänztes Logo oder aktivierte Google-Dienste.

## Geprüfte Abläufe

- Leere und vergangene Fahrtangaben erzeugen verständliche Fehlermeldungen.
- Nach Formularfehlern erhält das erste fehlerhafte Eingabefeld den Fokus.
- WhatsApp-Nachrichten enthalten Strecke, Datum, Uhrzeit, Fahrgäste, Sonderzeichen und Freitext korrekt URL-codiert.
- Eine Anfrage wird nirgends automatisch als bestätigt ausgegeben.
- Krankenfahrten: alle sechs Schritte, Rückfahrtvalidierung und Zusammenfassung.
- Flughafentransfer: Richtung, Flughafenwechsel, Gepäck-/Flugnummernfelder und Nachricht.
- Preisrechner: manuelle Dezimalentfernung; keine Euro-Ausgabe bei ungeprüftem Tarif.
- Datenschutzdialog ohne konfigurierte Google-Dienste.
- Keine externen Ressourcen vor freiwilliger Google-Freigabe.
- Mobile Navigation, Tastaturbedienung und Escape-Verhalten.
- Ohne JavaScript bleiben direkte Kontaktwege verfügbar; Formulare werden ausgeblendet, damit keine Fahrtangaben durch einen ungewollten GET-Submit in die URL geraten.
- Routen-API: fehlender Key, Origin-Prüfung, Einwilligungsprüfung, Größenlimit, eingeschränkte Datenausgabe, Anbieterfehler, keine gefundene Route und simulierte Verbindungsfehler.

## Grenzen der Prüfung

- **Original-Logo:** nicht als abrufbare Datei vorhanden; nur Einbindungsstruktur und neutraler Platzhalter umgesetzt. Das tatsächliche Originalbild muss noch eingefügt und optisch geprüft werden.
- **Google Maps/Routes:** keine echten API-Schlüssel vorhanden. Die Serverintegration wurde mit simulierten Antworten getestet. Ein erfolgreicher realer Google-Aufruf und echte Autocomplete-Ergebnisse sind nicht bestätigt.
- **Tarif:** aktuelle Beträge nicht vollständig verifiziert; deshalb absichtlich deaktiviert. Synthetische Tests der Kilometerstaffelung stellen keinen Ratzeburger Tarif dar.
- **WhatsApp/Telefon:** Linkerzeugung und Browserabläufe getestet; keine echten Nachrichten/Anrufe durchgeführt. App-Übergaben auf einem echten iPhone und Android-Gerät sind noch durch den Betreiber zu testen.
- **Barrierefreiheit:** automatische Prüfungen und ausgewählte Tastaturabläufe ersetzen keine vollständige manuelle WCAG-Konformitätsbewertung oder Screenreader-Prüfung.
- **Recht/Hosting:** Rechtstexte als Entwurf markiert. Keine juristische Prüfung, kein Produktionshost, keine DNS-Änderung und kein Lasttest durchgeführt.

## Reproduzieren

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run format:check
npm run build
npm start
```

In einem zweiten Terminal:

```sh
npm run test:browser
```

Für Playwright gegebenenfalls vorher `npx playwright install chromium` ausführen oder `CHROMIUM_PATH` setzen. Das Skript schreibt Browserbericht und Screenshots in den ignorierten Ordner `work/`.

Lighthouse lässt sich auf einem Rechner mit Chromium so wiederholen:

```sh
npx lighthouse http://localhost:3000 --chrome-path=/usr/bin/chromium --chrome-flags="--headless --no-sandbox" --output=json --output-path=work/lighthouse.json
```

Den Browserpfad an das eigene System anpassen. Für einen Freigabe-Build die Umgebungsvariablen wie in der Einrichtungsanleitung setzen und neu bauen. Die Indexierung erst nach vollständiger Betreiberfreigabe tatsächlich aktivieren.


## Aktuelle Änderungen

Die oben dokumentierten Lighthouse-Werte beziehen sich auf den ursprünglichen Stand. Die neue Änderung ergänzt bundesweite Kommunikation und E-Mail-Entwürfe und aktiviert die anhand des Betreiber-PDFs verifizierten 2026-Tarife. Der Rechner liegt nun in einem geschlossenen optionalen Bereich. Neue Prüfergebnisse werden separat unter docs/reports/update-*.txt bzw. update-browser.json abgelegt. Echte E-Mails und WhatsApp-Nachrichten werden in Tests nicht versendet.

Aktualisierte Prüfung: neun fachliche Tests erfolgreich; Tag-/Nachttarife, 3-km-Grenze, 10-Cent-Rundung und E-Mail-URL geprüft. Alle neun Seiten bei 320, 390, 768 und 1440 Pixeln ohne Layoutüberlauf; axe-core ohne Befund auf den neun Seiten. E-Mail-Entwurf samt Kopiervorlage, Fahrpreisgebiet-Sperre und Tag-/Nachtwechsel im Browser geprüft. Lighthouse nach der Änderung: Performance 94, Accessibility 100, Best Practices 100, SEO 66 (Indexierung weiterhin bewusst gesperrt). Original-PDF stimmt im SHA-256-Hash mit dem Betreiber-Upload überein. Keine echten Nachrichten versendet; Google bleibt ohne reale Schlüssel nicht live geprüft.
