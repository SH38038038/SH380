import Link from "next/link";

const NAV_ITEMS = [
  { name: 'home', label: 'home', path: '/' },
  { name: 'work', label: '★work', path: '/blog' },
  { name: 'contact', label: 'contact', path: '/contact' },
];

export default function Header() {
  return (
    <div className="mb-24">
      <header className="flex flex-col md:flex-row justify-between items-center px-10 pt-10 pb-6 bg-white">
        
        <Link href="/">
          <div className="cursor-pointer hover:opacity-70 transition-opacity">
            {/* ✨ 수정 포인트: 
                1. inline-block: transform(scale)을 적용하기 위해 필수
                2. scale-x-[1.5]: 가로로 1.5배 늘려 뚱뚱하게 만듦 (비율은 1.2~2.0 사이에서 조절 가능)
                3. origin-left: 늘어나는 기준점을 왼쪽으로 설정
            */}
            <span 
              className="inline-block text-6xl sm:text-7xl font-normal tracking-tight text-black select-none scale-x-[1.5] origin-left"
              style={{ lineHeight: '1' }}
            >
              $H
            </span>
          </div>
        </Link>
        
        <nav className="mt-8 md:mt-0">
          <ul className="flex gap-8 sm:gap-10 items-center text-2xl sm:text-3xl font-normal text-black tracking-wide">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <span className="cursor-pointer hover:text-gray-500 transition-colors">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}