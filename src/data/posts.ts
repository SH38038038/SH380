export const POSTS = [
  {
    id: 1,
    title: "CORS 문제 해결하기 (.env 활용)",
    desc: "개발 환경에서 CORS 오류를 피하기 위해 Vite의 Proxy 설정을...",
    tags: ["#Vite", "#CORS", "#Troubleshooting"],
    date: "2024-03-10",
    // ✅ 썸네일 지정 (첫 번째 사진 경로를 여기에 적음)
    thumbnail: "/thumbnail.svg", 
  },
  {
    id: 2,
    title: "Next.js 14로 블로그 마이그레이션",
    desc: "React 기반의 정적 사이트 생성기를 활용하여 SEO 점수를...",
    tags: ["#Next.js", "#React", "#SEO"],
    date: "2024-03-15",
    // ✅ 다른 이미지가 있다면 경로 변경 (없으면 기본 이미지)
    thumbnail: "/thumbnail.svg", 
  },
  // ... 나머지 데이터
];