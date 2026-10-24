# Insel Taxi Ratzeburg

Vollständig neu entwickelter Website-Relaunch. Next.js 16, React 19 und TypeScript, mit statisch exportierten Seiten. Weiß, Dunkelblau und das Gelb des unveränderten Original-Logos bilden das Design. Kein Backend, keine Datenbank, keine Benutzerkonten und keine Zahlung nötig.

## Lokal starten

Voraussetzung: Node.js 22 LTS oder neuer, npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Website: `http://localhost:3000`.

```sh
npm run lint
npm run test
npm run typecheck
npm run build
npm run preview
```

`npm run build` exportiert alle Seiten nach `out/`. `npm run preview` stellt diesen fertigen Export auf Port 3000 bereit. Der Export kann auf einem beliebigen HTTPS-Hosting mit Unterstützung für Verzeichnis-Indexdateien bereitgestellt werden. Es ist kein Node-Server im Produktionsbetrieb nötig.

## Funktionen und Seiten

| Adresse | Inhalt |
| --- | --- |
| `/` | Startseite, schnelle Streckeneingabe, Leistungen und FAQ |
| `/leistungen/` | Leistungen und Flotte einschließlich 9-Sitzer |
| `/fahrt-anfragen/` | Dreistufige Fahrtanfrage mit Zusammenfassung |
| `/krankenfahrten/` | Verständliche Hinweise und eigener Assistent |
| `/flughafentransfer/` | Flughafenauswahl, Flugnummer, Gepäck und Rückfahrt |
| `/fahrpreis/` | Nachvollziehbare Tarifübersicht und Original-PDF |
| `/kontakt/` | Telefon, WhatsApp, E-Mail und Google-Bewertungslink |
| `/impressum/`, `/datenschutz/` | Rechtstexte mit benannten offenen Betreiberangaben |

Anfragen öffnen eine korrekt codierte WhatsApp-Nachricht. Erst der Nutzer sendet sie in WhatsApp ab; die Website bestätigt keine Buchung. Alle Formulare lassen 1–9 Fahrgäste zu. Ein 9-Sitzer transportiert höchstens 8 Fahrgäste plus Fahrer; bei 9 Fahrgästen wird ausdrücklich die Aufteilung auf Fahrzeuge angefragt. Zeiten beziehen sich auf Europe/Berlin; Vergangenheits- und Sommerzeitfehler werden geprüft.

Wie gewünscht wurde auf den Preisrechner verzichtet. Verbindliche Berechnungs- oder Flugüberwachungsfunktionen werden nicht vorgetäuscht.

## Zentrale Pflege

- `src/config/company.ts`: Rufnummern, WhatsApp, Anschrift, Inhaber, Flughäfen und Bewertungslink.
- `src/config/tariff.ts`: Beträge aus der bereitgestellten Kreisverordnung ab 01.10.2026.
- `src/lib/booking.ts`: Validierung und vollständige WhatsApp-Zusammenfassung.
- `src/app/globals.css`: responsive Gestaltung und Fokuszustände.
- `public/logo-original.png`: unveränderte Originaldatei. `logo.webp`, Favicon und Apple-Icon sind ausschließlich maßstabsgerechte Größenvarianten, ohne Freistellung oder Veränderung des Motivs.
- `public/tarife/kreisverordnung-2026-10-01.pdf`: vom Betreiber bereitgestellte Primärquelle.

## Umgebungsvariablen und Google

Alle Funktionen laufen ohne API-Schlüssel. Die Browser-Variablen werden beim Build eingebunden; nach einer Änderung neu bauen.

| Variable | Verwendung |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Produktionsdomain für Canonical, Open Graph und Sitemap |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Optionaler Browser-Schlüssel für Maps JavaScript API und Places API |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | Optionaler Ersatz für den verifizierten Google-Profil-Link |
| `NEXT_PUBLIC_LAUNCH_READY` | Erst nach Vervollständigung der Rechtstexte `true`: erlaubt Suchmaschinenindexierung |

Google Places lädt erst, wenn ein Nutzer die Option ausdrücklich einschaltet und eine Adresse eingibt. Ein Fehlschlag lässt die manuelle Eingabe zu. Es gibt keinen eingebetteten Kartendienst, keine Routenberechnung und deshalb auch keinen Server-Key. Den Browser-Key in der Google Cloud auf die benötigten APIs und die eigenen HTTPS-Domains/Referrer beschränken, Quoten und Abrechnungslimits festlegen. Browser-Keys sind technisch öffentlich. Keine vertraulichen Schlüssel unter `NEXT_PUBLIC_` verwenden. Die Live-Anbindung konnte ohne bereitgestellten Schlüssel nicht geprüft werden.

## Datenschutz und Hosting

Schriften und Logo werden lokal ausgeliefert. Keine eigenen Cookies, Tracker, localStorage oder Datenbank. Formularangaben bleiben bis zur bewussten Weitergabe an WhatsApp im Browser. Die schnelle Startseitenanfrage übergibt ihre Felder über ein URL-Fragment, das nicht an den Webserver gesendet und nach dem Einlesen aus der Zieladresse entfernt wird. Ohne JavaScript bleibt die telefonische Anfrage nutzbar.

`public/_headers` enthält Header für kompatibles statisches Hosting; `vercel.json` entsprechende Vercel-Konfiguration und Weiterleitungen alter `.html`-Adressen. Auf anderen Hosts müssen dieselben Header im Webserver eingerichtet werden. Die CSP erlaubt die Inline-Hydration von Next.js und optional Google Places; sie ersetzt keine Hostprüfung. HTTPS vorsehen. Bei GitHub Pages sind individuelle Sicherheitsheader nicht konfigurierbar.

**Vor einem öffentlichen Domainwechsel:** Die konkret markierten Hosting-/Logdaten, Betreiberangaben und betrieblichen Datenschutzprozesse ergänzen. Die Texte sind nicht als rechtlich geprüft ausgegeben. Siehe [offene Punkte](docs/OFFENE-PUNKTE.md), [Quellen](docs/QUELLEN.md) und [Prüfbericht](docs/PRUEFBERICHT.md).

## GitHub

Zielrepository: `nafees15963-source/Insel-Taxi`, Standardbranch `main2`. Die bisherige Anwendung wurde vollständig ersetzt; das Original-Logo und die bereitgestellte Verordnung wurden erhalten. Git bewahrt die frühere Version in der Commit-Historie. Keine getrennte Leer-Version wird veröffentlicht.

Eine zusätzliche private Sites-Vorschau wird über `.openai/hosting.json` zugeordnet. Diese Vorschau ersetzt keine DNS-Einrichtung der Produktionsdomain.
