/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['"Cairo"', 'sans-serif'],
      },
      colors: {
        primary: '#4682B4',
        secondary: '#002147',
        tertiary: '#E5F5F9',
        black: '#434343',
        babyBlue: '#E5F5F9',
        yallow: '#F4BE40',

        // 🌟 الألوان الجديدة للزر
        buttonDefault: '#D2EAF7',
        buttonFocus: '#2ca1db',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
}
