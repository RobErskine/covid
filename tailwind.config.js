module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {
      colors:{
        primary: {
          DEFAULT: '#1395ba',
          dark: '#141e3c'
        },
        secondary: {
          DEFAULT: '#e57201'
        },
        gray: {
          lightest: '#fafafa',
          light: '#e9e9e9',
          DEFAULT: '#666',
          dark: '#333'
        }
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        serif: ['Montserrat','Georgia']
      },
    },
  },
  variants: {},
  plugins: [],
}
