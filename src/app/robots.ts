import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // 본인의 도메인으로 변경 필수!
    sitemap: 'https://https://sh-380.vercel.app/sitemap.xml',
  };
}