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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
