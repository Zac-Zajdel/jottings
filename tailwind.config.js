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
        'jot-dark-black': 'rgb(24,27,33)',
        'jot-light-gray': 'rgb(33,36,44)',
        'jot-blue-100': 'rgb(58,118,255)',
        'jot-blue-200': 'rgb(31,94,212)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
