require('dotenv').config();

<<<<<<< HEAD
<<<<<<< HEAD
=======
const { BASE_URL } = require('./config/http.json')[process.env.NODE_ENV];
=======
const BASE_URL = process.env.BASE_URL;
>>>>>>> Dev environment

>>>>>>> HTTP settigs
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/highcharts', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/'
    }],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${BASE_URL}/api`,
  },
  auth: {
    plugins: [
      '~/plugins/auth.js',
    ],
    redirect: {
      login: '/login',
      logout: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: `${BASE_URL}/auth/login`, method: 'post', propertyName: 'token' },
          user: { url: `${BASE_URL}/api/me`, method: 'get', propertyName: 'me' },
          logout: false,
        }
      }
    },
  },
  router: {
    middleware: ['auth'],
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#1782FF',
          error: '#b71c1c',
          background: '#ffffff',
          dark: '#000000',
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
};
