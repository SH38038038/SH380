import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; 
import "./globals.css";
import Header from "../components/Header"; // 1. 헤더 불러오기

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing-script' });

export const metadata: Metadata = {
  title: "SH380 Dev Blog",
  description: "서현님의 개발 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      {/* 2. body 안에 전체 레이아웃 잡기 */}
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased bg-white text-gray-800`}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Header />  {/* 여기에 헤더 고정! */}
          {children}  {/* 여기가 페이지마다 바뀌는 내용 */}
        </div>
      </body>
    </html>
  );
}