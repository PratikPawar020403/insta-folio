/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ig: {
          primary: '#0095F6',
          'primary-hover': '#1877F2',
          like: '#ED4956',
          bg: '#FAFAFA',
          'bg-dark': '#000000',
          'card-dark': '#121212',
          'border-dark': '#262626',
          'border-light': '#DBDBDB',
          'text-secondary': '#737373',
          'text-secondary-dark': '#A8A8A8',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        likeHeart: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.3)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },
      animation: {
        likeHeart: 'likeHeart 0.7s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
