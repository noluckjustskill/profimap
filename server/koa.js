const Koa = require('koa');
const passport = require('./services/passport');
const staticFolder = require('koa-static');
const mount = require('koa-mount');
const koaBody = require('koa-body');
const router = require('./routes/index');

const app = new Koa();

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Init routes
app.use(koaBody({ multipart: true, jsonLimit: 10 * 1024 * 1024, formidable: { maxFieldsSize: 10 * 1024 * 1024 } }));
app.use(router.routes()).use(router.allowedMethods());

// Static folder
app.use(mount(process.env.STATIC_URL, staticFolder(process.env.STATIC_DIR)));

module.exports = app;
