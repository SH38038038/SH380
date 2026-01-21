import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 1. 헤더 컴포넌트를 불러옵니다. (이게 빠져서 안 보였던 거예요!)
import Header from "../components/Header"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 👇 2. URL 오타 수정 (https://가 두 번 들어가 있었습니다)
  metadataBase: new URL('https://sh-380.vercel.app'), 
  
  title: {
    template: '%s | 홍서현 개발자 블로그',
    default: '홍서현 개발자 블로그',
  },
  
  description: '개발자 홍서현의 기술 블로그입니다. Next.js, Java, Springboot 등 개발 지식과 트러블슈팅 경험을 기록합니다.',
  
  keywords: ['홍서현', '개발자 블로그', '기술 블로그', 'Next.js', 'Springboot'],

  openGraph: {
    title: '홍서현 개발자 블로그',
    description: '끊임없이 시도하고 기록하는 개발자 홍서현입니다.',
    // 👇 3. 여기도 URL 오타 수정
    url: 'https://sh-380.vercel.app',
    siteName: '홍서현 블로그',
    locale: 'ko_KR',
    type: 'website',
  },
  
  verification: {
    google: 'google306e9831b80f8806',
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
        {/* 👇 4. body 태그 바로 아래에 헤더를 넣어줍니다 */}
        <Header />
        
        {/* 블로그 내용들 */}
        {children}
      </body>
    </html>
  );
}