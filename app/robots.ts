import type { MetadataRoute } from 'next';
import { OUTLET_CONFIG } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: `${OUTLET_CONFIG.siteUrl}/sitemap.xml`,
  };
}
