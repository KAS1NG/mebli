import type { MetadataRoute } from 'next'
import { fetchAll } from './api/post/postService';
import { transliterateAndClear } from './utils/clearUrlString';

const BASE_URL = "https://mebliromny.com.ua";

function formatDate(date: string | Date | null | undefined) {
  const parsedDate = date ? new Date(date) : null;
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
    ? parsedDate.toISOString()
    : new Date().toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchAll();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${transliterateAndClear(product.title)}/${product.id}`,
    lastModified: formatDate(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
