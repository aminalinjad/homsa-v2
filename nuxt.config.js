import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - homsa',
    title: 'homsa',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    baseUrl: process.env.BASE_URL || 'https://api-dev-ex.ernyka.com/api/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '~/assets/style/abstract/fontiran.scss',
    // SCSS file in the project
    '~/assets/style/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  //   '@/plugins/axios',
  //   '@/plugins/histogram-slider',
  // ],

  plugins: [
    {src:'@/plugins/axios'},
    {src:'@/plugins/histogram-slider', mode:'client'},
    {src: '@/plugins/owl.js', mode:'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-leaflet',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // server
    baseURL: 'https://api-dev-ex.ernyka.com/api/',
    // baseURL: 'https://api-dev-ex.ernyka.com/api/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    credentials: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    treeShake: true,
    optionsPath: './vuetify.options.js',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
