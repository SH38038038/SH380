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
  const formatTag = (tag: string) => {
    return tag.startsWith('#') ? tag : `#${tag}`;
  };

  return (
    <div
      className="flex items-center" // gap-4 제거 (아이템 자체 여백 mx-6로 조절)
      aria-hidden={ariaHidden}
    >
      {tags.length > 0
        ? tags.map((tag, index) => (
            <Link
              key={`${tag}-${ariaHidden ? 'dup' : 'orig'}-${index}`}
              href={`/tag/${encodeURIComponent(tag)}`}
              // ✨ 스타일 수정 포인트:
              // 1. 테두리(border), 배경(bg), 둥글기(rounded) 모두 제거
              // 2. mx-6: 글자 사이 간격을 넓게 줌
              // 3. text-gray-500: 기본 회색 -> hover시 진한 검정(text-gray-900)
              className="mx-6 text-lg font-medium text-gray-500 whitespace-nowrap hover:text-gray-900 transition-colors"
            >
              {formatTag(tag)}
            </Link>
          ))
        : // 데이터 없을 때 보여줄 예시 태그들도 동일하게 스타일 맞춤
          ["#Springboot", "#Java", "#Next.js"].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="mx-6 text-lg font-medium text-gray-400 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
    </div>
  );
}