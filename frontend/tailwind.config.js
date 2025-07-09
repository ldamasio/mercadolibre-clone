// tailwind.config.js (sem alterações)
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#ededed',
        'custom-yellow-300': '#ffe600',
      },
    },
  },
  plugins: [],
};
