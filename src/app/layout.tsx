import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const manrope = localFont({ src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', display: 'swap', weight: '200 800', variable: '--font-manrope' });
import { Header, Footer, ContactDock } from '@/components/shell';
import { company, siteUrl, launchReady } from '@/config/company';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Insel Taxi Ratzeburg – Ihr Taxi. Persönlich. Rund um die Uhr.', template: '%s | Insel Taxi Ratzeburg' },
  description: 'Taxi in Ratzeburg einfach per WhatsApp oder Telefon anfragen. Krankenfahrten, Flughafentransfer und Großraumtaxi. Täglich rund um die Uhr: 04541 802080.',
  robots: { index: launchReady, follow: launchReady },
  openGraph: { locale: 'de_DE', type: 'website', siteName: company.name, images: [{ url: '/social-card.png', width: 1200, height: 630, alt: 'Insel Taxi Ratzeburg – Hier zu Hause. Für Sie unterwegs.' }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: [{ url: '/favicon.png', type: 'image/png', sizes: '64x64' }], apple: '/apple-touch-icon.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#14263d' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'TaxiService', name: company.name, url: siteUrl, logo: `${siteUrl}/logo-original.png`, telephone: company.phone, email: company.email, areaServed: { '@type': 'City', name: 'Ratzeburg' }, provider: { '@type': 'LocalBusiness', name: company.name, telephone: company.phone, address: { '@type': 'PostalAddress', streetAddress: company.street, postalCode: company.postalCode, addressLocality: company.city, addressCountry: 'DE' }, openingHours: 'Mo-Su 00:00-23:59' } };
  return <html lang="de"><body className={manrope.variable}><a href="#main" className="skip-link">Zum Inhalt springen</a><Header/><main id="main" tabIndex={-1}><noscript><style>{'.ride-form,.menu-toggle{display:none!important}'}</style><div className="container notice">Ihre Fahrt können Sie direkt telefonisch anfragen: <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>. Alle Seiten erreichen Sie auch über die Links unten auf der Website.</div></noscript>{children}</main><Footer/><ContactDock/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/></body></html>;
}
