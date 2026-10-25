import { company } from '@/config/company';

export type RideMode = 'ride' | 'medical' | 'airport';
export type RequestChannel = 'whatsapp' | 'email';
export const rideTypes = [
  'Taxifahrt',
  'Krankenfahrt',
  'Flughafentransfer',
  'Geschäftsfahrt',
  'Kinderfahrt',
  'Kurierfahrt',
  'Sonstige Fahrt',
] as const;
export type RideType = (typeof rideTypes)[number];
export type Booking = {
  name: string;
  rideType: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  wishes: string;
  phone: string;
};
export const emptyBooking: Booking = {
  name: '',
  rideType: 'Taxifahrt',
  pickup: '',
  destination: '',
  date: '',
  time: '',
  passengers: '1',
  wishes: '',
  phone: '',
};
export function initialRideType(mode: RideMode) {
  return mode === 'medical'
    ? 'Krankenfahrt'
    : mode === 'airport'
      ? 'Flughafentransfer'
      : 'Taxifahrt';
}
export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function formatDate(value: string) {
  if (!value) return 'nach Absprache';
  const [y, m, d] = value.split('-');
  return `${d}.${m}.${y}`;
}

const berlinDateTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Berlin',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
function berlinParts(date: Date) {
  return Object.fromEntries(
    berlinDateTime.formatToParts(date).map(({ type, value }) => [type, value]),
  );
}
export function localDate(now = new Date()) {
  const parts = berlinParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

/** Resolve the entered Berlin wall time, including both instances when clocks go back. */
function berlinInstants(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const wallTime = Date.UTC(year, month - 1, day, hour, minute);
  return [1, 2]
    .map((offset) => wallTime - offset * 60 * 60 * 1000)
    .filter((instant) => {
      const parts = berlinParts(new Date(instant));
      return (
        `${parts.year}-${parts.month}-${parts.day}` === date &&
        `${parts.hour}:${parts.minute}` === time
      );
    });
}

export function bookingMessage(
  b: Booking,
  mode: RideMode = 'ride',
  channel: RequestChannel = 'whatsapp',
) {
  const lines = [
    'Hallo Insel Taxi, ich möchte gerne eine Fahrt anfragen.',
    '',
    `Name: ${b.name.trim()}`,
    `Fahrttyp: ${b.rideType || initialRideType(mode)}`,
    `Start: ${b.pickup.trim()}`,
    `Ziel: ${b.destination.trim()}`,
    `Datum: ${formatDate(b.date)}`,
    `Uhrzeit: ${b.time} (Ortszeit Deutschland)`,
    ...(b.rideType === 'Kurierfahrt' ? [] : [`Personen: ${b.passengers}`]),
  ];
  if (channel === 'email' && b.phone.trim()) lines.push(`Telefon: ${b.phone.trim()}`);
  if (b.wishes.trim()) lines.push(`Anmerkung: ${b.wishes.trim()}`);
  lines.push('', 'Bitte bestätigen Sie mir die Verfügbarkeit und die Fahrt.');
  return lines.join('\n');
}
export const defaultMessage =
  'Hallo Insel Taxi, ich möchte gerne eine Fahrt anfragen.\n\nName:\nFahrttyp:\nStart:\nZiel:\nDatum:\nUhrzeit:\nPersonen:\nAnmerkung:\n\nBitte bestätigen Sie mir die Verfügbarkeit und die Fahrt.';
export type Errors = Partial<Record<keyof Booking, string>>;
export function validateBooking(
  b: Booking,
  channel: RequestChannel = 'whatsapp',
  now = new Date(),
): Errors {
  const errors: Errors = {};
  if (!b.name.trim()) errors.name = 'Bitte geben Sie Ihren Namen ein.';
  else if (b.name.trim().length > 100) errors.name = 'Bitte verwenden Sie höchstens 100 Zeichen.';
  if (!rideTypes.some((type) => type === b.rideType))
    errors.rideType = 'Bitte wählen Sie den Fahrttyp.';
  if (b.pickup.trim().length < 3 || b.pickup.trim().length > 240)
    errors.pickup = 'Bitte geben Sie einen Start mit 3 bis 240 Zeichen ein.';
  if (b.destination.trim().length < 3 || b.destination.trim().length > 240)
    errors.destination = 'Bitte geben Sie ein Ziel mit 3 bis 240 Zeichen ein.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date)) errors.date = 'Bitte wählen Sie ein gültiges Datum.';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time))
    errors.time = 'Bitte wählen Sie eine gültige Uhrzeit.';
  if (!errors.date && !errors.time) {
    const instants = berlinInstants(b.date, b.time);
    if (!instants.length)
      errors.date = 'Datum oder Uhrzeit ist in Deutschland nicht gültig. Bitte prüfen Sie beides.';
    else if (!instants.some((instant) => instant > now.getTime()))
      errors.date = 'Bitte wählen Sie einen Zeitpunkt in der Zukunft (Ortszeit Deutschland).';
  }
  if (b.rideType !== 'Kurierfahrt' && !/^[1-8]$/.test(b.passengers))
    errors.passengers = 'Bitte wählen Sie 1 bis 8 Personen.';
  if (b.wishes.length > 800) errors.wishes = 'Bitte verwenden Sie höchstens 800 Zeichen.';
  if (channel === 'email') {
    const phone = b.phone.trim();
    if (!phone) errors.phone = 'Bitte geben Sie für die E-Mail-Anfrage Ihre Telefonnummer ein.';
    else if (
      !/^\+?[\d\s()/.-]+$/.test(phone) ||
      phone.replace(/\D/g, '').length < 6 ||
      phone.replace(/\D/g, '').length > 15 ||
      phone.length > 40
    )
      errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
  }
  return errors;
}

/** Öffnet nur einen E-Mail-Entwurf, versendet nichts automatisch. */
export function emailLink(message: string = defaultMessage) {
  return `mailto:${company.email}?subject=${encodeURIComponent('Fahrtanfrage – Insel Taxi')}&body=${encodeURIComponent(message)}`;
}
