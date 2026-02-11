import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/utils/articles';
import { calculators } from '@/lib/calculators/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calckit.us';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Calculator pages (auto from registry)
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic blog article pages
  const articleSlugs = getAllSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...articlePages];
}
