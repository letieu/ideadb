import type { MetadataRoute } from 'next';
import { getAllProblemSlugs, getAllIdeaSlugs, getAllProductSlugs } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ideadb.shop';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/problems`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ideas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic routes for problems
  const problemSlugs = await getAllProblemSlugs();
  const problemRoutes: MetadataRoute.Sitemap = problemSlugs.map((problem) => ({
    url: `${baseUrl}/problems/${problem.slug}`,
    lastModified: problem.updated_at ? new Date(problem.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic routes for ideas
  const ideaSlugs = await getAllIdeaSlugs();
  const ideaRoutes: MetadataRoute.Sitemap = ideaSlugs.map((idea) => ({
    url: `${baseUrl}/ideas/${idea.slug}`,
    lastModified: idea.updated_at ? new Date(idea.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic routes for products
  const productSlugs = await getAllProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...problemRoutes, ...ideaRoutes, ...productRoutes];
}
