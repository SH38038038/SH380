import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        // 20s는 속도입니다. 숫자가 클수록 느려집니다.
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      fontFamily: {
        logo: ['var(--font-dancing-script)', 'cursive'], 
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [
    // 👇 이 줄을 추가하세요!
    require('@tailwindcss/typography'),
  ],
};
export default config;