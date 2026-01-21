import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ⬇️ 이 부분을 수정하세요!
export const metadata: Metadata = {
  // 1. 사이트 기본 주소 (배포된 Vercel 주소나 도메인 입력 필수)
  metadataBase: new URL('https://https://sh-380.vercel.app'), 
  
  // 2. 제목 설정
  title: {
    template: '%s | 홍서현 개발자 블로그', // 다른 페이지에선 "글제목 | 홍서현..."으로 뜸
    default: '홍서현 개발자 블로그', // 메인 페이지 제목
  },
  
  // 3. 설명글 (구글 검색 제목 아래에 뜨는 작은 글씨)
  description: '개발자 홍서현의 기술 블로그입니다. Next.js, Java, Springboot 등 개발 지식과 트러블슈팅 경험을 기록합니다.',
  
  // 4. 검색 키워드 (구글은 잘 안 보지만 다른 검색엔진 참고용)
  keywords: ['홍서현', '개발자 블로그', '기술 블로그', 'Next.js', 'Springboot'],

  // 5. 오픈 그래프 (카톡, 슬랙 공유시 뜨는 미리보기)
  openGraph: {
    title: '홍서현 개발자 블로그',
    description: '끊임없이 시도하고 기록하는 개발자 홍서현입니다.',
    url: 'https://https://sh-380.vercel.app',
    siteName: '홍서현 블로그',
    locale: 'ko_KR',
    type: 'website',
  },
  
  // 6. 구글 소유권 확인 (아까 넣은 파일 대신 코드로도 가능)
  verification: {
    google: 'google306e9831b80f8806', // 아까 파일 이름에 있던 그 숫자코드
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko"> {/* en을 ko로 바꾸면 한국 사이트로 인식되어 더 좋습니다 */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}