/** Verifiziert anhand der bisherigen Unternehmenswebsite am 21.10.2026. Siehe docs/QUELLEN.md. */
export const company = {
  name: 'Insel Taxi Ratzeburg',
  owner: 'Naeem Ahmed',
  phoneDisplay: '04541 802080',
  phone: '+494541802080',
  whatsapp: '491739189239',
  whatsappDisplay: '0173 9189239',
  email: 'info@inseltaxi-ratzeburg.de',
  street: 'Zittschower Weg 11a',
  city: 'Ratzeburg',
  postalCode: '23909',
  hours: 'Täglich, rund um die Uhr',
  vatId: 'DE221613879',
  institutionId: '600138210',
  reviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '',
};
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
);
export const launchReady = process.env.NEXT_PUBLIC_LAUNCH_READY === 'true';
export const airports = [
  'Hamburg (HAM)',
  'Lübeck (LBC)',
  'Hannover (HAJ) – auf Anfrage',
  'Berlin Brandenburg (BER) – auf Anfrage',
  'Anderer Flughafen – auf Anfrage',
];
export const nav = [
  { href: '/', label: 'Startseite' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/krankenfahrten', label: 'Krankenfahrten' },
  { href: '/flughafentransfer', label: 'Flughafentransfer' },
  { href: '/fahrpreis', label: 'Tarife' },
  { href: '/kontakt', label: 'Kontakt' },
];
