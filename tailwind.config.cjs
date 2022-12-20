/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      transitionProperty: {
        'w': 'width',
        'ml': 'margin-left'
      }
    },
  },
  plugins: [],
}
