import type { MetadataRoute } from 'next';
import { OUTLET_CONFIG } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticDate = new Date('2026-11-15T00:00:00.000Z');
  return [
    {
      url: OUTLET_CONFIG.siteUrl,
      lastModified: staticDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${OUTLET_CONFIG.siteUrl}/pesan`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
