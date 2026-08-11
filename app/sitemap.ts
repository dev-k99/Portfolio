import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { SITE_URL } from '@/lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
