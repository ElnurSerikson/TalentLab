import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        talent: {
          violet: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#7C3AED',
            600: '#6D28D9',
            700: '#5B21B6',
          },
          amber: {
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
          },
          emerald: {
            400: '#34D399',
            500: '#10B981',
          },
          rose: {
            400: '#FB7185',
            500: '#F43F5E',
          },
          cream: {
            50: '#FAF9F6',
            100: '#F4F2EC',
          },
          slate: {
            200: '#E2E8F0',
            500: '#64748B',
            900: '#0F172A',
          },
        },
      },
      fontFamily: {
        heading: ['Onest', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(124, 58, 237, 0.08)',
        'soft-lg': '0 18px 50px rgba(124, 58, 237, 0.12)',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
