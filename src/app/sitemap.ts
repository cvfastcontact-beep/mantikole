import { MetadataRoute } from 'next';
import { fetchApi } from '../lib/api';

/**
 * Dynamic XML Sitemap generator
 * Combines core static routes with dynamic published articles from database
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantikole.my.id';

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/wisata-komoditas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/surat`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic Article Pages
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetchApi<{ success: boolean; data: any[] }>('/articles', {
      next: { revalidate: 3600 },
    }).catch(() => null);

    if (res && res.success && Array.isArray(res.data)) {
      articleRoutes = res.data.map((art) => ({
        url: `${baseUrl}/berita/${art.slug || art.id}`,
        lastModified: art.updated_at ? new Date(art.updated_at) : new Date(art.created_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.warn('[Sitemap Generation Warning]: Gagal memuat dynamic articles untuk sitemap:', err);
  }

  return [...staticRoutes, ...articleRoutes];
}
