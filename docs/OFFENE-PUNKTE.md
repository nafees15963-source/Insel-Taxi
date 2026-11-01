# Vor öffentlichem Start zu klären

## Erforderlich

- **Bestätigte Unternehmensdaten (01.11.2026)**: Insel Taxi, Inhaber Naeem Ahmed, Zittschower Weg 11a, 23909 Ratzeburg; IK 600138210, Steuernummer 27 001 02189 und USt-ID DE221613879. Diese Angaben sind im Impressum enthalten. Die aktuelle Anschrift des zuständigen Fachdienstes Straßenverkehr wurde auf der Kreiswebsite geprüft.
- **Rechtstexte**: Die öffentlichen Seiten enthalten keine Entwurfs- oder Ausfüllplatzhalter mehr. Die Datenschutzerklärung beschreibt Vercel, die tatsächlich implementierten Formulare und optionalen Google-Dienste. Sie ist nicht anwaltlich geprüft. Nicht belegte Tatsachen (etwa ein abgeschlossener AV-Vertrag, konkrete Provider-Logfristen, Registereintrag oder Teilnahme an Verbraucherschlichtung) wurden nicht erfunden. Tatsächliche Provider-Verträge, betriebliche Löschabläufe und gegebenenfalls einschlägige VSBG-Pflichten müssen im Betrieb erfüllt werden. Bei einem Hostingwechsel den Text aktualisieren.
- **Hauptdomain**: Die aktuelle Website nutzt das vorhandene Vercel-Projekt unter insel-taxi.vercel.app. Für die eigene Hauptdomain gegebenenfalls DNS zuordnen und `NEXT_PUBLIC_SITE_URL` setzen. DNS-Einträge wurden hier nicht geändert.

## Für die optionalen Zusatzfunktionen

- **Google Maps/Places Browser-Key** und **Google Routes Server-Key**: getrennt erstellen und einschränken. Ohne Keys bleibt die Website nutzbar.
- **Google-Unternehmensprofil**: echten Profil-/Bewertungslink bestätigen. Kein beliebiger Suchlink und kein erfundener Place-ID-Wert verwendet.

## Sinnvoll zu bestätigen

- Aktualität der 24-Stunden-Erreichbarkeit und beider Kontaktwege
- Verfügbarkeit des passenden Fahrzeugs und Gepäckkapazität für die konkrete Fahrt abstimmen
- Verfügbare Kindersitze und Transport von Hilfsmitteln
- Konkrete Bedingungen für Direktabrechnung mit Krankenkassen
- Aktuell angebotene Zahlungsmethoden (Altseiten widersprechen sich zur Kartenzahlung)
- Flughafenziele und Bedingungen für Hin-/Rückfahrten

## Bewusst ohne Zusatzaufwand

Keine MySQL-Datenbank, Registrierung, Onlinezahlung, WhatsApp Business API oder Kundenverwaltung erforderlich. Keine externen Inhalte ohne aktive Freigabe; Schriftdateien werden lokal bereitgestellt.

## Erledigte Aktualisierung

Tarifverordnung vom 25.09.2026 als Betreiber-PDF erhalten und ausgewertet. Tag-/Nachttarife ab 01.10.2026 sind konfiguriert; Geltungsbereich, Anfahrt und mögliche Zusatzkosten sind ausdrücklich erklärt. Der Betreiber bestätigt regionale und bundesweite Fahrten einschließlich Krankenfahrten; Auslandsfahrten auf Anfrage. E-Mail ist in allen Fahrtformularen als gleichwertiger Anfrageweg ergänzt.

Original-Logo ist inzwischen unter `public/logo-original.png` vorhanden und ohne Aktivierungsschalter in Header, Footer und Favicon eingebunden.

## Betreiberangaben und mobile Überarbeitung vom 24.10.2026

Der Betreiber nennt SUV bis zu 6 Fahrgästen und Großraumtaxi bis zu 8 Fahrgästen. Diese Angaben sind im Fuhrpark und der Personenauswahl berücksichtigt. Fahrtformulare enthalten Name, Fahrttyp, Start, Ziel, Datum, Uhrzeit, Personen und eine optionale Anmerkung. Nur bei E-Mail-Anfragen wird zusätzlich eine Telefonnummer für Rückfragen benötigt. Alle Felder sind unmittelbar sichtbar; keine Zusatzangaben-Klappe und kein mehrstufiger Assistent.

Alle sechs Leistungen haben nun eigene Detailseiten mit Formular. Kurierfahrten fragen keine Personenzahl ab; die Sendung wird in der Anmerkung beschrieben. Der jeweilige Fahrttyp ist vorausgewählt.
