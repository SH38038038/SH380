import NextImage from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    // ✨ 수정됨: max-w-4xl(너비제한), mx-auto(중앙정렬), px-6(좌우여백), py-12(상하여백) 추가
    <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-16">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <article className="group flex flex-col md:flex-row items-center gap-10 cursor-pointer border-b border-gray-100 pb-12 last:border-0">
            
            {/* 썸네일 영역 */}
            <div className="relative w-[260px] h-[160px] flex-shrink-0 transition-transform group-hover:scale-105 duration-300">
              <NextImage 
                src={post.thumbnail || '/thumbnail.svg'} 
                alt={post.title}
                fill
                className="object-cover"
                style={{
                  maskImage: "url('/mask-shape.svg')",
                  WebkitMaskImage: "url('/mask-shape.svg')",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#FFACED] transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4 line-clamp-2">
                {post.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {(post.tags || []).map(tag => (
                      <span key={tag} className="text-sm text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                          {tag}
                      </span>
                  ))}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </main>
  );
}