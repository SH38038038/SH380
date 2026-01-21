import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts"; 

export default function TagPage() {
  // 1. 모든 게시글에서 태그만 뽑아서 중복 제거하기
  const posts = getSortedPostsData();
  const allTags = posts.flatMap((post) => post.tags || []);
  const uniqueTags = Array.from(new Set(allTags));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 상단 타이틀 영역 */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tags</h1>
        <p className="text-gray-500 text-lg">
          총 <span className="font-semibold text-gray-800">{uniqueTags.length}개</span>의 태그가 있습니다.
        </p>
      </div>

      {/* 태그 리스트 영역 */}
      <div className="flex flex-wrap gap-4 mb-20">
        {uniqueTags.map((tag) => (
          <Link 
            key={tag} 
            // ✨ 핵심 수정: 단순히 '/tag'가 아니라 구체적인 태그 경로로 이동하도록 변경
            // encodeURIComponent를 사용하여 한글이나 특수문자(# 등)도 안전하게 처리
            href={`/tag/${encodeURIComponent(tag)}`}
            className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 text-lg hover:bg-gray-100 hover:border-gray-400 transition-all"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* 하단 안내 문구 */}
      <div className="text-center text-gray-500 mt-20">
        <p>궁금한 주제의 태그를 클릭하시면 관련된 글들을 모아볼 수 있습니다.</p>
      </div>
    </div>
  );
}