import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sh-380.vercel.app'; 

  const posts = getSortedPostsData();
  
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tag`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}