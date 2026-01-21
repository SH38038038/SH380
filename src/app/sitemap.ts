import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts'; // 포스트 데이터 가져오는 함수 경로 확인

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 본인의 도메인으로 변경해주세요!
  const baseUrl = 'https://본인의-배포-도메인.vercel.app'; 

  // 2. 모든 블로그 글 가져오기
  const posts = getSortedPostsData();
  
  // 3. 블로그 글 URL 생성
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
  }));

  // 4. 전체 사이트맵 반환
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