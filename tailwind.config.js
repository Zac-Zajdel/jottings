module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'jot-hover-gray-100': '#3C3C3C',
        'jot-hover-gray-200': '#4C4C4C',
        'jot-dark-black': 'rgb(30,30,30)',
        'jot-light-gray': 'rgb(50,50,50)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
