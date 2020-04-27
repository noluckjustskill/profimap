require('dotenv').config();

module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    RELEASE_NAME: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'keywords', content: 'профориентация тест, тест на профориентацию бесплатно онлайн, профориентация для школьников, центр профориентации, профессии, выбрать профессию, профессии будущего, карьера' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat' },
    ],
  },
  manifest: {
    name: 'ProfiMap',
    short_name: 'ProfiMap',
    lang: 'ru',
    start_url: '/',
    display: 'standalone',
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@mdi/font/css/materialdesignicons.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/dynamicColor',
    '~/plugins/constants',
    { src: '~/plugins/sentry', mode: 'client' },
    { src: '~/plugins/base64Image', mode: 'client' },
    { src: '~/plugins/cookies', mode: 'client' },
    { src: '~/plugins/recaptcha', mode: 'client' },
    { src: '~/plugins/vue-typed', mode: 'client' },
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
    ['nuxt-rfg-icon', { masterPicture: './assets/logo-big.png' }],
    ['@nuxtjs/robots', process.env.NODE_ENV === 'production' ? {
      UserAgent: '*',
      Allow: '/tests',
      Disallow: '/',
    } : {
      UserAgent: '*',
      Disallow: '/',
    }],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: Number(process.env.YANDEX_METRIKA),
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }
    ],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${process.env.BASE_URL}/api`,
    browserBaseURL: `${process.env.BROWSER_BASE_URL}/api`,
  },
  auth: {
    token: {
      prefix: '',
    },
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
          login: { url: `${process.env.BROWSER_BASE_URL}/auth/login`, method: 'post', propertyName: 'token' },
          user: { url: `${process.env.BROWSER_BASE_URL}/api/me`, method: 'get', propertyName: 'me' },
          logout: false,
        },
        tokenType: false,
      }
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Roboto',
      },
      icons: false,
    },
    theme: {
      themes: {
        light: {
          primary: '#E23B3B',
          minor: '#F6CAAE',
          secondary: '#b0bec5',
          accent: '#1782FF',
          error: '#b71c1c',
          background: '#ffffff',
          dark: '#000000',
        }
      },
      minifyTheme: css => {
        return process.env.NODE_ENV === 'production'
          ? css.replace(/[\r\n|\r|\n]/g, '')
          : css;
      },
    }
  },
  render: {
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
        .filter(f => f.asType === 'script' && f.file === 'runtime.js')
        .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },
  /*
  ** Build configuration
  */
  build: {
    extend(config, { isDev, isClient }) {}
  }
};
