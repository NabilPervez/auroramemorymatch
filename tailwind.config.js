/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          dark: '#1a1b4b', // Deep purple-blue
          mid: '#4c1d95',  // Rich purple
          light: '#2dd4bf', // Teal/Cyan
          accent: '#f472b6', // Pink accent
        }
      },
      animation: {
        'aurora': 'aurora 10s ease infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
