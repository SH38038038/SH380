import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 마크다운 파일들이 있는 경로
const postsDirectory = path.join(process.cwd(), 'src/posts');

// 1. 모든 게시글 목록 가져오기 (블로그 메인용)
export function getSortedPostsData() {
  // 폴더 내의 모든 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    // ".md" 확장자 제거해서 id(slug) 만들기
    const id = fileName.replace(/\.md$/, '');

    // 파일 내용 읽기
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter로 메타데이터 파싱
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data as { title: string; date: string; desc: string; tags: string[]; thumbnail: string },
    };
  });

  // 날짜순 정렬 (최신글이 위로)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 2. 특정 게시글 내용 가져오기 (상세 페이지용)
export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content, // 본문 내용
    ...matterResult.data as { title: string; date: string; desc: string; tags: string[]; thumbnail: string },
  };
}