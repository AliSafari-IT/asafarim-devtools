import type { MetadataRoute } from 'next'
import { PACKAGES } from '@/lib/packages'
import { APPLICATIONS } from '@/lib/applications'
import { SITE_URL } from '@/lib/seo'

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
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookie-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const packageRoutes: MetadataRoute.Sitemap = PACKAGES.map(pkg => ({
    url: `${SITE_URL}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const applicationRoutes: MetadataRoute.Sitemap = APPLICATIONS.map(app => ({
    url: `${SITE_URL}/applications/${app.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...packageRoutes, ...applicationRoutes]
}
