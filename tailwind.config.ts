import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: '#9b5de5',
          500: '#f15bb5',
          700: '#fee440',
          900: '#00bbf9',
        },
      },
      fontFamily: {
        yangpyeong: ["'Yangpyeong'", 'sans-serif'],
      },
      keyframes: {
        'rotate-axis': {
          from: { transform: 'rotateZ(350deg) perspective(800px) rotateY(0deg)' },
          to: { transform: 'rotateZ(350deg) perspective(800px) rotateY(360deg)' },
        },
      },
      animation: {
        'rotate-axis': 'rotate-axis 10s linear infinite',
      },
      transformOrigin: {
        'preserve-3d': 'transform-style: preserve-3d',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;