import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bilmem.net';

    // Projede mevcut olan gerçek sayfalar
    const routes = [
        '', // Ana sayfa
        '/wizard',
        '/hakkimizda',
        '/iletisim',
        '/blog',
        '/gizlilik',
        '/cerez-politikasi',
        '/kullanim-sartlari',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/wizard' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/wizard' ? 0.9 : 0.5,
    }));
}
