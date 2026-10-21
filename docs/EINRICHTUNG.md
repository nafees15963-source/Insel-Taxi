# Schritt für Schritt: Ihre neue Taxi-Website einrichten

Sie müssen nicht programmieren können. Die Website ist vorbereitet. Für die normale Fahrtanfrage brauchen Sie weder Google Maps noch eine Datenbank oder eine WhatsApp Business API.

## 1. Projekt speichern

Falls Sie die ZIP-Datei verwenden: herunterladen, mit der rechten Maustaste „Alle extrahieren“ wählen und den Ordner öffnen. Im Projektordner finden Sie unter anderem `package.json`, `src`, `public` und diese Anleitung.

Falls Sie direkt im bereitgestellten Workspace arbeiten: Das Projekt liegt unter `/workspace/Insel-Taxi`.

## 2. Zwei Programme installieren

1. Aktuelle **Node.js LTS-Version** von https://nodejs.org herunterladen und installieren. Mindestens Version 22 verwenden. Die Standardoptionen reichen aus; npm wird mitinstalliert.
2. **Visual Studio Code** von https://code.visualstudio.com herunterladen und installieren.
3. Visual Studio Code öffnen. „Datei → Ordner öffnen“ wählen und den Projektordner auswählen.
4. Oben „Terminal → Neues Terminal“ wählen. Unten erscheint das Eingabefenster für die folgenden Befehle.

Alle Befehle einzeln einfügen und jeweils die Eingabetaste drücken. Das Terminal muss im Ordner mit `package.json` stehen.

## 3. Die Website auf Ihrem Computer starten

Zuerst die benötigten Pakete installieren:

```sh
npm ci
```

Dann die Konfigurationsvorlage kopieren.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS oder Linux:

```sh
cp .env.example .env.local
```

Danach starten:

```sh
npm run dev
```

Im Browser **http://localhost:3000** öffnen. Lassen Sie das Terminal dabei geöffnet. Zum Beenden im Terminal `Strg + C` drücken.

„localhost“ bedeutet: Die Website läuft auf Ihrem Computer. Das ist noch keine öffentliche Internetadresse. Falls Port 3000 belegt ist, nennt Next.js eine andere Adresse im Terminal.

Falls Windows die Ausführung von `npm.ps1` verhindert: In VS Code über den Pfeil neben dem Pluszeichen im Terminal „Eingabeaufforderung“ auswählen und die Befehle dort erneut ausführen. Ändern Sie dafür nicht pauschal die Sicherheitseinstellungen Ihres Computers.

## 4. Telefonnummer und Unternehmensangaben kontrollieren

Öffnen Sie `src/config/company.ts`. Die Daten wurden aus der bisherigen Unternehmenswebsite übernommen:

- Telefon: **04541 802080**
- Telefon-Link international: **+494541802080**
- WhatsApp: **491739189239** – nur Ziffern, ohne Plus oder Leerzeichen
- E-Mail: **info@inseltaxi-ratzeburg.de**
- Anschrift: **Zittschower Weg 11a, 23909 Ratzeburg**
- Inhaber laut bisherigem Impressum: **Naeem Ahmed**

Bitte prüfen Sie die Daten. Der bisherige Datenschutztext enthielt andere Schreibweisen von Inhaber und Adresse. Deshalb sind die Rechtstexte als Entwurf gekennzeichnet.

Die Telefonnummern müssen nur in dieser zentralen Datei geändert werden. Nicht jede Seite einzeln bearbeiten.

## 5. Ihr Original-Logo einfügen

Ihr Original ist inzwischen unter `public/logo-original.png` hochgeladen und wird automatisch im Header, Footer und als Browser-Icon verwendet. **Keine Umgebungsvariable ist dafür nötig.**

Möchten Sie das Logo später austauschen, ersetzen Sie auf GitHub die Datei in `public`, speichern Sie mit „Commit changes“ und warten Sie in Vercel auf das erfolgreiche Deployment. Bei lokaler Entwicklung den neuesten Stand laden und den Server neu starten. Das Logo wird nicht nachgezeichnet, umgefärbt oder verzerrt.

## 6. WhatsApp und Telefon testen

1. Öffnen Sie `/fahrt-anfragen` in der Website.
2. Geben Sie eine Teststrecke und einen Termin in der Zukunft ein.
3. Klicken Sie auf „Per WhatsApp anfragen“.
4. Kontrollieren Sie in WhatsApp die vorbereitete Nachricht. **Eine Testnachricht müssen Sie nicht absenden.**
5. Testen Sie auf Ihrem Smartphone auch „Anrufen“. Das Telefon öffnet die passende App; Sie entscheiden selbst, ob Sie tatsächlich anrufen.

Wichtig: Eine vorbereitete oder abgesendete Nachricht ist keine bestätigte Buchung. Insel Taxi muss die Fahrt persönlich bestätigen.

## 7. Google Maps freiwillig einrichten

Sie können diesen Schritt zunächst überspringen. Adressen lassen sich immer selbst eintippen.

Wenn Sie automatische Adressvorschläge und Streckenberechnung möchten:

1. In der **Google Cloud Console** unter https://console.cloud.google.com ein Projekt anlegen oder auswählen.
2. Ein Abrechnungskonto zuordnen. Google-Dienste können kostenpflichtig sein; die aktuellen Preise direkt bei Google prüfen.
3. Diese APIs aktivieren: **Maps JavaScript API**, **Places API (New)** und **Routes API**.
4. Unter „APIs & Dienste → Anmeldedaten“ zwei getrennte API-Schlüssel erstellen.
5. Den **Browser-Schlüssel** auf Ihre tatsächlichen Website-Domains und nur auf Maps JavaScript/Places API beschränken. Für die lokale Entwicklung gegebenenfalls zusätzlich `http://localhost:3000/*` zulassen.
6. Den **Server-Schlüssel** ausschließlich auf Routes API beschränken. Wenn Ihr Host eine feste Ausgangs-IP bietet, zusätzlich darauf einschränken. Bei einem Host ohne feste IP die passende sichere Lösung des Anbieters verwenden; den Schlüssel niemals als `NEXT_PUBLIC_` konfigurieren.
7. In `.env.local` eintragen:

```dotenv
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=IHR_BROWSER_SCHLUESSEL
GOOGLE_ROUTES_API_KEY=IHR_SERVER_SCHLUESSEL
```

8. In Google Cloud sinnvolle API-Quoten und Budgetwarnungen setzen. Eine Budgetwarnung allein stoppt keine Kosten.
9. Die Datenschutzerklärung um die konkrete Nutzung und Verträge ergänzen und prüfen lassen.
10. Server neu starten. Im Formular „Adressvorschläge freiwillig aktivieren“ wählen, Datenschutzhinweis lesen und freigeben.

Ohne diese Freigabe werden keine Google-Adressvorschläge geladen. Unter „Datenschutzeinstellungen“ im Footer kann die Freigabe widerrufen werden; die Seite lädt dann neu.

Offizielle Informationen:

- https://developers.google.com/maps/documentation/javascript/place-autocomplete-new
- https://developers.google.com/maps/documentation/routes/compute_route_directions
- https://developers.google.com/maps/api-security-best-practices

**Die Google-Keys konnten ohne Ihre Zugangsdaten nicht mit echten API-Aufrufen getestet werden.** Fehler- und Ohne-Key-Zustände wurden geprüft.

## 8. Den Fahrpreisrechner freischalten

Die vom Betreiber bereitgestellte Verordnung vom 25.09.2026 ist ausgewertet und die Tarife ab 01.10.2026 sind bereits konfiguriert. Sie müssen den Rechner nicht mehr freischalten.

Er steht dezent über den Reiter „Tarife“ im Hauptmenü und unter `/fahrpreis` in einem zunächst geschlossenen Abschnitt. Wählen Sie für eine Streckenschätzung ausdrücklich ein Ziel innerhalb des Kreises und die passende Tarifzeit. Eine bekannte Kilometerzahl kann ohne Google eingegeben werden. Die Ausgabe enthält nur Grundpreis und Fahrtstrecke, keine Anfahrt, Wartezeiten oder zusätzliche Leistungen. Der tatsächliche Gesamtpreis kann deutlich höher ausfallen.

Für bundesweite Ziele außerhalb des Kreises und Auslandsfahrten wird hier kein Pauschalbetrag berechnet. Fragen Sie den Gesamtpreis per WhatsApp, E-Mail oder Telefon an. Die Absprachen vor Fahrtbeginn richten sich nach § 1 Absatz 3 der Verordnung. Die vollständige PDF ist auf der Tarifseite verlinkt.

Tarifänderungen werden künftig zentral in `src/config/tariff.ts` eingetragen. Tag-/Nachttarif und Staffelgrenze sind durch Tests abgesichert. Die Website simuliert keinen vollständigen Taxameter.

## 9. Google-Bewertungslink ergänzen

1. Das echte Google-Unternehmensprofil öffnen und genau prüfen, ob es zu Ihrem Unternehmen und Ihrer Adresse gehört.
2. Den direkten Profil- oder Bewertungslink kopieren.
3. In `.env.local` eintragen:

```dotenv
NEXT_PUBLIC_GOOGLE_REVIEW_URL=https://IHR-VERIFIZIERTER-GOOGLE-LINK
```

4. Server neu starten beziehungsweise neu bauen.

Die Website zeigt dann den echten Profil-Link. Bewertungen oder Sterne werden nicht erfunden. Ohne Link gibt es eine Rückmeldemöglichkeit per E-Mail.

## 10. Rechtstexte fertigstellen

Öffnen Sie die Seiten `/impressum` und `/datenschutz`. Alle noch offenen Stellen sind sichtbar markiert. Für den öffentlichen Betrieb insbesondere prüfen:

- Richtiger Inhaber, Anschrift, Rechtsform und gegebenenfalls Registerangaben
- Zuständige Genehmigungsbehörde
- Hosting-Anbieter, Verträge, Logs und Speicherdauer
- Tatsächliche Nutzung von WhatsApp und Google
- Rechtsgrundlagen, Empfänger und Löschfristen
- Pflichtangaben zur Verbraucherschlichtung

Lassen Sie die fertigen Texte passend zu Ihrem Betrieb prüfen. Die vorhandenen Texte sind **keine rechtlich geprüfte Datenschutzerklärung**. Die alten veralteten Verweise auf TMG und die EU-OS-Plattform wurden nicht als aktuelle Rechtsaussagen übernommen.

## 11. Vor dem Hochladen kontrollieren

Nacheinander ausführen:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Dann die fertige Produktionsversion lokal starten:

```sh
npm start
```

Erneut http://localhost:3000 öffnen. Probieren Sie alle Formulare mit einem Smartphone und einem Computer aus. Eine echte Testnachricht nur absenden, wenn Sie das möchten.

## 12. Die Website ins Internet bringen

Sie benötigen **Next.js-/Node.js-Hosting**. Ein gewöhnliches FTP-Webspace-Paket für reine HTML-/PHP-Seiten reicht für die hier enthaltene Serverfunktion nicht.

Eine mögliche Vorgehensweise mit einem Next.js-Hosting-Anbieter wie Vercel:

1. Quellcode mit GitHub Desktop in ein **privates** GitHub-Repository übertragen. `.env.local` nicht hochladen; sie ist bereits ausgeschlossen.
2. Beim Hosting-Anbieter ein Konto anlegen und das Repository als Next.js-Projekt importieren.
3. Die Variablen aus `.env.local` in der Projektkonfiguration des Hosting-Anbieters eintragen. Echte Schlüssel gehören in die Hosting-Einstellungen, nicht in GitHub-Dateien.
4. Zunächst `NEXT_PUBLIC_LAUNCH_READY=false` lassen. Die Seite ist damit für Suchmaschinen gesperrt. **Das ist kein Passwortschutz**; Zugriffsschutz gegebenenfalls beim Hoster aktivieren.
5. Bereitstellen/Deploy wählen. Die neue Vorschauadresse kontrollieren. Diese ersetzt Ihre alte Website noch nicht.
6. Original-Logo, Rechtstexte, Telefonnummern und alle offenen Angaben final kontrollieren.
7. Ihre Domain beim Hoster hinzufügen. Die dort konkret angezeigten DNS-Einträge bei Ihrem Domainanbieter setzen. Keine pauschalen IP-Adressen aus einer fremden Anleitung verwenden.
8. Bestehende E-Mail-Einträge wie **MX, SPF, DKIM und DMARC** bewahren. Die Website-Umstellung darf den E-Mail-Empfang nicht beschädigen. Alte Website vorher sichern.
9. HTTPS-Zertifikat beim Hoster aktivieren beziehungsweise prüfen.
10. `NEXT_PUBLIC_SITE_URL=https://inseltaxi-ratzeburg.de` setzen, wenn genau diese Hauptdomain verwendet wird. Die www-Variante dauerhaft auf die Hauptdomain umleiten.
11. Sobald alle Pflichtangaben und Funktionen freigegeben sind: `NEXT_PUBLIC_LAUNCH_READY=true` setzen und **neu bereitstellen**.
12. Google-Browser-Key auf die endgültige Domain einschränken. Nicht mehr benötigte Vorschau- und localhost-Freigaben entfernen.
13. Bei Google Search Console die Domain bestätigen und `/sitemap.xml` als Sitemap einreichen.

Die DNS-Werte, Hosting-Verträge und Kontozugänge sind anbieterspezifisch. Diese Einrichtung wurde nicht in Ihrem Namen vorgenommen. Ihre bestehende Website bleibt von diesem Projekt unberührt.

Auf einem eigenen Node.js-Server sind `npm ci`, `npm run build` und `npm start` die Grundlage; Prozessverwaltung, TLS, Reverse Proxy, Backups und Updates müssen zusätzlich eingerichtet werden.

## 13. Häufige Probleme

**„npm wurde nicht gefunden“**: Node.js installieren, VS Code danach vollständig schließen und erneut öffnen.

**„package.json fehlt“**: Sie befinden sich im falschen Ordner. Den Projektordner in VS Code öffnen.

**Google-Vorschläge fehlen**: Browser-Key, Domainbeschränkung, freigeschaltete APIs, Abrechnung und aktive Einwilligung prüfen. Manuelle Eingabe bleibt verfügbar.

**Route kann nicht berechnet werden**: Server-Key und Routes API prüfen. `NEXT_PUBLIC_SITE_URL` muss exakt zur geöffneten Hauptadresse passen, sonst blockiert die Origin-Prüfung die Anfrage. Auch Domainweiterleitungen prüfen.

**Kein Eurobetrag**: Wählen Sie für die optionale Schätzung ein Ziel innerhalb des Kreises und geben Sie eine Entfernung an oder aktivieren Sie freiwillig Google. Für andere Ziele wird der Preis persönlich vereinbart.

**WhatsApp öffnet nicht**: Pop-up-/App-Einstellungen prüfen, den angezeigten Link „WhatsApp erneut öffnen“ verwenden oder anrufen.

**Logo fehlt**: Die Datei muss `public/logo-original.png` heißen. Prüfen Sie, ob Vercel den neuesten GitHub-Stand erfolgreich bereitgestellt hat; danach die Website neu laden. Eine Aktivierungsvariable wird nicht mehr benötigt.

**Änderungen an `.env.local` erscheinen nicht**: Den Server neu starten. Bei veröffentlichter Produktionsversion neu bauen und bereitstellen.

## 14. Später aktuell halten

- Telefonnummern und Firmendaten zentral kontrollieren.
- Aktuelle Tarifänderungen prüfen und dokumentieren.
- Regelmäßig Sicherheitsupdates einspielen und die Formulare erneut testen.
- Rechtstexte bei Änderungen an Hosting oder Diensten anpassen.
- API-Kontingente und Betriebskosten im Blick behalten.

## E-Mail als Alternative zu WhatsApp

In jeder Fahrtanfrage können Sie „Per E-Mail anfragen“ wählen. Die gleichen Angaben werden als Entwurf an info@inseltaxi-ratzeburg.de vorbereitet. Sie müssen ihn selbst absenden. Falls kein E-Mail-Programm öffnet, kopieren Sie die angezeigte Nachricht in Ihr Webmail. Für dringende Fahrten bitte anrufen. Es werden keine Nachrichten automatisch versendet und keine SMTP-Schlüssel benötigt.
