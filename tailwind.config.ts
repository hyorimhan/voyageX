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
        primary: {
          50: '#F0EDF7',
          100: '#D3CAE8',
          200: '#B6A6D8',
          300: '#9983C9',
          400: '#7C5FB9',
          500: '#6346A0',
          600: '#4D367C',
          700: '#372759',
        },
        black: {
          50: '#F4F4F4',
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#B8B8B8',
          400: '#A3A3A3',
          500: '#8F8F8F',
          600: '#7A7A7A',
          700: '#666666',
          800: '#525252',
          900: '#3D3D3D',
        },
        error: {
          900: '#EE4700',
        },
        warning: {
          900: '#',
        },
        info: {
          900: '#',
        },
        success: {
          900: '#51CC56',
        },
        dimmer: {
          900: '#171719', //50%
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
