// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 로고용 필기체 폰트
        logo: ['var(--font-dancing-script)', 'cursive'], 
        // 본문용 깔끔한 폰트
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'oval': '50%', // 타원형 이미지를 위한 커스텀 설정
      }
    },
  },
  plugins: [],
};
export default config;