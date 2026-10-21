# Willkommen – hier beginnen

Ihre neue Website ist im Projektordner umgesetzt.

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

- Original-Logo als echte PNG-Datei in `public/logo-original.png` ablegen und `NEXT_PUBLIC_LOGO_READY=true` setzen. Die sichtbare Chatabbildung war nicht als Datei im Workspace verfügbar.
- Betreiberangaben und Rechtstexte bestätigen und prüfen lassen.
- Aktuellen Taxitarif verifizieren. Es werden bis dahin keine Europreise erfunden.
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

Die bisherige Website wurde nicht verändert. Eine öffentliche Veröffentlichung wurde nicht vorgenommen.
