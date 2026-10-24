import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config/company';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['', 'leistungen/', 'fahrt-anfragen/', 'krankenfahrten/', 'flughafentransfer/', 'fahrpreis/', 'kontakt/', 'impressum/', 'datenschutz/'].map((path) => ({ url: `${siteUrl}/${path}`, changeFrequency: 'monthly', priority: path ? 0.7 : 1 })); }
