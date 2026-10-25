import type { RideType } from '@/lib/booking';

export type ServicePageContent = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  rideType: RideType;
  formTitle: string;
  formHint: string;
  sections: { title: string; text: string; items?: string[] }[];
  questions: { question: string; answer: string }[];
};

export const servicePages = {
  taxifahrten: {
    title: 'Taxi & Alltagsfahrten in Ratzeburg',
    description:
      'Taxi für Alltag, Termine und längere Strecken in Ratzeburg anfragen. Informationen zum Fuhrpark und eigenes Formular für WhatsApp oder E-Mail.',
    eyebrow: 'Taxi & Alltagsfahrten',
    heading: 'Ihr Alltag. Ihr Ziel. Ihre Taxifahrt.',
    intro:
      'Zum Einkauf, zum Bahnhof, zu Freunden oder zu einem wichtigen Termin: Fragen Sie Ihre Fahrt in Ratzeburg und Umgebung direkt bei uns an. Auch längere Strecken fahren wir nach persönlicher Abstimmung.',
    rideType: 'Taxifahrt',
    formTitle: 'Taxifahrt anfragen',
    formHint:
      'Geben Sie Ihre Abholadresse und die gewünschte Abholzeit an. Besondere Wünsche ergänzen Sie einfach in der Anmerkung.',
    sections: [
      {
        title: 'Für die täglichen Wege und größere Vorhaben',
        text: 'Eine kurze Strecke in der Stadt oder eine Fahrt quer durch Deutschland: Wir stimmen Abholung, Ziel und Verfügbarkeit mit Ihnen ab. Fahrten ins Ausland sind auf Anfrage möglich.',
        items: [
          'Einkäufe, Besuche und private Termine',
          'Fahrten zum oder vom Bahnhof',
          'Längere private Fahrten – regional und bundesweit',
          'Eine Rückfahrt können Sie gleich mit anfragen',
        ],
      },
      {
        title: 'Das passende Fahrzeug für Ihre Fahrt',
        text: 'Unser SUV bietet bis zu 6 Fahrgästen Platz, das Großraumtaxi bis zu 8. Nennen Sie die Personenzahl und teilen Sie uns größeres Gepäck, einen benötigten Kindersitz oder Hilfsmittel vorab mit. Wir klären, welches Fahrzeug für Ihre Fahrt verfügbar und geeignet ist.',
      },
      {
        title: 'Abholort und Fahrpreis persönlich klären',
        text: 'Eine vollständige Adresse mit Hausnummer hilft uns bei der Abholung. Bei Bahnhöfen oder größeren Gebäuden können Sie einen Treffpunkt in der Anmerkung ergänzen. Fragen zum Fahrpreis besprechen wir anhand Ihrer Strecke; die Tarifinformationen finden Sie auf unserer Fahrpreisseite.',
      },
    ],
    questions: [
      {
        question: 'Kann ich auch kurzfristig ein Taxi anfragen?',
        answer:
          'Ja. Wenn Sie möglichst bald losfahren möchten, rufen Sie bitte direkt an. Wir besprechen die aktuelle Verfügbarkeit mit Ihnen.',
      },
      {
        question: 'Wie frage ich eine Hin- und Rückfahrt an?',
        answer:
          'Tragen Sie die erste Fahrt in das Formular ein. Die gewünschte Rückfahrt mit Datum, Uhrzeit und Abholort können Sie in der Anmerkung ergänzen.',
      },
    ],
  },
  geschaeftsfahrten: {
    title: 'Geschäftsfahrten in Ratzeburg – regional & bundesweit',
    description:
      'Geschäftsfahrten für Mitarbeitende, Geschäftsreisende und Gäste persönlich abstimmen. Eigene Leistungsseite mit Anfrageformular für Insel Taxi Ratzeburg.',
    eyebrow: 'Geschäftsfahrten',
    heading: 'Der nächste Termin beginnt mit einem guten Weg.',
    intro:
      'Ob Kundentermin, Besuch im Unternehmen oder längere Geschäftsreise: Wir fahren Geschäftsreisende, Mitarbeitende und Gäste regional und bundesweit. Die Einzelheiten vereinbaren Sie direkt mit uns.',
    rideType: 'Geschäftsfahrt',
    formTitle: 'Geschäftsfahrt anfragen',
    formHint:
      'Tragen Sie die gewünschte Fahrt ein. Firma, Treffpunkt und Wünsche zur Rechnung können Sie in der Anmerkung ergänzen.',
    sections: [
      {
        title: 'Unterwegs für Ihr Unternehmen',
        text: 'Fragen Sie eine einzelne Fahrt oder Ihren konkreten Reisebedarf an. Abholort, Zeit und Ziel stimmen wir vorab persönlich ab.',
        items: [
          'Fahrten zu Kunden und Geschäftsterminen',
          'Abholung von Gästen und Mitarbeitenden',
          'Verbindungen zwischen Bahnhof, Hotel und Unternehmen',
          'Längere Geschäftsreisen innerhalb Deutschlands',
        ],
      },
      {
        title: 'Allein oder gemeinsam zum Termin',
        text: 'Für mehrere Mitreisende stehen ein SUV mit bis zu 6 und ein Großraumtaxi mit bis zu 8 Fahrgastplätzen zur Anfrage bereit. Bitte nennen Sie die Personenzahl sowie größeres Gepäck, damit wir die Fahrzeugwahl mit Ihnen abstimmen können.',
      },
      {
        title: 'Rechnung und wiederkehrende Fahrten',
        text: 'Eine Rechnung ist nach Vereinbarung möglich. Teilen Sie uns Ihren Rechnungswunsch und die Firma bei der Anfrage mit. Wenn Sie regelmäßig Fahrten benötigen, besprechen wir Termine, Umfang und Abrechnung persönlich. Ein Firmenkonto oder eine Registrierung auf der Website ist dafür nicht erforderlich.',
      },
    ],
    questions: [
      {
        question: 'Kann ich für einen Gast oder Mitarbeitenden anfragen?',
        answer:
          'Ja. Geben Sie Ihren Namen als anfragende Person an und beschreiben Sie den Treffpunkt in der Anmerkung. Weitere Angaben zur Abholung stimmen wir direkt mit Ihnen ab.',
      },
      {
        question: 'Kann ich mehrere Termine oder eine Rückfahrt anfragen?',
        answer:
          'Ja. Ergänzen Sie die gewünschten weiteren Fahrten in der Anmerkung oder besprechen Sie Ihren Ablauf telefonisch mit uns. Jede Fahrt wird persönlich bestätigt.',
      },
    ],
  },
  kinderfahrten: {
    title: 'Kinderfahrten in Ratzeburg – persönlich abstimmen',
    description:
      'Kinderfahrten zu Schule, Sport und Terminen in Ratzeburg anfragen. Kindersitz, Abholung und Übergabe vorab besprechen. Mit eigenem Anfrageformular.',
    eyebrow: 'Kinderfahrten',
    heading: 'Die Wege Ihrer Familie. Gemeinsam geplant.',
    intro:
      'Zur Schule, zum Sport oder zu einem Termin: Eltern und Erziehungsberechtigte können Kinderfahrten bei uns anfragen. Abholung, passende Sitzmöglichkeiten und Übergabe besprechen wir vor der Fahrt persönlich.',
    rideType: 'Kinderfahrt',
    formTitle: 'Kinderfahrt anfragen',
    formHint:
      'Bitte geben Sie den Namen der anfragenden erwachsenen Person an. Einen benötigten Kindersitz oder eine Begleitperson können Sie in der Anmerkung nennen.',
    sections: [
      {
        title: 'Fahrten passend zu Ihrem Familienalltag',
        text: 'Nennen Sie uns die gewünschte Strecke und Zeit. Wir klären mit Ihnen, ob und wie die Fahrt möglich ist.',
        items: [
          'Fahrten zur Schule',
          'Fahrten zum Sport und zu Freizeitaktivitäten',
          'Fahrten zu vereinbarten Terminen',
          'Wiederkehrende Fahrten nach persönlicher Abstimmung',
        ],
      },
      {
        title: 'Kindersitz bitte vorher abstimmen',
        text: 'Wenn ein Kindersitz benötigt wird, teilen Sie uns das bei der Anfrage mit. Die passende Sitzlösung und deren Verfügbarkeit klären wir anhand von Alter und Größe persönlich mit Ihnen. Zählen Sie Kinder und erwachsene Begleitpersonen bei der Personenzahl mit.',
      },
      {
        title: 'Abholung und Übergabe klar vereinbaren',
        text: 'Besprechen Sie mit uns den genauen Treffpunkt, eine mögliche Begleitung und wer das Kind am Ziel empfängt. Geben Sie im Formular Ihre eigenen Kontaktdaten an. Namen des Kindes oder weitere persönliche Einzelheiten müssen Sie nicht in das Freitextfeld schreiben.',
      },
    ],
    questions: [
      {
        question: 'Kann ich eine regelmäßige Fahrt anfragen?',
        answer:
          'Ja. Nennen Sie die gewünschten Wochentage und Zeiten in der Anmerkung oder rufen Sie uns an. Die Verfügbarkeit und den Ablauf stimmen wir mit Ihnen ab.',
      },
      {
        question: 'Kann ein Kind ohne erwachsene Begleitung mitfahren?',
        answer:
          'Bitte klären Sie das vorab telefonisch mit uns. Wir besprechen die konkrete Fahrt, Abholung und Übergabe, bevor eine Zusage erfolgt.',
      },
    ],
  },
  kurierfahrten: {
    title: 'Kurierfahrten in Ratzeburg – Dokumente & Sendungen',
    description:
      'Kurierfahrt für Dokumente, Pakete oder Waren anfragen. Abholung, Ziel und Sendungsdetails persönlich klären. Eigenes Formular mit WhatsApp und E-Mail.',
    eyebrow: 'Kurierfahrten',
    heading: 'Wenn etwas auf den Weg muss.',
    intro:
      'Dokumente, Pakete oder Waren: Fragen Sie eine Kurierfahrt in Ratzeburg, in der Region oder über eine längere Strecke bei uns an. Wir besprechen, ob Ihre Sendung transportiert werden kann und wie die Übergabe erfolgt.',
    rideType: 'Kurierfahrt',
    formTitle: 'Kurierfahrt anfragen',
    formHint:
      'Start und Ziel sind die Abhol- und Lieferadresse. Beschreiben Sie die Sendung mit Anzahl, ungefähren Maßen und Gewicht in der Anmerkung.',
    sections: [
      {
        title: 'Ihre Sendung und der gewünschte Weg',
        text: 'Teilen Sie uns mit, was abgeholt werden soll und wohin es geht. Die Annahme der Sendung sowie Strecke und Verfügbarkeit stimmen wir persönlich ab.',
        items: [
          'Dokumente und Unterlagen',
          'Pakete und Waren nach Absprache',
          'Abholung und Lieferung in der Region',
          'Längere Strecken nach individueller Vereinbarung',
        ],
      },
      {
        title: 'Diese Angaben helfen bei der Planung',
        text: 'Nennen Sie die Anzahl der Sendungsstücke, ungefähre Maße und das Gewicht. Besondere Anforderungen an den Transport besprechen Sie bitte vorab mit uns. So können wir klären, ob ein passendes Fahrzeug verfügbar ist. Vertrauliche Inhalte von Dokumenten gehören nicht in das Anfrageformular.',
      },
      {
        title: 'Abholung, Übergabe und Preis',
        text: 'Die Uhrzeit im Formular ist Ihre gewünschte Abholzeit. Einen gewünschten Liefertermin können Sie in der Anmerkung ergänzen. Treffpunkte, erreichbare Ansprechpersonen, Übergabe und Preis vereinbaren wir vor dem Transport persönlich. Eine feste Lieferzeit wird durch das Absenden des Formulars noch nicht zugesagt.',
      },
    ],
    questions: [
      {
        question: 'Was mache ich bei einer dringenden Sendung?',
        answer:
          'Rufen Sie uns direkt an und nennen Sie Abholort, Ziel und die gewünschte Zeit. Wir prüfen mit Ihnen die aktuelle Verfügbarkeit.',
      },
      {
        question: 'Kann jede Sendung mitgenommen werden?',
        answer:
          'Ob ein Transport möglich ist, hängt von Art, Größe, Gewicht und Anforderungen der Sendung ab. Bitte stimmen Sie diese Angaben vorab mit uns ab.',
      },
    ],
  },
} satisfies Record<string, ServicePageContent>;
