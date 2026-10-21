import { company } from '@/config/company';
export type RideMode = 'ride' | 'medical' | 'airport';
export type Booking = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  wishes: string;
  name: string;
  rideType: string;
  returnTrip: string;
  returnDate: string;
  returnTime: string;
  airport: string;
  direction: string;
  flight: string;
};
export const emptyBooking: Booking = {
  pickup: '',
  destination: '',
  date: '',
  time: '',
  passengers: '1',
  luggage: '',
  wishes: '',
  name: '',
  rideType: 'Arzt- oder Kliniktermin',
  returnTrip: 'Nein',
  returnDate: '',
  returnTime: '',
  airport: 'Hamburg (HAM)',
  direction: 'Zum Flughafen',
  flight: '',
};
export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function formatDate(value: string) {
  if (!value) return 'nach Absprache';
  const [y, m, d] = value.split('-');
  return `${d}.${m}.${y}`;
}
export function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function bookingMessage(b: Booking, mode: RideMode = 'ride') {
  const title =
    mode === 'medical'
      ? 'eine Krankenfahrt'
      : mode === 'airport'
        ? 'einen Flughafentransfer'
        : 'eine Fahrt';
  const lines = [
    `Hallo Insel Taxi, ich möchte gerne ${title} anfragen.`,
    '',
    `Abholort: ${b.pickup}`,
    `Zielort: ${b.destination}`,
    `Datum: ${formatDate(b.date)}`,
    `Uhrzeit: ${b.time}`,
    `Personen: ${b.passengers}`,
  ];
  if (mode === 'medical') lines.push(`Art der Fahrt: ${b.rideType}`);
  if (mode === 'airport') lines.push(`Flughafen: ${b.airport}`, `Richtung: ${b.direction}`);
  if (b.luggage) lines.push(`Gepäckstücke: ${b.luggage}`);
  if (b.flight) lines.push(`Flugnummer (Angabe des Fahrgasts): ${b.flight}`);
  if (b.returnTrip === 'Ja')
    lines.push(
      `Rückfahrt: ${b.returnDate ? formatDate(b.returnDate) : 'nach Absprache'}${b.returnTime ? ' um ' + b.returnTime : ''}`,
    );
  if (b.name.trim()) lines.push(`Name: ${b.name.trim()}`);
  if (b.wishes.trim()) lines.push(`Besondere Wünsche: ${b.wishes.trim()}`);
  lines.push('', 'Bitte bestätigen Sie mir die Verfügbarkeit und die Fahrt.');
  return lines.join('\n');
}
export const defaultMessage =
  'Hallo Insel Taxi, ich möchte gerne eine Fahrt anfragen.\n\nAbholort:\nZielort:\nDatum:\nUhrzeit:\nPersonen:\nBesondere Wünsche:\n\nBitte bestätigen Sie mir die Verfügbarkeit und die Fahrt.';
export type Errors = Partial<Record<keyof Booking, string>>;
export function validateBooking(b: Booking, mode: RideMode = 'ride', now = new Date()): Errors {
  const errors: Errors = {};
  if (b.pickup.trim().length < 3)
    errors.pickup = 'Bitte geben Sie eine vollständige Abholadresse ein.';
  if (b.destination.trim().length < 3) errors.destination = 'Bitte geben Sie Ihr Ziel ein.';
  if (!b.date) errors.date = 'Bitte wählen Sie das Datum.';
  if (!b.time) errors.time = 'Bitte wählen Sie die Uhrzeit.';
  if (b.date && b.time) {
    const date = new Date(`${b.date}T${b.time}`);
    if (!Number.isFinite(date.getTime()) || date.getTime() < now.getTime() - 60000)
      errors.date = 'Bitte wählen Sie einen Zeitpunkt in der Zukunft.';
  }
  if (!/^[1-4]$/.test(b.passengers))
    errors.passengers = 'Bitte wählen Sie 1 bis 4 Fahrgäste. Für mehr Personen rufen Sie uns an.';
  if (b.luggage && (!/^\d+$/.test(b.luggage) || Number(b.luggage) > 20))
    errors.luggage = 'Bitte geben Sie 0 bis 20 Gepäckstücke an.';
  if ((mode === 'airport' || mode === 'medical') && b.returnTrip === 'Ja') {
    if (!b.returnDate) errors.returnDate = 'Bitte geben Sie das Rückfahrtdatum an.';
    if (b.returnDate && b.returnDate < b.date)
      errors.returnDate = 'Die Rückfahrt muss nach der Hinfahrt liegen.';
    if (
      b.returnDate &&
      b.returnTime &&
      b.date &&
      b.time &&
      new Date(`${b.returnDate}T${b.returnTime}`) <= new Date(`${b.date}T${b.time}`)
    )
      errors.returnTime = 'Die Rückfahrt muss nach der Hinfahrt liegen.';
  }
  return errors;
}
