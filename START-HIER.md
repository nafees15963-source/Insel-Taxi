# Willkommen – hier beginnen

Stand: **Redesign vom 25. Oktober 2026** mit goldenen Wellen, „Ihr Ziel. Unser Weg.“, SUV bis 6 und Großraumtaxi bis 8 Fahrgästen sowie vereinfachten Formularen. Jede Leistung hat eine eigene Informationsseite mit passendem Anfrageformular.

- Website: https://insel-taxi.vercel.app/
- Aktueller Quellcode: https://github.com/nafees15963-source/Insel-Taxi/tree/main2
- ZIP-Datei: `Insel-Taxi-Quellcode.zip` enthält diesen aktuellen Projektstand.

GitHub zeigt neben jeder Datei die letzte Änderung dieser einzelnen Datei. Ältere Datumsangaben bei unveränderten Konfigurationsdateien bedeuten nicht, dass die Website insgesamt alt ist.

**Die vollständige Anleitung ohne vorausgesetzte Programmierkenntnisse finden Sie in `docs/EINRICHTUNG.md`.**

## Schnell auf dem eigenen Computer ansehen

1. Node.js LTS von https://nodejs.org und Visual Studio Code von https://code.visualstudio.com installieren.
2. Diesen Projektordner in Visual Studio Code öffnen.
3. Über „Terminal → Neues Terminal“ ein Terminal öffnen.
4. `npm ci` ausführen.
5. `.env.example` im Dateibaum kopieren und die Kopie `.env.local` nennen.
6. `npm run dev` ausführen.
7. http://localhost:3000 im Browser öffnen.

Das funktioniert zunächst ohne Google-Keys. Telefon und WhatsApp sind bereits zentral konfiguriert.

## Vor dem öffentlichen Start

- Betreiberangaben und Rechtstexte bestätigen und prüfen lassen.
- Der Tarif ab 01.10.2026 ist anhand der bereitgestellten Verordnung konfiguriert. Optionaler Rechner nur für das Kreisgebiet; Fernfahrten und Ausland persönlich abstimmen.
- Optional Google-API-Keys und den echten Unternehmensprofil-Link einrichten.
- Erst nach Freigabe die Indexierung und die endgültige Hauptdomain konfigurieren.

Genauere Erklärungen, Hosting- und Domainanleitung sowie Problemlösungen stehen in `docs/EINRICHTUNG.md`.

Weitere Dateien:

- `README.md`: technische Übersicht
- `docs/OFFENE-PUNKTE.md`: alle fehlenden Informationen
- `docs/QUELLEN.md`: Analyse der bisherigen Website
- `docs/PRUEFBERICHT.md`: durchgeführte Tests und Grenzen
- `docs/Vorschau-Desktop.png`: Desktopvorschau
- `docs/Vorschau-Mobil.png`: Smartphonevorschau

Der Redesign-Code ist im Branch `main2` veröffentlicht. Das vorhandene Vercel-Projekt ist mit diesem Repository verbunden. Die eigene Hauptdomain und deren DNS-Einträge wurden nicht geändert.

Original-Logo ist inzwischen unter `public/logo-original.png` vorhanden und ohne Aktivierungsschalter in Header, Footer und Favicon eingebunden.

Neu: WhatsApp-Gestaltung mit Nachrichtenvorschau sowie größere Bildzeichen bei den Leistungen.
