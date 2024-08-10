/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          '500': '#0098ff',
        },
        purple: {
          '500': '#7b35c8',
          '400': '#0198ff2e',
          '300': '#0000'
        },

      },
      backgroundImage: {
        '148': 'linear-gradient(148deg, #0198ff2e, #0000)',
      },
      borderRadius: {
        'custom-dansha': '0px 22px 0px',
      },
      height: {
        '135vh': '135vh',
      },
    },
  },
  plugins: [],
}