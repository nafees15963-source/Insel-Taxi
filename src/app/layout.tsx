import type { Metadata, Viewport } from 'next';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import './globals.css';
import { Header, Footer } from '@/components/shell';
import { MapsProvider } from '@/components/maps';
import { company, launchReady, siteUrl } from '@/config/company';
import { defaultMessage, whatsappLink } from '@/lib/booking';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Insel Taxi Ratzeburg | Taxi per WhatsApp & Telefon',
    template: '%s | Insel Taxi Ratzeburg',
  },
  description:
    'Taxi in Ratzeburg einfach per WhatsApp oder Telefon anfragen. Alltagsfahrten, Krankenfahrten und Flughafentransfers. Telefon 04541 802080.',
  robots: launchReady ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: company.name,
    title: company.name,
    description: 'Ihre Fahrt in Ratzeburg. Einfach per WhatsApp oder Telefon anfragen.',
  },
  icons: company.logoReady
    ? { icon: '/logo-original.png', apple: '/logo-original.png' }
    : { icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#14263D' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: company.name,
    url: siteUrl,
    telephone: company.phone,
    email: company.email,
    areaServed: [
      { '@type': 'City', name: 'Ratzeburg' },
      { '@type': 'AdministrativeArea', name: 'Kreis Herzogtum Lauenburg' },
    ],
    provider: {
      '@type': 'LocalBusiness',
      name: company.name,
      telephone: company.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.street,
        postalCode: company.postalCode,
        addressLocality: company.city,
        addressCountry: 'DE',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
    },
  };
  return (
    <html lang="de">
      <body>
        <MapsProvider>
          <a href="#main" className="skip-link">
            Zum Inhalt springen
          </a>
          <Header />
          <noscript>
            <style>{'.ride-form,.fare-calculator,.menu-toggle{display:none!important}'}</style>
            <div className="container">
              <p className="notice">
                Ihre Fahrt können Sie direkt telefonisch unter{' '}
                <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> oder{' '}
                <a href={whatsappLink(defaultMessage)}>per WhatsApp anfragen</a>.
              </p>
            </div>
          </noscript>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
          />
        </MapsProvider>
      </body>
    </html>
  );
}
