import type { MetadataRoute } from 'next'
import { fetchAll } from './api/post/postService';
import { transliterateAndClear } from './utils/clearUrlString';
import { regions } from './lib/regions';

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
      url: `${BASE_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/delivery`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/return-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${transliterateAndClear(product.title)}/${product.id}`,
    lastModified: formatDate(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // динамічні сторінки для всіх міст
  const cityPages: MetadataRoute.Sitemap = Object.keys(regions).map((city) => ({
    url: `${BASE_URL}/mebli/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...productPages, ...cityPages];
}
