const pages = require('./dynamicpages.json');

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cdc data api',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/pnmg', href: '/favicon.png' },
      { rel: 'preconnect', href:'https://fonts.gstatic.com'},
      { rel: 'preload', href:'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Nunito+Sans:wght@400;700&display=swap', as:'style', onload: 'this.onload=null;this.rel=\'stylesheet\''},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-W776RZK'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  pwa: {
    "theme_color": '#1395ba'
  },
  generate: {
    routes(){
      let states = pages.map(state => {
        let uri = (state.location).toLowerCase()
            uri = uri.replace(/ /g, '_');
        return{
          route: '/social-image/' + uri,
          payload: state
        }
      });
      let images = pages.map(state => {
        let uri = (state.location).toLowerCase()
            uri = uri.replace(/ /g, '_');
        return{
          route: '/' + uri,
          payload: state
        }
      });
      return Promise.all([states,images]).then(values => {
        return [...values[0], ...values[1]]
      })  
    }
  },
  sitemap: {
    hostname: 'https://covidcasesbythenumbers.com',
    exclude: [
      '/social-image/**'
    ]
  }
}
