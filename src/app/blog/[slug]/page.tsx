import { getPostData } from "../../../lib/posts";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Comments from "../../../components/Comments"; // 👈 1. 여기 import 경로 확인 (src/components... 또는 ../../../components...)

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="text-gray-500 mb-4">{post.date}</div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{post.title}</h1>

      <div className="flex flex-wrap gap-3 mb-12">
        {(post.tags || []).map((tag) => (
          <span key={tag} className="px-4 py-1.5 border border-gray-200 rounded-full text-gray-600 text-sm bg-gray-50">
            {tag}
          </span>
        ))}
      </div>

      <hr className="border-gray-200 mb-12" />

      <article className="text-gray-800 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-10 mb-6 border-b pb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
            p: ({ node, ...props }) => <p className="mb-6 leading-7 text-lg" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 mb-6 space-y-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-1" {...props} />,
            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-6 text-gray-600 italic bg-gray-50" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:underline break-words" target="_blank" rel="noopener noreferrer" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <div className="overflow-x-auto w-full my-6 rounded-lg bg-gray-50 p-4 border border-gray-200 shadow-sm">
                <pre {...props} className="m-0 whitespace-pre font-mono text-sm text-gray-900" />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-500 font-mono text-sm border border-gray-200" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8 border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
            tbody: ({ node, ...props }) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
            tr: ({ node, ...props }) => <tr className="" {...props} />,
            th: ({ node, ...props }) => (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap bg-gray-100" {...props} />
            ),
            td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-600 align-top" {...props} />,
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

      {/* 👈 2. 여기에 댓글창 추가! */}
      <div className="mt-10">
        <Comments />
      </div>
    </div>
  );
}