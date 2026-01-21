import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts'; // 👈 '@/lib/posts' 또는 '../lib/posts' (경로 에러나면 수정)

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sh-380.vercel.app'; 

  // 블로그 글 데이터 가져오기
  const posts = getSortedPostsData();
  
  // 동적 URL 생성 (블로그 글들)
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date), // post.date 형식이 'YYYY-MM-DD'여야 안전함
    changeFrequency: 'weekly' as const, // 구글 봇에게 힌트 주기
    priority: 0.7,
  }));

  // 정적 페이지 + 동적 페이지 합치기
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`, // 블로그 목록 페이지도 추가
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postUrls,
  ];
}