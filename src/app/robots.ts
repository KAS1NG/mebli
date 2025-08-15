import type { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin',      // блокує /admin
          '/admin/*',    // блокує все, що під /admin/
        ],
      },
    ],
    sitemap: 'https://mebliromny.com.ua/sitemap.xml',
  };
}
