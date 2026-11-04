import type { MetadataRoute } from 'next';
import { SITE_URL, getAllWriteups } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/projects', '/writeups', '/everything-from-scratch', '/learn-cs', '/h1b-data'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const writeups = getAllWriteups().map((post) => ({
    url: `${SITE_URL}/writeups/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly' as const,
    priority: post.slug.includes('/') ? 0.6 : 0.7,
  }));

  return [...pages, ...writeups];
}
