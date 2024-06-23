/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.html',
    './src/index.html'
  ],
  theme: {
    extend: {
      screens: {
        'h800': { 'raw': '(min-height: 800px)' },
      },
    },
  },
  plugins: [],
}

