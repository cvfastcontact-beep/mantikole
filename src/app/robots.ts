import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for SEO and Answer Engine Optimization (AEO)
 * Allows global search engine crawlers and all premier AI LLM bots (ChatGPT, Perplexity, Claude, Gemini, etc.)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantikole.my.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/_next'],
      },
      // AI Answer Engine Crawlers (AEO Matrix)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'Amazonbot',
          'Bytespider',
          'cohere-ai',
          'Diffbot',
          'CCBot',
        ],
        allow: '/',
        disallow: ['/admin'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
