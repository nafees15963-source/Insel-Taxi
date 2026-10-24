# Prüfbericht zum Relaunch

Stand: 24. Oktober 2026. Geprüft wurde der lokal erstellte statische Produktionsbuild mit Chromium und Playwright. Die Prüfung ersetzt keine vollständige manuelle WCAG-Zertifizierung oder rechtliche Prüfung.

## Browserprüfung

Reproduzierbares Skript: `tests/browser-qa.mjs`. Ausführung nach `npm run build` und `npm run preview` mit `node tests/browser-qa.mjs`. Standardmäßig wird `http://localhost:3000` geprüft; `QA_BASE_URL`, `QA_REPORT_DIR` und `CHROME_PATH` können angepasst werden.

- Alle neun vorgesehenen Seiten bei 1440, 768, 390 und 320 Pixeln Breite geprüft (36 Kombinationen).
- Pro Kombination: eine Hauptüberschrift, horizontale Überläufe, Seitenfehler und axe-core mit den Tags WCAG 2 A/AA, WCAG 2.1 AA und WCAG 2.2 AA geprüft.
- Ergebnis des abschließenden Laufs: **36 von 36 Kombinationen bestanden**, keine von axe erkannten Verstöße in den genannten Prüfregeln, kein horizontaler Überlauf und jeweils genau eine Hauptüberschrift.
- Keine externen Netzwerkanfragen beim Seitenaufruf und bei der Formularbedienung ohne aktivierte Google-Funktion beobachtet.
- Keine JavaScript-Seitenfehler oder fehlgeschlagenen internen Ressourcenanfragen beobachtet.

## Erfolgreiche Funktionsprüfungen

- Mobiles Menü: Tastatur-Fokusumlauf, Escape, Schließen nach Navigation und nach Wechsel auf Desktopbreite.
- Schnellformular: Adressen werden im URL-Fragment übergeben, im vollständigen Formular übernommen und anschließend aus dem Fragment entfernt. Keine Adresse im Query-String.
- Taxi-, Krankenfahrt- und Flughafenformular: Pflichtfeldfehler, vergangene Termine, zukünftige Termine, neun Fahrgäste als Gruppenanfrage, Gepäck, Name, Sonderzeichen, Rückfahrt und Zurück-Navigation.
- Vollständiger WhatsApp-Link aller drei Formulare mit unabhängig erwarteter Nachricht verglichen, einschließlich Umlauten, Zeilenumbrüchen, Ampersand und Pluszeichen. Keine WhatsApp-Nachricht wurde versendet und kein Telefonanruf ausgelöst.
- Telefonlinks enthalten `tel:+494541802080`.
- Datenschutz-Anker vorhanden, Tarif-PDF erreichbar, Original-Logo erreichbar, unbekannte URL liefert HTTP 404.
- Ohne JavaScript sind interaktive Formulare ausgeblendet; Telefonkontakt bleibt vorhanden.
- Original-Logo mit dem übernommenen Original bytegenau abgeglichen. SHA-256: `db271bb1d02cd3284f767ed9520b1c0160fa5b4e7a84ae948a8cb7ba8b086742`.

## Abschließende Nachprüfung

Der zugängliche Name des mobilen Telefonlinks, der Kontrast der Leistungsnummern sowie die Überläufe im Leistungsraster und bei langen Impressumsüberschriften wurden korrigiert. Die vollständige Wiederholung aller 36 Seiten-/Viewport-Kombinationen und aller sieben Funktionsgruppen am 24. Oktober 2026 war erfolgreich. Auch alle drei Formular-Zusammenfassungen bestanden die zusätzlichen axe-Prüfungen bei 390 Pixeln Breite. Desktop- und Mobilansichten wurden als Screenshots dokumentiert und die mobile Formularanordnung visuell geprüft.

Die Maschinenprüfung schreibt `browser-qa.json` und Screenshots in das über `QA_REPORT_DIR` festgelegte Verzeichnis. Die lokale Standardablage ist `/workspace/work/qa`.

## Grenzen und offene Voraussetzungen

- Google Places ist ohne API-Key nicht aktiviert. Ein echter API-Aufruf und die vertraglichen Voraussetzungen können erst mit einem eingeschränkten Produktionsschlüssel geprüft werden; die manuelle Eingabe funktioniert ohne Google.
- Telefonzustellung, WhatsApp-Zustellung und eine tatsächliche Fahrtbestätigung sind keine automatisierten Websitefunktionen und wurden nicht ausgelöst.
- Produktionshosting, Sicherheitsheader des endgültigen Hosters und dessen Logverarbeitung müssen bei der Bereitstellung geprüft werden.
- Lighthouse-Werte der finalen lokalen Messung stehen unten; Produktionswerte sind vom tatsächlichen Hosting abhängig.
- Fehlende rechtliche und betriebliche Angaben sind in `docs/OFFENE-PUNKTE.md` dokumentiert.

## Build, Typen und Funktionstests

`npm run build`, `npm run lint`, `npm run typecheck` und alle 8 Unit-Tests bestanden. Die Tests decken unter anderem die Zeitzone Europe/Berlin, beide Sommerzeitwechsel, Rückfahrten, neun Fahrgäste und verlustfreie WhatsApp-URL-Codierung ab.

## Lighthouse: finale mobile Messung

Gemessen am 24.10.2026 gegen den statischen Produktionsbuild, ohne parallele Browserlast:

| Kategorie | Punkte |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 69 |

FCP 0,8 s; LCP 1,8 s; Total Blocking Time 40 ms; Cumulative Layout Shift 0. Das sind lokale Labormessungen, keine Garantie für jedes Endgerät oder Produktionshosting.

Der einzige fehlgeschlagene SEO-Test ist die bewusst deaktivierte Indexierung der Vorschau (`noindex` und robots.txt). Die endgültige Produktionskonfiguration verwendet nach Vervollständigung der Rechtstexte `NEXT_PUBLIC_LAUNCH_READY=true` und muss neu gebaut werden. Für diesen späteren Zustand wird hier kein ungemessener SEO-Wert behauptet. Cache-Header müssen vom tatsächlichen Hoster ausgeliefert werden.

Maschinenlesbare Ergebnisse liegen in `docs/reports/`. Die lokale Vorschau lieferte keine eigenen Sicherheitsheader; Hostkonfigurationen sind vorbereitet, die endgültige Domain wurde nicht geändert.
