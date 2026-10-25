# Prüfbericht – Redesign vom 24. Oktober 2026

Geprüft mit lokalem Next.js-Produktionsbuild und systemseitigem Chromium. Veraltete Berichte wurden entfernt. Die enthaltenen Berichte dokumentieren das aktuelle Redesign und die ergänzten Leistungsseiten.

## Umsetzung

- Startseite mit „Ihr Ziel. Unser Weg.“, goldenen Wellen und kurzen, endlichen Animationen. `prefers-reduced-motion` schaltet Bewegung ab.
- Original-Logo unverändert in Header, Footer und Favicon. SHA-256: `db271bb1d02cd3284f767ed9520b1c0160fa5b4e7a84ae948a8cb7ba8b086742`.
- Fuhrpark nach Betreiberangaben: SUV bis 6 und Großraumtaxi bis 8 Fahrgäste.
- Alle Fahrtformulare mit direkt sichtbaren Feldern; keine Zusatzangaben-Klappe, kein mehrstufiger Assistent. Telefon nur für E-Mail erforderlich.
- Schmale Ansichten mit untereinander angeordneten Feldern, begrenzter Breite für native Datum-/Uhrzeitfelder, deckendem Header und Kontaktleiste mit Safe-Area-Abstand.
- Externe Nachrichtenprogramme öffnen separat; Formulareingaben und E-Mail-Kopiervorlage bleiben auf der Website verfügbar. Keine automatische Buchungsbestätigung oder Zustellbehauptung.

## Automatische Prüfungen

- `npm run build`: erfolgreich, einschließlich TypeScript.
- `npm run lint`: ohne Fehler oder Warnungen.
- `npm run format:check`: erfolgreich.
- `npm test`: 13 Tests bestanden, darunter vollständige Nachrichten, Pflichtfelder, E-Mail-Telefonnummer, 1–8 Personen und Berliner Sommer-/Winterzeit.
- `npm run test:browser`: 54 Seiten-/Breitenkombinationen erfolgreich (alle neun Seiten bei 320, 375, 390, 430, 768 und 1440 CSS-Pixeln).
- Keine horizontalen Seitenüberläufe, keine überstehenden Datum-/Uhrzeitfelder und keine automatisierten axe-core-Befunde mit WCAG-2-A/AA-, 2.1-AA- und 2.2-AA-Tags.
- Acht Browserabläufe erfolgreich: Startseite/Fuhrpark, die drei Formularvarianten mit WhatsApp und E-Mail, Tastaturmenü, reduzierte Bewegung/Reflow, Tarif/Datenschutzeinstellungen sowie Kontakt ohne JavaScript.
- Keine JavaScript-Laufzeitfehler, fehlgeschlagenen Ressourcen oder externen Netzwerkaufrufe beim regulären Seitenbesuch.
- Abschließende Sichtkontrolle bei 320, 390 und 1440 Pixeln; insbesondere goldene Dekoration, lesbare Formulare und feste Kontaktleiste.

Maschinenlesbarer Bericht: [mobile-redesign-browser.json](reports/mobile-redesign-browser.json).

## Lighthouse

Lokale mobile Lighthouse-Simulation am 24.10.2026, ohne parallele Browserprüfungen: **Performance 97**, **Accessibility 100**, **Best Practices 100**, **SEO 69**. Der SEO-Abzug entsteht durch die bereits vorhandene Indexierungssperre (`noindex` und robots.txt); sie wurde für dieses Redesign nicht verändert. Das sind lokale Laborwerte, keine Messung der öffentlichen Vercel-Website oder eines realen Mobilfunknetzes. Zusammenfassung: [mobile-redesign-lighthouse.json](reports/mobile-redesign-lighthouse.json).

## Grenzen

Ein echtes iPhone und WebKit standen hier nicht zur Verfügung. Die Safari-Korrektur basiert auf begrenzten nativen Feldbreiten, `min-width: 0`, einspaltigen Mobilformularen und 16-Pixel-Eingabetext; eine reale iPhone-Safari-Prüfung wird damit nicht behauptet. Die 200-Prozent-Reflowprüfung verwendet einen 640-Pixel-CSS-Viewport als Entsprechung zu 1280 Pixeln bei 200 Prozent Browserzoom. Automatisierte Prüfungen ersetzen keine vollständige Prüfung mit assistiven Technologien.

WhatsApp- und E-Mail-Aufrufe werden im Test abgefangen. Es wurden keine echten Nachrichten gesendet. Google-Funktionen sind ohne reale API-Schlüssel nicht live geprüft. Bereits vorhandene offene Betreiber-/Rechtsangaben bleiben in [OFFENE-PUNKTE.md](OFFENE-PUNKTE.md) dokumentiert.

## Wiederholen

```sh
npm ci
npm run build
npm run lint
npm run format:check
npm test
npm start
```

In einem zweiten Terminal `npm run test:browser` ausführen. Screenshots liegen danach im ignorierten Ordner `work/redesign/`; der Browserbericht wird zusätzlich nach `docs/reports/mobile-redesign-browser.json` geschrieben. Bei Bedarf `CHROMIUM_PATH` auf den lokalen Browser setzen.

## Ergänzung: eigene Leistungsseiten

Die sechs Leistungskarten verlinken auf eigene Detailseiten mit direkt eingebundenen Formularen. Neu sind `/taxifahrten`, `/geschaeftsfahrten`, `/kinderfahrten` und `/kurierfahrten`; Krankenfahrten und Flughafentransfer verwenden ihre vorhandenen Detailseiten. Der Fahrttyp wird jeweils vorbelegt. Bei Kurierfahrten entfallen Personenzahl und deren Übertragung; beim Wechsel zu einer Personenfahrt wird das Feld wieder eingeblendet.

Produktionsbuild, ESLint, Formatprüfung und alle **14 fachlichen Tests** erfolgreich. Zusätzlich wurden **18 Leistungsseiten-/Breitenkombinationen** (alle sechs Seiten bei 320, 390 und 1440 Pixeln) über echte Klicks auf die Leistungskarten geprüft: richtige Zielseite und Formularvorgabe, Canonical-URL, kein horizontaler Überlauf, keine automatisierten axe-Befunde. Für alle sechs Leistungen wurden WhatsApp- und E-Mail-Nachrichten, Pflichtfelder und die E-Mail-Kopiervorlage geprüft, ohne Nachrichten zu versenden. Keine JavaScript-Laufzeitfehler. Sitemap enthält alle Leistungsseiten.

Bericht: [service-pages-browser.json](reports/service-pages-browser.json). Wiederholen mit `node tests/service-pages-qa.mjs` bei laufendem Produktionsserver; optional `QA_BASE_URL` setzen. Die oben genannten Grenzen zu echtem iPhone/Safari gelten weiterhin. Frühere Lighthouse-Werte wurden für diese Inhaltsergänzung nicht neu gemessen.
