require('dotenv').config();

const Koa = require('koa');
const passport = require('./services/passport');
const bodyParser = require('koa-bodyparser');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const router = require('./routes/index');

const app = new Koa();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    HOST = '127.0.0.1',
    PORT = 3000,
  } = process.env;

  // Build in development
  if (app.env !== 'production') {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Init passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Init routes
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());

  // Init SSR
  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  //Start server
  app.listen(PORT, HOST);
  consola.ready({
    message: `Server listening on http://${HOST}:${PORT}`,
    badge: true
  });
}

start();
