import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://characterguesser.app';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/new`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/join`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/suggest`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
