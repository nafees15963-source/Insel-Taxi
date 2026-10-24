import type { MetadataRoute } from 'next';
import { siteUrl, launchReady } from '@/config/company';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: launchReady ? '/' : undefined, disallow: launchReady ? undefined : '/' }, sitemap: `${siteUrl}/sitemap.xml` }; }
