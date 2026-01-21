import { getPostData } from "../../../lib/posts";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// ✅ 1. 타입 설정 (Next.js 15 호환)
interface Props {
  params: Promise<{ slug: string }>;
}

// ✅ 2. 비동기 컴포넌트
export default async function BlogPostPage({ params }: Props) {
  // ✅ 3. slug 가져오기
  const { slug } = await params;
  
  const post = getPostData(slug);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* 날짜 */}
      <div className="text-gray-500 mb-4">{post.date}</div>
      
      {/* 제목 */}
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{post.title}</h1>

      {/* 태그 목록 */}
      <div className="flex flex-wrap gap-3 mb-12">
        {(post.tags || []).map((tag) => (
          <span key={tag} className="px-4 py-1.5 border border-gray-200 rounded-full text-gray-600 text-sm bg-gray-50">
            {tag}
          </span>
        ))}
      </div>

      <hr className="border-gray-200 mb-12" />

      {/* ✅ 마크다운 렌더링 (로그/ASCII 아트 깨짐 방지 적용됨) */}
      <article className="prose prose-lg prose-slate max-w-none break-words">
        <ReactMarkdown
          components={{
            // 1. 코드 블록(pre)을 만나면 스크롤 가능한 박스로 감싸기
            pre: ({ node, ...props }) => (
              <div className="overflow-x-auto w-full my-6 rounded-lg bg-gray-50 p-4 border border-gray-100">
                {/* whitespace-pre: 줄바꿈/띄어쓰기 있는 그대로 유지 (로그, ASCII 아트용) */}
                <pre {...props} className="m-0 whitespace-pre font-mono text-sm text-gray-800" />
              </div>
            ),
            // 2. 인라인 코드(code) 스타일 (선택 사항)
            code: ({ node, ...props }) => (
              <code {...props} className="bg-transparent p-0 border-none" />
            )
          }}
        >
          {post.content} 
        </ReactMarkdown>
      </article>

      {/* 목록으로 돌아가기 버튼 */}
      <div className="mt-20 text-center">
        <Link 
            href="/blog" 
            className="inline-block px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
        >
            목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}