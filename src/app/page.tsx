"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  // 마우스가 글자 위에 있는지 여부와 현재 좌표를 기억할 공간
  const isHovering = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // 1. 계속 쏟아지는 무한 루프 로직
  useEffect(() => {
    // 30ms 간격으로 계속 실행 (숫자를 줄이면 더 미친듯이 쏟아집니다)
    const interval = setInterval(() => {
      // 마우스가 글자 위에 없으면 멈춤
      if (!isHovering.current) return;

      const particle = document.createElement("div");
      particle.className = "plus-particle";
      particle.textContent = "+";
      
      // 기억해둔 마우스 좌표에서 생성
      particle.style.left = `${mousePos.current.x}px`;
      particle.style.top = `${mousePos.current.y}px`;
      
      const spreadX = (Math.random() - 0.5) * 80;
      const spreadY = Math.random() * 80 + 40;
      
      particle.style.setProperty("--spread-x", `${spreadX}px`);
      particle.style.setProperty("--spread-y", `${spreadY}px`);

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }, 30); 

    // 컴포넌트가 꺼질 때 루프 종료
    return () => clearInterval(interval);
  }, []);

  // 2. 글자 단위 분리 헬퍼 함수
  const splitText = (text: string) => {
    return text.split("").map((char, idx) => {
      if (char === " ") return <span key={idx}> </span>;
      return (
        <span
          key={idx}
          className="transition-colors duration-200 hover:text-[#DAFFEF] cursor-default"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-6 pb-32 overflow-hidden">
      
      <style>{`
        .plus-particle {
          position: fixed;
          color: #DAFFEF;
          font-size: 1.5rem;
          font-weight: 300;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          animation: pour 1s ease-out forwards;
        }
        
        @keyframes pour {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--spread-x)), calc(-50% + var(--spread-y))) scale(0.5) rotate(180deg);
          }
        }
      `}</style>

      {/* ✨ 핵심 변경 포인트:
        텍스트 컨테이너에 마우스가 들어오면 true, 나가면 false로 상태를 바꾸고,
        그 안에서 움직일 때마다 좌표를 실시간으로 업데이트해 줍니다.
      */}
      <p 
        className="text-xl sm:text-3xl font-medium text-black tracking-wider text-justify [text-align-last:justify] w-full max-w-[300px] sm:max-w-[420px] leading-[1.7]"
        onMouseEnter={() => { isHovering.current = true; }}
        onMouseLeave={() => { isHovering.current = false; }}
        onMouseMove={(e) => { mousePos.current = { x: e.clientX, y: e.clientY }; }}
      >
        {splitText("Ever tried. Ever failed.")} <br />
        {splitText("No matter. Try again.")} <br />
        {splitText("Fail again. Fail better.")}
      </p>
      
    </div>
  );
}