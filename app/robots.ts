import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://characterguesser.app';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/suggestions'] },
    sitemap: `${base}/sitemap.xml`,
  };
}
