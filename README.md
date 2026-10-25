# Insel Taxi Ratzeburg

Umgesetzter Website-Relaunch mit Next.js App Router, React, TypeScript, lokal ausgelieferter Manrope und Lucide-Icons. Keine Fahrzeugbilder, keine Tracking-Skripte, keine Datenbank. Der Schwerpunkt liegt auf WhatsApp-, E-Mail-Anfragen und Telefonkontakt.

**Für die Einrichtung ohne Vorkenntnisse:** [Schritt-für-Schritt-Anleitung](docs/EINRICHTUNG.md).

## Start in 5 Minuten

Voraussetzung: Node.js LTS (mindestens 22), npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Unter Windows PowerShell statt `cp` bei Bedarf `Copy-Item .env.example .env.local` verwenden. Danach http://localhost:3000 öffnen. Telefon- und WhatsApp-Links funktionieren bereits ohne Google-Keys. Eine Telefonnummer im Browser zu öffnen löst nicht selbst einen Anruf aus; eine geeignete Telefon-App muss vorhanden sein.

## Vor dem öffentlichen Start

Dieses Projekt ist ein lauffähiger Arbeitsstand mit bewusst gesperrter Suchmaschinenindexierung. Nicht als rechtlich geprüfte, bereits freigegebene Unternehmenswebsite behandeln.

1. [Offene Betreiberangaben](docs/OFFENE-PUNKTE.md) prüfen.
2. Das Original-Logo ist unter `public/logo-original.png` eingebunden. Zum Austauschen die Originaldatei unter demselben Namen ersetzen und neu bereitstellen.
3. Impressum und Datenschutzhinweise auf Hosting und Betrieb abstimmen und prüfen lassen.
4. Der aktuelle Tarif aus der bereitgestellten Verordnung ist konfiguriert. Die optionale Schätzung gilt nur für bis zu vier Fahrgäste im Kreisgebiet und ersetzt keine Preisabsprache.
5. Echten direkten Google-Unternehmensprofil-Link eintragen, falls gewünscht.
6. `NEXT_PUBLIC_SITE_URL` auf die eigene HTTPS-Domain setzen. Erst nach der Freigabe `NEXT_PUBLIC_LAUNCH_READY=true` setzen und neu bauen.

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver, Port 3000 |
| `npm run build` | Produktions-Build inklusive TypeScript-Prüfung |
| `npm start` | Produktionsserver, vorher bauen |
| `npm run lint` | ESLint ohne Warnungen |
| `npm run typecheck` | TypeScript separat prüfen |
| `npm test` | Tests für WhatsApp, Validierung, Tariflogik und Routen-API |
| `npm run test:browser` | Browserprüfung aller Seiten; laufender Produktionsserver nötig |
| `npm run format` | Quellcode formatieren |
| `npm run format:check` | Formatierung prüfen |

## Aufbau

- `src/app`: 13 Inhaltsseiten, Fehlerseiten, Sitemap, robots.txt, Route-API
- `src/components`: gemeinsame Navigation, Footer, Formulare, Datenschutzfreigabe, Rechner
- `src/config/company.ts`: Kontaktdaten, angebotene Flughafenziele, Logo- und Profilkonfiguration
- `src/config/tariff.ts`: zentrale Tarifkonfiguration mit Verifizierungssperre
- `src/lib/booking.ts`: Datentypen, Validierung und URL-codierte WhatsApp-Nachrichten
- `src/lib/fare.ts`: Berechnung mit Kilometerstufen, Wartezeit und Zuschlag
- `tests`: automatisierte fachliche Tests
- `docs`: Einrichtung, Quellen, offene Angaben und Prüfbericht

## Funktionen

Die Anfrageformulare zeigen einen Chat-Kopf, eine WhatsApp-Nachrichtenvorschau und einen grünen WhatsApp-Button. Die Vorschau aktualisiert sich aus den Eingaben; gesendet wird erst in der gewählten App. Die Website verwendet dazu Dunkelblau, Gold und dezente grüne Nachrichtenflächen.

Jede der sechs Leistungskarten öffnet eine eigene Informationsseite mit Anfrageformular: `/taxifahrten`, `/krankenfahrten`, `/flughafentransfer`, `/geschaeftsfahrten`, `/kinderfahrten` und `/kurierfahrten`. Der Fahrttyp ist passend vorbelegt. Bei Kurierfahrten entfällt die Personenzahl; Sendungsdetails gehören in die Anmerkung.

Die Gestaltung greift das Original-Logo mit goldenen Wellen, hellen Flächen und dunkelblauer Schrift auf. Dekorative Bewegung respektiert `prefers-reduced-motion`. Auf der Startseite stehen „Ihr Ziel. Unser Weg.“ und ein Fuhrpark mit SUV für bis zu 6 bzw. Großraumtaxi für bis zu 8 Fahrgäste.

Alle Fahrtformulare – auch Krankenfahrt und Flughafentransfer – zeigen dieselben übersichtlichen Felder direkt an: Name, Fahrttyp, Start, Ziel, Datum, Uhrzeit, Personen (1–8) und eine optionale Anmerkung. Der Fahrttyp ist passend zur Seite vorbelegt. WhatsApp benötigt keine separate Telefonnummer; bei E-Mail-Anfragen kommt ein Pflichtfeld für Rückfragen hinzu. Die Auswahl öffnet einen `wa.me`-Link oder einen E-Mail-Entwurf mit den eingegebenen Daten. Es wird nichts automatisch an Insel Taxi gesendet, nichts als bestätigt dargestellt und keine Onlinezahlung verlangt. Der Nutzer muss die Nachricht selbst in WhatsApp senden. Alle Seiten bieten `tel:`-Links.

Die Formulare speichern Eingaben nur im Browser-Arbeitsspeicher. Medizinische Diagnosen werden nicht abgefragt. Es gibt keine Registrierung und keine Buchungsdatenbank.

## Google-Dienste – optional

Vollständige Beschreibung: [Einrichtung](docs/EINRICHTUNG.md#google-maps-freiwillig-einrichten).

| Variable | Wo sichtbar? | Freizuschaltende APIs |
| --- | --- | --- |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Öffentlich im Browser, zwingend einschränken | Maps JavaScript API, Places API (New) |
| `GOOGLE_ROUTES_API_KEY` | Nur auf dem Server | Routes API |

Ein Google-Cloud-Projekt mit aktivierter Abrechnung ist für diese APIs nötig. Google legt Preise und Kontingente fest. Es werden keine aktuellen Gebühren versprochen.

Adressvorschläge nutzen `AutocompleteSuggestion` mit Session-Token. Die Google-Bibliothek lädt erst nach ausdrücklicher Freigabe in einem nativen Dialog. Diese gilt für den Seitenbesuch und kann im Footer widerrufen werden. Der Widerruf lädt die Seite neu und verwirft ungesendete Formulareingaben. Die API `/api/route` leitet ausschließlich Start und Ziel weiter. Keine Kartenansicht wird unnötig eingebettet.

Ohne Keys: manuelle Adresseingabe, WhatsApp und Telefon funktionieren. Im Rechner kann eine Entfernung manuell eingegeben werden; eine Dauer wird dafür nicht erfunden. Ein fehlender oder fehlerhafter Google-Dienst führt zu einer verständlichen Meldung.

## Tarifstatus

Der Betreiber hat die Verordnung vom 25.09.2026 (gültig ab 01.10.2026) bereitgestellt. Die Werte sind in `src/config/tariff.ts` zentral hinterlegt: Grundpreis 5,50 €, werktags 06–22 Uhr 2,90 €/km für die ersten 3 km, danach 2,70 €/km; nachts sowie sonn-/feiertags 3,20 €/km, danach 2,90 €/km. Wartezeit 50 €/h, Großraumzuschlag unter den tariflichen Voraussetzungen 12 €. Die Originalverordnung wird unter `public/tarife/kreisverordnung-2026-10-01.pdf` ausgeliefert.

Die Berechnung steht zurückhaltend in einem geschlossenen Abschnitt unter `/fahrpreis`, nicht im Hero oder als großer Startseiten-Rechner. Nutzer wählen das Tarifgebiet und die passende Tarifzeit ausdrücklich. Für Ziele außerhalb des Kreises oder unklare Zuordnung wird kein Betrag berechnet: laut § 1 Abs. 3 ist der Preis vor Fahrtbeginn für die gesamte Strecke zu vereinbaren; ohne Vereinbarung gilt der Kreistarif als vereinbart. Die UI zeigt nur Grundpreis und angegebene besetzte Strecke, keine Anfahrt, Wartezeit oder besondere Ausstattung. Der tatsächliche Gesamtpreis kann deutlich höher liegen. Tarifwechsel während einer Fahrt und genaue Taxameter-Schaltereignisse werden nicht simuliert.

## E-Mail-Anfragen

Alle Fahrtformulare bieten denselben validierten Inhalt wahlweise per WhatsApp oder als `mailto:`-Entwurf an. Für E-Mail ist ein eingerichtetes E-Mail-Programm nötig. Die Website versendet nichts automatisch und behauptet keine Zustellung oder Buchungsbestätigung. Eine Kopiervorlage mit Empfänger wird nach Öffnen des Entwurfs angezeigt. Es sind keine SMTP-Zugangsdaten erforderlich; es wird keine Server-Buchungsdatenbank angelegt.

## Bereitstellung

Das vorhandene GitHub-Repository `nafees15963-source/Insel-Taxi` wird auf dem Branch `main2` gepflegt. Vercel ist mit dem Repository verbunden; die aktuelle Website liegt unter https://insel-taxi.vercel.app/. Änderungen am Branch werden über diese Integration bereitgestellt. DNS und die bestehende Hauptdomain werden dadurch nicht geändert.

Geeignet: ein Next.js-fähiger Hosting-Anbieter oder ein Node.js-Server. Ein reines PHP-/FTP-Webspace-Paket genügt für die Serverfunktion nicht. Alle Variablen mit `NEXT_PUBLIC_` werden beim Build fest eingebunden: nach Änderungen neu bauen.

### Node.js-Server

```sh
npm ci
npm run build
npm start
```

TLS und Reverse Proxy entsprechend dem gewählten Anbieter einrichten. Unter HTTPS wird HSTS über die Hosting-Konfiguration empfohlen; auf localhost wird kein HSTS erzwungen.

### Sicherheit und Betrieb

- `.env.local` und Secrets sind ignoriert; keine realen Schlüssel liegen im Quellcode.
- Sicherheitsheader in `next.config.ts`: CSP, Frame-Schutz, MIME-Schutz, Referrer- und Permissions-Policy.
- Die CSP erlaubt die für Next.js erforderlichen Inline-Skripte. Sie ist kein vollständiger Ersatz für Eingabevalidierung; für einen strengeren Betrieb sind Nonces möglich.
- Google-Routen: Origin-Prüfung, Größenlimit, Validierung, Timeout, kleine Antwort mit `no-store`, keine eigenen Adresslogs.
- Das eingebaute Anfragebudget von 30 Routenberechnungen pro Minute gilt pro Serverprozess. In einem skalierten/serverlosen Betrieb ist zusätzlich ein zentraler Hosting-/WAF-Limiter erforderlich. Google-API-Quoten unbedingt begrenzen, Budgetwarnungen allein begrenzen keine Kosten.
- API-Schlüssel separat und mit passenden API-/Domain-/Serverbeschränkungen erstellen.
- Provider-Logs und Datenschutzvereinbarungen vor öffentlichem Betrieb prüfen.

## Original-Logo

Das vom Betreiber auf GitHub bereitgestellte Original liegt unter `public/logo-original.png`. Header, Footer und Favicon verwenden diese Datei direkt. Eine zusätzliche Freigabevariable ist nicht mehr erforderlich; alte Werte von `NEXT_PUBLIC_LOGO_READY` haben keine Wirkung. Next.js liefert das Bild in passender Größe optimiert aus. Die Originaldatei, Farben und Proportionen bleiben unverändert.

## Dokumentation

- [Einrichtung für Einsteiger](docs/EINRICHTUNG.md)
- [Quellen und Analyse](docs/QUELLEN.md)
- [Noch offene Informationen](docs/OFFENE-PUNKTE.md)
- [Prüfbericht](docs/PRUEFBERICHT.md)

## Browserprüfungen wiederholen

Zuerst `npm run build` und `npm start` ausführen. In einem zweiten Terminal `npm run test:browser` starten. Das Skript verwendet unter Linux vorhandenes `/usr/bin/chromium`; andernfalls vorher `npx playwright install chromium` ausführen. Einen anderen Browserpfad können Sie über `CHROMIUM_PATH` angeben. Die Screenshots werden unter `work/` abgelegt; aktuelle Prüfergebnisse sind im Prüfbericht verlinkt. Es werden keine WhatsApp-Nachrichten versendet; der Browser fängt das Öffnen zu Testzwecken ab.
