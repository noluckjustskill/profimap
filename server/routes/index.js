const Router = require('koa-router');
const MidleWare = require('../middleware');
const { MeController, MeRoute } = require('./me');
const { LoginController } = require('./login');
const { SoftSkillsController, SoftSkillsRoute } = require('./softSkills');
const { UserIsAuth } = require('../middleware/user');
const {
  GoogleAuthController,
  GoogleAuthRedirectController,
  GooglePassportController
} = require('./google');
const { GetGollandController, GetGollandRoute } = require('./gollandTest/getGolland');
const { PostGollandController, PostGollandRoute } = require('./gollandTest/postGolland');

const router = new Router();

router.post('/auth/login', LoginController);
router.get('/auth/google', UserIsAuth, GoogleAuthController);
router.get('/auth/google-redirect', GooglePassportController, GoogleAuthRedirectController);

router.use('/api/*', MidleWare);
router.get(`/api${MeRoute}`, MeController);
router.get(`/api${SoftSkillsRoute}`, SoftSkillsController);
router.get(`/api${GetGollandRoute}`, GetGollandController);
router.post(`/api${PostGollandRoute}`, PostGollandController);

module.exports = router;
