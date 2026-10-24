# Noch zu ergänzen und zu bestätigen

## Vor dem öffentlichen Start

1. **Betreiberangaben:** Name, Anschrift, Rechtsform, USt-ID, IK, zuständige Behörde und Erklärung zur Verbraucherschlichtung bestätigen. Etwaige Registereintragung, Registernummer und Wirtschafts-Identifikationsnummer ergänzen, soweit vorhanden beziehungsweise rechtlich erforderlich. Alt-Datenschutz und Impressum verwenden teils abweichende Schreibweisen.
2. **Produktionshosting:** Anbieter mit Anschrift, Verarbeitungsort, tatsächlich erhobene Serverlogs und deren Löschfrist in der Datenschutzerklärung eintragen. Auftragsverarbeitungsvereinbarung und gegebenenfalls internationale Übermittlungsgrundlagen prüfen. Eine private Entwicklungsvorschau ersetzt diese Festlegung nicht.
3. **Betrieblicher Datenschutz:** E-Mail-Anbieter, WhatsApp-Variante und Einstellungen zu Adressbuch/Backups sowie Löschfristen der Anfragen dokumentieren. Keine Diagnosen oder Versicherungsunterlagen über die Website anfordern. Umgang mit erforderlichen Krankenfahrtdaten gesondert festlegen.
4. **Rechtliche Prüfung:** Impressum und Datenschutzerklärung fachkundig anhand des tatsächlichen Betriebs prüfen. Die Arbeitsfassung enthält sichtbare Hinweise auf fehlende Angaben. Diese erst nach Vervollständigung entfernen.
5. **Domain:** Produktionsdomain/HTTPS und Hosting konfigurieren. `NEXT_PUBLIC_SITE_URL` abgleichen. `NEXT_PUBLIC_LAUNCH_READY=true` erst nach inhaltlicher und rechtlicher Freigabe setzen und neu bauen.

## Optionale Google-Adressvorschläge

- Ohne API-Key funktionieren alle Formulare mit manuellen Adressen.
- Für Adressvorschläge einen Browser-Key für Google Maps JavaScript/Places eintragen, auf Produktionsdomains und erforderliche APIs beschränken, Kostenlimit/Quoten setzen und die tatsächlichen Google-Verträge prüfen.
- Nach der Einrichtung das aktive Einwilligungsverhalten und die Rückkehr zur manuellen Eingabe prüfen.
- Keine Google Routes API oder serverseitige Schlüssel erforderlich, da der Preisrechner bewusst entfällt.
- Google-Unternehmenslink ist anhand der bisherigen Kontaktseite verifiziert; keine Bewertungssumme veröffentlicht.

## Betrieblich sinnvoll zu bestätigen

- Aktuelle Erreichbarkeit und Kontaktwege sowie Flottenverfügbarkeit.
- Kapazität des 9-Sitzers einschließlich Fahrer und Organisation von Anfragen für neun Reisende.
- Verfügbarkeit von Kindersitzen, Platz für Gepäck und Hilfsmittel sowie konkrete Abholunterstützung.
- Bedingungen einer Direktabrechnung mit Krankenkassen; keine pauschale Übernahme zusagen.
- Aktuelle Zahlungsmöglichkeiten; Altseiten widersprechen sich bei Kartenzahlung.

## Bereits erledigt

- Original-Logo aus dem vorhandenen Repository mit Anhang abgeglichen und erhalten.
- Nutzer-PDF der Tarifverordnung ausgewertet und eingebunden; Tarifwerte zentral dokumentiert.
- Kontaktdaten, Leistungen, Flughafenangaben und echter Google-Bewertungslink recherchiert.
- Keine Datenbank, Registrierung, Onlinezahlung, Analyse-Tracker oder WhatsApp Business API für die Website erforderlich.
