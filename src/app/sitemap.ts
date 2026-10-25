import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/company';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/leistungen',
    '/taxifahrten',
    '/geschaeftsfahrten',
    '/kinderfahrten',
    '/kurierfahrten',
    '/fahrt-anfragen',
    '/fahrpreis',
    '/krankenfahrten',
    '/flughafentransfer',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
