import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 🔥 중요: 실제 마크다운 파일이 있는 경로와 일치해야 함
const postsDirectory = path.join(process.cwd(), 'src/posts');

// 타입 정의 (선택 사항이지만 추천)
export interface PostData {
  id: string;
  title: string;
  date: string;
  desc?: string;
  tags?: string[];
  thumbnail?: string;
}

// 1. 모든 게시글 목록 가져오기 (블로그 메인 & 사이트맵용)
export function getSortedPostsData(): PostData[] {
  // 폴더가 없으면 빈 배열 반환 (에러 방지)
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; desc: string; tags: string[]; thumbnail: string }),
    };
  });

  // 날짜순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. 특정 게시글 내용 가져오기
export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; desc: string; tags: string[]; thumbnail: string }),
  };
}