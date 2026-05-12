import type { MetadataRoute } from 'next'

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://stareezy-ui.vercel.app'

const DOC_SLUGS = [
  'installation',
  'usage',
  'components',
  'theming',
  'compiler',
  'migration',
  'architecture',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/tokens`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const docRoutes: MetadataRoute.Sitemap = DOC_SLUGS.map((slug) => ({
    url: `${SITE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...docRoutes]
}
