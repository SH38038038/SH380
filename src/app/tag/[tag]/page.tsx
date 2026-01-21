import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";

// ⚠️ 중요: Next.js 최신 버전에서는 params가 Promise 타입입니다.
interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPostPage({ params }: TagPageProps) {
  // 1. params를 await로 풀어서 가져와야 합니다. (이 부분이 에러의 원인이었습니다!)
  const { tag } = await params;
  
  // 2. URL 태그 디코딩
  const decodedTag = decodeURIComponent(tag);
  const allPosts = getSortedPostsData();

  // 3. 필터링 로직 (# 제거하고 비교)
  const filteredPosts = allPosts.filter((post) => {
    if (!post.tags) return false;
    return post.tags.some((postTag) => {
      const cleanPostTag = postTag.replace(/^#/, '');
      const cleanUrlTag = decodedTag.replace(/^#/, '');
      return cleanPostTag === cleanUrlTag;
    });
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-[#FFACED]">#</span> {decodedTag.replace(/^#/, '')}
        </h1>
        <p className="text-gray-500">
          총 <span className="font-bold text-black">{filteredPosts.length}</span>개의 글이 있습니다.
        </p>
      </div>

      <div className="space-y-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`} 
              className="block group"
            >
              <article className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold group-hover:text-[#FFACED] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {post.date}
                  </p>
                  
                  <div className="flex gap-2 mt-2">
                    {post.tags?.map(t => (
                      <span key={t} className="text-sm text-gray-400">#{t.replace(/^#/, '')}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
            <p className="mb-2">검색된 글이 없습니다.</p>
          </div>
        )}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/" 
          className="inline-block px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}