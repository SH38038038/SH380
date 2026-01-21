import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 1. 헤더 컴포넌트 (기존 유지)
import Header from "../components/Header"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 👇 2. URL 설정 (오타 수정됨)
  metadataBase: new URL('https://sh-380.vercel.app'), 
  
  title: {
    // 서브 페이지에선 "글 제목 | SH380"으로 깔끔하게 보임
    template: '%s | SH380', 
    // 메인 페이지 타이틀 (우리가 정한 브랜딩!)
    default: 'SH380 | 홍서현 기술 블로그', 
  },
  
  // 👇 3. 검색 결과 설명 (철학적 문구 + 자기소개)
  // 구글 검색 결과는 줄바꿈을 무시하므로 자연스럽게 이어지도록 적었습니다.
  description: 'Ever tried. Ever failed. No matter. Try again. Fail again. Fail better. 낯선 기술의 바다에서 길을 잃는 것을 즐깁니다. 그 과정 끝에 더 나은 답이 있음을 믿기 때문입니다. 백엔드 엔지니어 홍서현의 회고와 기록 공간입니다.',
  
  // 키워드 강화 (검색 잘 되게)
  keywords: ['홍서현','백엔드 개발 블로그','백엔드 기술 블로그', 'SH380', '백엔드', '기술 블로그', 'Spring Boot', 'Kubernetes', 'Next.js', 'docker','backend', 'developer', 'programming', 'web development', 'python', 'server', 'cloud', 'infrastructure'],

  openGraph: {
    title: 'SH380 | 홍서현 기술 블로그',
    // 카톡 공유 시 보일 문구 (핵심 문장 위주)
    description: '낯선 기술의 바다에서 더 나은 답을 찾아가는 개발자 홍서현입니다.',
    url: 'https://sh-380.vercel.app',
    siteName: 'SH380 | 홍서현 기술 블로그',
    locale: 'ko_KR',
    type: 'website',
  },
  
  verification: {
    google: 'google306e9831b80f8806', // 기존 코드 유지
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {/* 👇 4. 헤더 배치 (기존 유지) */}
        <Header />
        
        {/* 블로그 내용들 */}
        {children}
      </body>
    </html>
  );
}