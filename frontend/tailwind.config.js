// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '720px',
      },
      colors: {
        'custom-gray': '#ededed',
        'custom-yellow-300': '#ffe600',
      },
    },
  },
  plugins: [],
}
