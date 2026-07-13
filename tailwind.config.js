/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#050816',
        'secondary-background': '#0F172A',
        card: '#111827',
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        success: '#22C55E',
        text: '#FFFFFF',
        'secondary-text': '#CBD5E1',
        border: 'rgba(255,255,255,0.08)',
        // Keeping some legacy mappings
        teal: { 500: '#06B6D4' },
        emerald: { 500: '#22C55E' },
        blue: { 500: '#6366F1' },
        indigo: { 500: '#6366F1' },
        purple: { 500: '#8B5CF6' },
        slate: { 800: '#111827', 900: '#0F172A', 950: '#050816' },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'premium': '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 25px rgba(99, 102, 241, 0.4)',
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.2)',
        'glow-secondary': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-accent': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.2)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
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
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [],
}
