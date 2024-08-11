import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/images/배경.png')",
      },
      opacity: {
        '60': '0.6',
      },
      backgroundSize: {
        '50%': '50%',
        '70%': '70%',
        '75%': '75%',
        '40%': '40%',
        '30%': '30%',
        '25%': '25%',
        '20%': '20%',
        '10%': '10%',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        yangpyeong: ["'Yangpyeong'", 'sans-serif'],
      },
      screens: {
        sm: { min: '320px', max: '768px' },
        md: { min: '769px', max: '1119px' },
        lg: { min: '1120px' },
      },

      colors: {
        primary: {
          50: '#F0EDF7',
          100: '#D3CAE8',
          200: '#B6A6D8',
          300: '#9983C9',
          400: '#7C5FB9',
          500: '#6346A0',
          600: '#4D367C',
          700: '#372759',
          800: '#211735',
          900: '#0B0812',
        },
        secondary: {
          // 추후 추가 예정?
        },
        black: {
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
          1000: '#000000',
          back: '#EAEAEA',
        },
        error: {
          900: '#EE4700',
        },
        warning: {
          900: '#', // 아직 정해지지 않음
        },
        info: {
          900: '#', // 아직 정해지지 않음
        },
        success: {
          900: '#51CC56', // 아직 정해지지 않음
        },
        dimmer: {
          900: '#17171980', //#171719에 투명도 50%
        },
        purple: {
          300: '#9b5de5',
          500: '#f15bb5',
          700: '#fee440',
          900: '#00bbf9',
        },
        header: {
          default: '#2D2D2D', //투명도 60%
        },
      },

      keyframes: {
        'rotate-axis': {
          from: {
            transform: 'rotateZ(350deg) perspective(800px) rotateY(0deg)',
          },
          to: {
            transform: 'rotateZ(350deg) perspective(800px) rotateY(360deg)',
          },
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
