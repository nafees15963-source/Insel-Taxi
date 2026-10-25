# Analyse und Quellen

Prüfdatum: **21.10.2026**. Die bestehende Website wurde über den Web-Connector gelesen. Das Repository `/workspace/Insel-Taxi` enthielt zu Beginn nur Git-Metadaten und keinen Anwendungscode. Es wurden keine bestehenden Dateien ersetzt.

| Quelle | Erfasste Informationen | Umgang im Relaunch |
| --- | --- | --- |
| https://inseltaxi-ratzeburg.de/ | Name, Telefon, E-Mail, 24-Stunden-Erreichbarkeit, sechs Leistungsarten, Inhaber und Anschrift im Footer | Kontaktdaten und sachliche Leistungsarten übernommen, Werbeaussagen zurückhaltend formuliert |
| https://inseltaxi-ratzeburg.de/kontakt.html | Telefon 04541 802080, WhatsApp 0173 9189239, Anschrift Zittschower Weg 11a, Link zu Google-Bewertung | Zentrale Konfiguration; direkter Google-Link ließ sich nicht zuverlässig auflösen |
| https://inseltaxi-ratzeburg.de/impressum.html | Naeem Ahmed, Zittschower Weg 11a, USt-ID DE221613879, IK 600138210, benannte Genehmigungsbehörde | Als übernommene und noch zu bestätigende Betreiberangaben dokumentiert; Bankverbindung und Steuernummer nicht unnötig veröffentlicht |
| https://inseltaxi-ratzeburg.de/datenschutz.html | Abweichende Schreibweisen von Inhaber und Anschrift, Beschreibung alter Datenverarbeitung | Widerspruch dokumentiert. Kein ungeprüftes Kopieren als gültiger neuer Rechtstext |
| https://inseltaxi-ratzeburg.de/leistungen.html | Taxi bis 4 Personen, Krankenfahrten, Geschäftskunden, Kinder-/Kurierfahrten; HAM/LBC, HAJ/BER auf Anfrage | Keine zusätzlichen Flughafenzusagen; keine automatische Flugüberwachung behauptet |
| https://inseltaxi-ratzeburg.de/tarife.html | Alte Seite nennt Kreisverordnung von 2024 | Historische Werte nicht als aktueller Tarif aktiviert |
| https://www.kreis-rz.de/bekanntmachungen | Bekanntmachung vom 30.09.2026 einer Taxi-Verordnung ab 01.10.2026 | Aktueller Tarif muss anhand der neuen Verordnung bestätigt werden |
| https://www.kreis-rz.de/media/custom/3150_3602_1.PDF?1790787863= | Verlinktes PDF der Verordnung | Abruf über Web-Connector lieferte 404; aktuelle Tarifwerte dadurch nicht vollständig prüfbar |

Die Telefonnummern und das aktuelle Impressum stimmen mit der Kontaktseite überein. Der ältere Datenschutztext enthält dagegen abweichende Inhaber-/Adressschreibweisen. Diese Abweichung wird nicht durch erfundene Daten aufgelöst, sondern dem Betreiber zur Bestätigung vorgelegt.

## Bewusst nicht übernommen

- Alte Tarifbeträge ohne Prüfung der neuen Verordnung
- Widersprüchliche Aussagen zur Kartenzahlung zwischen einzelnen Altseiten
- Ungeprüfte Versprechen zur Kostenübernahme oder Vorauszahlungsfreiheit bei Krankenfahrten
- Behauptungen einer automatischen Flugüberwachung
- Fremde Kundenbewertungen, Namen oder Sterne aus Verzeichnissen
- Veraltete Rechtstextbausteine und Aussagen über die alte Formularspeicherung
- Beliebige Fahrzeugfotos oder ein nachgebautes Logo

## Logo

Der Nutzer stellte eine sichtbare gelb-schwarze Logoabbildung im Chat bereit. In den verfügbaren Workspace-Verzeichnissen und Dateianhängen war keine abrufbare Originaldatei vorhanden. Die Anwendung bereitet die Einbindung unter `public/logo-original.png` vor. Bis die Datei vorliegt, bleibt ein ausdrücklich neutraler Platzhalter sichtbar. Es wurde kein Logo generiert oder nachgezeichnet.

## Aktualisierung nach Betreiberangaben vom 21.10.2026

Der Betreiber bestätigt regionale und bundesweite Fahrten, auch Krankenfahrten, Geschäfts- und längere Reisefahrten; Ausland auf Anfrage. Keine Flottengröße oder Kapazitätsversprechen daraus abgeleitet.

Die als `3150_3602_1.pdf` hochgeladene Verordnung vom 25.09.2026 wurde vollständig als Text ausgewertet (3 Seiten). § 1 begrenzt den Tarif auf das Kreisgebiet und regelt die vorherige Preisvereinbarung für andere Ziele. § 2 enthält Grundpreis 5,50 €, Tagestufen 2,90/2,70 €/km, Nacht-/Sonn-/Feiertagsstufen 3,20/2,90 €/km (Staffelgrenze 3 km), Wartezeit 50 €/h, 0,10-€-Fortschaltungen und 12 € Großraumzuschlag unter den dortigen Voraussetzungen. § 2 Abs. 4 regelt eine gegebenenfalls kostenpflichtige Anfahrt, § 4 besondere Ausstattung, § 5 Gepäck. Inkrafttreten laut § 9: 01.10.2026.

Diese neue bereitgestellte Primärquelle löst den früheren Abrufblocker ab. PDF: `public/tarife/kreisverordnung-2026-10-01.pdf`.

## Original-Logo nachgereicht

Am 22.10.2026 wurde das vom Betreiber auf GitHub hochgeladene `public/logo-original.png` übernommen (PNG, 1254 × 1254 Pixel). Die Datei bleibt unverändert; Next.js liefert passende Darstellungsgrößen aus. Der frühere Aktivierungsschalter wurde entfernt.

## Design- und Formularauftrag vom 24.10.2026

Neue Betreiberangaben: SUV bis 6 Fahrgäste, Großraumtaxi bis 8 Fahrgäste. Die bereitgestellten mobilen Screenshots zeigen eine überlange Überschrift, überlaufende native Datums-/Zeitfelder und versteckte Zusatzangaben. Die aktuelle Überarbeitung behebt diese Punkte, beschränkt die Überschrift auf „Ihr Ziel. Unser Weg.“ und vereinfacht alle Fahrtanfragen. Die zusätzlich gezeigten goldenen Wellenbilder dienen als gestalterische Referenz. Das Original-Logo bleibt unverändert.

Die ergänzten Detailseiten für Taxi-, Geschäfts-, Kinder- und Kurierfahrten erläutern die bereits aufgeführten Leistungen. Ihre Inhalte bleiben bei den vorhandenen Unternehmensangaben; Transportbedingungen, Sitzlösungen, wiederkehrende Fahrten und Rechnungswünsche werden persönlich abgestimmt. Keine zusätzlichen Leistungs- oder Liefergarantien wurden ergänzt.
