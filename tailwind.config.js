/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ton: '#0098EA',
        dark: '#0F172A',
        card: '#1E293B',
        accent: '#8B5CF6'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-short': 'bounce 0.5s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}