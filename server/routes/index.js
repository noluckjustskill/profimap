const Router = require('koa-router');
const MidleWare = require('../middleware');
const { MeController, MeRoute } = require('./me');
const { LoginController } = require('./login');

const router = new Router();

router.use('/api/*', MidleWare);
router.get(`/api${MeRoute}`, MeController);
router.post('/auth/login', LoginController);

module.exports = router;
