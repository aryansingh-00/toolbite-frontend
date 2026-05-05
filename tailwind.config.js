/** @type {import('tailwindcss').Config} */

const userBrand = {
  50: '#eef2fe',
  100: '#e1e8fe',
  200: '#c9d7fc',
  300: '#a7bcfa',
  400: '#839ef4',
  500: '#7091E6',
  600: '#4d6bce',
  700: '#4256ab',
  800: '#3b488c',
  900: '#3D52A0',
  950: '#242f5c',
};

const userNeutral = {
  50: '#EDE8F5',
  100: '#e0daf0',
  200: '#ADBBDA',
  300: '#9aaad0',
  400: '#8697C4',
  500: '#6e81b3',
  600: '#576899',
  700: '#46547e',
  800: '#3b4566',
  900: '#2c334d',
  950: '#1a1f33', 
};

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        slate: userNeutral,
        gray: userNeutral,
        zinc: userNeutral,
        neutral: userNeutral,
        stone: userNeutral,
        teal: userBrand,
        emerald: userBrand,
        blue: userBrand,
        indigo: userBrand,
        purple: userBrand,
        rose: userBrand,
        pink: userBrand,
        amber: userBrand,
        orange: userBrand,
        cyan: userBrand,
        red: userBrand,
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(61, 82, 160, 0.05)',
        'premium': '0 30px 60px -15px rgba(26, 31, 51, 0.15)',
        'glow': '0 0 25px rgba(112, 145, 230, 0.4)',
        'glow-slate': '0 0 30px rgba(44, 51, 77, 0.25)',
        'glow-teal': '0 0 20px rgba(112, 145, 230, 0.5), 0 0 40px rgba(112, 145, 230, 0.2)',
        'glow-emerald': '0 0 20px rgba(112, 145, 230, 0.5), 0 0 40px rgba(112, 145, 230, 0.2)',
        'glow-purple': '0 0 20px rgba(112, 145, 230, 0.5), 0 0 40px rgba(112, 145, 230, 0.2)',
        'glow-blue': '0 0 20px rgba(112, 145, 230, 0.5), 0 0 40px rgba(112, 145, 230, 0.2)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
