# Insel Taxi Ratzeburg

Umgesetzter Website-Relaunch mit Next.js App Router, React, TypeScript, lokal ausgelieferter Manrope und Lucide-Icons. Keine Fahrzeugbilder, keine Tracking-Skripte, keine Datenbank. Der Schwerpunkt liegt auf WhatsApp-Anfragen und Telefonkontakt.

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
2. Original-Logo als Datei bereitstellen: `public/logo-original.png`. Die im Chat sichtbare Vorlage war nicht als abrufbare Datei im Workspace vorhanden. Sie wurde weder nachgezeichnet noch durch ein anderes Logo ersetzt.
3. Impressum und Datenschutzhinweise auf Hosting und Betrieb abstimmen und prüfen lassen.
4. Aktuellen Taxitarif beschaffen und `src/config/tariff.ts` nach Prüfung konfigurieren. Bis dahin gibt es keine Euro-Schätzung.
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

- `src/app`: neun Seiten, Fehlerseiten, Sitemap, robots.txt, Route-API
- `src/components`: gemeinsame Navigation, Footer, Formulare, Datenschutzfreigabe, Rechner
- `src/config/company.ts`: Kontaktdaten, angebotene Flughafenziele, Logo- und Profilkonfiguration
- `src/config/tariff.ts`: zentrale Tarifkonfiguration mit Verifizierungssperre
- `src/lib/booking.ts`: Datentypen, Validierung und URL-codierte WhatsApp-Nachrichten
- `src/lib/fare.ts`: Berechnung mit Kilometerstufen, Wartezeit und Zuschlag
- `tests`: automatisierte fachliche Tests
- `docs`: Einrichtung, Quellen, offene Angaben und Prüfbericht

## Funktionen

Die Fahrtanfrage, der Assistent mit sechs Schritten und das Transferformular öffnen einen `wa.me`-Link mit den eingegebenen Daten. Es wird nichts automatisch an Insel Taxi gesendet, nichts als bestätigt dargestellt und keine Onlinezahlung verlangt. Der Nutzer muss die Nachricht selbst in WhatsApp senden. Alle Seiten bieten `tel:`-Links.

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

Der Rechner veröffentlicht **keine ungeprüften Preise**. Die alte Website nennt den Tarif von 2024. Der Kreis führt eine Verordnung ab 01.10.2026 auf, deren verlinktes PDF bei der Prüfung nicht erreichbar war. Deshalb stehen `verified: false`, leere Tarifstufen und `null`-Beträge in der Konfiguration.

Bei Aktivierung muss geprüft werden, ob der konfigurierte Tarif zum Fahrzeug, Pflichtfahrgebiet und zur konkreten Fahrt passt. Sonderfälle, Tag/Nacht-Regeln, Tarifwechsel oder genehmigte Vereinbarungen dürfen nicht pauschal mit einem unpassenden Tarif berechnet werden. Die vorhandene Struktur ist eine stetige Kilometer-Schätzung; exakte Taxameter-Schalteinheiten werden nicht simuliert. Bei komplizierten Tarifregeln die Funktion vor Aktivierung entsprechend erweitern. Nicht einfach historische Werte als aktuell markieren.

## Bereitstellung

Für lokale Vorschau keine Veröffentlichung nötig. Dieses Projekt wurde im vorhandenen Workspace implementiert; weder die bestehende Domain noch der Webserver wurden geändert. Der Sites-Helfer und das Vinext-Starterpaket waren in dieser Ausführungsumgebung nicht installiert. Es wurde deshalb keine Sites-Veröffentlichung erstellt.

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

Die Website prüft `NEXT_PUBLIC_LOGO_READY`. Bei `true` wird ausschließlich `/logo-original.png` im Header, Footer und als Icon verwendet. Ohne Datei bleibt die neutrale Fläche „Logo“ sichtbar. Farben, Proportionen oder Bestandteile werden nicht verändert. Die vollständige Vorlage besitzt viel dunklen Rand; eine bessere Original-Exportdatei mit passenden Außenmaßen ist für die Lesbarkeit sinnvoll. Zuschnitt/Freistellung nur mit ausdrücklicher Betreiberfreigabe. Die aktuelle Bilddatei wird nicht eigenmächtig durch KI bearbeitet.

## Dokumentation

- [Einrichtung für Einsteiger](docs/EINRICHTUNG.md)
- [Quellen und Analyse](docs/QUELLEN.md)
- [Noch offene Informationen](docs/OFFENE-PUNKTE.md)
- [Prüfbericht](docs/PRUEFBERICHT.md)

## Browserprüfungen wiederholen

Zuerst `npm run build` und `npm start` ausführen. In einem zweiten Terminal `npm run test:browser` starten. Das Skript verwendet unter Linux vorhandenes `/usr/bin/chromium`; andernfalls vorher `npx playwright install chromium` ausführen. Einen anderen Browserpfad können Sie über `CHROMIUM_PATH` angeben. Die Ergebnisse und Screenshots werden unter `work/` abgelegt. Es werden keine WhatsApp-Nachrichten versendet; der Browser fängt das Öffnen zu Testzwecken ab.
