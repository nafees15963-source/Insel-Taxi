export const company = {
  name: 'Insel Taxi Ratzeburg',
  owner: 'Naeem Ahmed',
  phone: '+494541802080',
  phoneDisplay: '04541 802080',
  whatsapp: '491739189239',
  whatsappDisplay: '0173 9189239',
  email: 'info@inseltaxi-ratzeburg.de',
  street: 'Zittschower Weg 11a',
  postalCode: '23909',
  city: 'Ratzeburg',
  vatId: 'DE221613879',
  institutionId: '600138210',
  hours: 'Täglich rund um die Uhr',
  reviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || 'https://g.page/r/CQj2XSd7t1QiEAE/review',
} as const;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://inseltaxi-ratzeburg.de').replace(/\/$/, '');
export const launchReady = process.env.NEXT_PUBLIC_LAUNCH_READY === 'true';
export const airports = ['Hamburg (HAM)', 'Lübeck (LBC)', 'Hannover (HAJ) – auf Anfrage', 'Berlin Brandenburg (BER) – auf Anfrage', 'Anderer Flughafen – auf Anfrage'];
export const navigation = [
  { href: '/leistungen/', label: 'Leistungen' },
  { href: '/krankenfahrten/', label: 'Krankenfahrten' },
  { href: '/flughafentransfer/', label: 'Flughafentransfer' },
  { href: '/fahrpreis/', label: 'Tarife' },
  { href: '/kontakt/', label: 'Kontakt' },
];
