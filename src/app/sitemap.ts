
import type { MetadataRoute } from 'next'
import { fetchAll } from './api/post/postService';
import { transliterateAndClear } from './utils/clearUrlString';
const BASE_URL = "https://mebliromny.com.ua"
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Отримуємо всі товари
  const products = await fetchAll();

  // Головна + каталог
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

  // Сторінки товарів
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${transliterateAndClear(product.title)}/${product.id}`,
    lastModified: new Date(product.updatedAt).toISOString() || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}