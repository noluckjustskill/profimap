const Router = require('koa-router');
const MidleWare = require('../middleware');
const { MeController, MeRoute } = require('./me');
const { LoginController } = require('./login');
const { UserIsAuth } = require('../middleware/user');
const {
  GoogleAuthController,
  GoogleAuthRedirectController,
  GooglePassportController
} = require('./google');

const router = new Router();

router.use('/api/*', MidleWare);
router.get(`/api${MeRoute}`, MeController);
router.get('/auth/google', UserIsAuth, GoogleAuthController);
router.get('/auth/google-redirect', GooglePassportController, GoogleAuthRedirectController);
router.post('/auth/login', LoginController);

module.exports = router;
