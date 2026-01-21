import Link from "next/link";
import NextImage from "next/image";

const NAV_ITEMS = [
  { name: 'home',   src: '/home.svg',   width: 60, height: 30 }, 
  { name: 'blog',   src: '/blog.svg',   width: 50, height: 30 },    
  { name: 'resume', src: '/resume.svg', width: 85, height: 30 },
  { name: "contact", src: "/contact.svg", width: 70, height: 30 },
];

export default function Header() {
  // 배경색과 일치하는 색상 코드 (디자인에 맞춰 수정 가능)
  const BG_COLOR = "#bcfca5"; 

  return (
    <div className="mb-24">
      {/* 1. 상단 메인 영역 (연두색 배경) */}
      <header 
        className="flex flex-col md:flex-row justify-between items-center px-10 pt-10 pb-6"
        style={{ backgroundColor: BG_COLOR }}
      >
        <Link href="/">
          <NextImage 
            src="/SH380.svg"      
            alt="SH380 Logo"     
            width={200}          
            height={70}          
            className="cursor-pointer hover:opacity-80 transition-opacity" 
            priority             
          />
        </Link>
        
        <nav>
          <ul className="flex gap-6 items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={`/${item.name === 'home' ? '' : item.name}`}>
                  <NextImage
                    src={item.src}
                    alt={`${item.name} menu`}
                    width={item.width}   
                    height={item.height}
                    className="w-auto h-auto cursor-pointer hover:opacity-70 transition-opacity"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* 2. 하단 물결 모양 (CSS로 구현) */}
      <div 
        className="w-full h-4" // 물결의 높이
        style={{
          // 원형 그라데이션을 반복해서 물결 모양 생성
          backgroundImage: `radial-gradient(circle at 50% 0, ${BG_COLOR} 70%, transparent 71%)`,
          backgroundSize: "30px 15px", // 물결 하나의 너비와 높이 비율
          backgroundRepeat: "repeat-x"
        }}
      />
    </div>
  );
}