/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind 应用范围
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
  // prefix: 'tw-',  // 如果class名有冲突可以加个自定义前缀
}