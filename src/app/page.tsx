import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";

export default function Home() {
  // 1. 블로그 글에서 태그 추출 및 중복 제거
  const posts = getSortedPostsData();
  const allTags = posts.flatMap((post) => post.tags || []);
  const uniqueTags = Array.from(new Set(allTags));

  // 요청하신 Buddha Bless 아스키 아트
  const asciiArt = `
  ⢤⠒⢦⡱⢤⡤⢤⠤⡤⢤⣄⣾⠹⡜⣥⣛⡇⠀⠀⠀⣀⡀⠠⠤⠤⠤⢀⣀⣀⣸⣿⣿⢿⣿⣣⣄⣤⡤⣤⣤⣤⣤⣄⣤⣤⡄⢠⢠⠄⣀
⠊⠍⠢⢅⠻⣝⢬⢣⢽⣟⣿⣧⠛⡼⣿⢢⡣⢔⠪⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⢻⣿⣭⣭⣿⠉⠉⠉⠉⠉⠉⠉⠁⠀
⠉⠌⡑⢈⠂⠹⣾⣥⡿⣿⡿⢷⡹⣘⡧⣿⠀⠁⠀⠀⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠈⠈⠻⣿⣯⢷⡹⣾⠁⠒⠀⠈⠒⡆⠀⠀⠀
⠈⠄⠐⠠⠈⢀⠯⠋⣰⠺⣌⠳⡴⣹⡷⢁⠂⠀⠀⣐⠀⠀⠀⢀⠀⠀⠀⡀⠀⠈⠄⠀⠀⠠⡀⠀⠈⢙⠳⢏⡿⣦⡄⠀⠀⠀⠀⠂⠠⠀
⠀⠂⠈⣠⠔⡋⢠⡾⣡⢛⠴⣋⢴⣯⣀⠎⢀⠀⢠⠄⠀⠀⠀⡸⠀⠀⠀⡇⡄⠀⢘⡀⠀⠀⡐⡀⠀⢄⠑⡶⠴⢞⣷⡀⠀⠀⠀⠀⠀⠀
⠓⠶⠭⢤⢮⢰⡿⡱⣱⢊⣷⣼⡿⡀⡏⠀⠘⠀⡜⠀⢀⠄⢠⡇⠀⠀⢰⢹⢰⠀⠈⣳⡀⠀⠠⡘⡀⠀⠱⡈⢄⠢⣌⠳⣀⠀⠀⠀⠀⠀
⠀⠀⣰⠏⠶⣿⣷⣷⣷⣿⡿⣿⡇⢹⠀⠀⠀⢰⠁⠀⡸⠀⠉⡇⠀⠀⡎⢀⡎⣇⠀⢸⢱⠆⠀⢷⢰⠀⠸⢰⣆⠱⡈⣿⣆⡱⣶⣶⣀⣀
⣠⣾⠏⣼⡄⠀⢸⣼⣿⡿⣽⢻⡴⡟⡀⠀⠀⢸⠀⣠⠇⢸⠡⡇⠀⣇⠁⠀⠲⣋⡄⠈⡔⣻⠀⠸⣇⠀⠀⣇⢫⠉⢺⠙⢿⣿⣮⣷⣛⢾
⠻⡟⣸⡇⡇⠀⢸⣯⣿⠱⣿⢩⢷⡇⡇⠀⢀⣟⡰⢻⢀⠇⠀⢳⠀⡏⠀⠀⠀⠹⠘⣆⡆⠁⣧⢸⠸⡄⠀⢸⡄⢇⠀⢷⡌⠿⣽⣫⢽⠎
⢀⢱⢿⣧⠇⠀⠸⣿⢣⢻⣇⠳⢪⡇⢸⠀⠨⣿⠁⢸⡜⠀⠀⠈⡆⠁⠀⠀⠀⠀⠀⠸⠇⠀⢹⣸⡇⡇⠀⢸⣧⠘⢡⢸⠘⡜⡈⠙⠃⠀
⠈⡆⠀⢹⣻⠀⣘⣇⣯⣲⣍⣺⡱⡞⠈⣆⠀⢷⠀⠀⠁⠀⠀⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⢳⢧⠀⡼⣛⡆⣿⢸⠀⢱⢇⠀⠀⠀
⠀⠀⠀⠸⣹⣷⢼⣿⣏⢿⢡⠹⣷⣹⡆⠈⢦⡈⠞⠒⠒⠒⠚⠋⠉⠀⠀⠀⠀⠀⠙⠛⠛⠋⢁⣷⡩⡗⢠⡿⣭⣧⢿⠾⠀⠀⡇⠀⠀⠀
⠀⠀⠀⠀⢿⠘⣶⢹⠏⠈⢞⠀⠈⠛⣿⣄⠘⢿⠮⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⢸⣱⢏⡟⡽⢿⡏⢸⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢇⠈⠻⣧⠀⠸⠀⠀⠀⠙⣿⢦⡌⢷⢄⡀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⡠⠃⣜⣿⠎⠀⡇⠘⣟⡌⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠈⠣⢙⣿⣂⡈⠑⡤⢀⡀⠀⠀⠀⠀⢀⡠⠔⠉⠀⢰⠟⠁⠀⠀⠁⠀⠹⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣧⣤⣀⣉⣉⣿⠷⠾⢆⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠂⠀⠀⠛⠻⣿⠛⠛⠻⠿⠿⡿⡍⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀⢻⢃⠩⠂⠨⠤⡝⠐⠐⠁⡄⠂⠿⣎⠉⠉⠙⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠀⠀⠀⠀⠀⠀⠀⢸⠘⠀⠀⠀⢀⠁⠀⠀⠸⠀⠀⢹⠌⡄⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⠀⠀⠀⠀⠀⢸⡆⡇⠀⡀⠸⠀⠀⠀⢰⠀⠀⠀⣸⢀⠀⠀⠀⢱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⡤⠷⠁⡠⡆⠀⠀⠀⣜⠄⠀⠀⣃⡈⢢⠀⠀⠈⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⢐⠥⠊⠋⠵⢶⠃⠀⢱⠶⠋⠊⠢⡑⡆⠀⠀⠀⢱⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢄⠀⠀⠀⠀⣀⣀⣀⣀⣤⠒⠋⠁⠀⠀⠀⠀⡈⠀⠀⢸⠀⠀⠀⠀⠈⠣⡀⠀⢀⡜⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠂⡴⠿⡟⠉⠉⡏⠙⢻⡿⠁⠀⡀⠀⠀⡇⠀⠀⢸⡀⠀⠀⠀⢠⢤⠌⡽⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⣀⣀⣦⣄⣀⣶⡟⠁⠁⠀⠁⣥⡰⡿⠀⠀⠀⠘⢇⠼⠑⠤⠸⠈⢦⣥⣴⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣀⢀⡀⡀⠀⠀⠀⢠⣤⣿⣿⠳⢾⡟⠁⠀⠀⠀⠀⡼⠃⠁⡄⡄⠀⠀⠀⠀⠀⢇⠀⠀⠀⠈⢻⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀

`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 1. 소개 텍스트 영역 */}
      <section className="mb-16 text-lg leading-relaxed text-gray-600 font-light">
        <div className="space-y-1 mb-4">
          <p className="font-bold text-gray-900">
            Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.<br />
          </p><br />
          <p>
            낯선 기술의 바다에서 길을 잃는 것을 즐깁니다.
            <br />
            그 과정 끝에 더 나은 답이 있음을 믿기 때문입니다.
          </p>
          <p>
            안녕하세요 저는{" "}
            <span className="text-[#FFACED] font-bold">개발자 홍서현 </span>입니다.
          </p>
        </div>
      </section>

      {/* 2. 태그 목록 영역 (무한 스크롤 애니메이션) */}
      <section className="w-full overflow-hidden mb-24">
        <div className="inline-flex w-full flex-nowrap overflow-hidden">
          {/* animate-infinite-scroll 및 hover 일시정지 */}
          <div className="flex items-center animate-infinite-scroll hover:[animation-play-state:paused]">
            
            {/* --- 첫 번째 리스트 (원본) --- */}
            <TagList tags={uniqueTags} />

            {/* --- 두 번째 리스트 (복제본) --- */}
            {/* 수정됨: "true" -> {true} */}
            <TagList tags={uniqueTags} aria-hidden={true} />
            
          </div>
        </div>
      </section>

      {/* 3. 아스키 아트 (부적) 영역 */}
      <section className="flex justify-center mb-12">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide flex justify-center">
            <pre
              className="font-mono text-xs sm:text-sm leading-tight whitespace-pre select-all"
              style={{ color: "#FFACED" }}
            >
              {asciiArt}
            </pre>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6 font-mono">
              /* shape me */
            </p>
        </div>
      </section>
    </div>
  );
}

// -------------------------------------------------------------------------
// Helper Component
// -------------------------------------------------------------------------
function TagList({
  tags,
  "aria-hidden": ariaHidden,
}: {
  tags: string[];
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 mx-2"
      aria-hidden={ariaHidden}
    >
      {tags.length > 0
        ? tags.map((tag, index) => (
            // src/app/page.tsx 의 TagList 컴포넌트 내부

            <Link 
            key={`${tag}-${ariaHidden ? 'dup' : 'orig'}-${index}`} 
            // 1. href 수정: 태그 이름을 URL 경로로 보냅니다.
            // encodeURIComponent는 한글이나 특수문자(# 등)를 URL에서도 안전하게 처리해줍니다.
            href={`/tag/${encodeURIComponent(tag)}`}
            className="..." // 기존 클래스 유지
            >
            {tag}
            </Link>
          ))
        : ["#Springboot", "#Java", "#Next.js"].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-5 py-2 whitespace-nowrap border border-gray-200 rounded-full text-gray-400 text-lg"
            >
              {tag}
            </span>
          ))}
    </div>
  );
}