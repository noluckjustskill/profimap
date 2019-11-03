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


const { GollandResultsController, GollandResultsRoute } = require('./gollandTest/gollandResults');
const { GetGollandController, GetGollandRoute } = require('./gollandTest/getGolland');
const { PostGollandController, PostGollandRoute } = require('./gollandTest/postGolland');
const { RecommendationsController, RecommendationsRoute } = require('./recommendations');

const { KlimovResultsController, KlimovResultsRoute } = require('./klimovTest/klimovResults');
const { GetKlimovController, GetKlimovRoute } = require('./klimovTest/getKlimov');
const { PostKlimovController, PostKlimovRoute } = require('./klimovTest/postKlimov');

const router = new Router();

router.post('/auth/login', LoginController);
router.get('/auth/google', UserIsAuth, GoogleAuthController);
router.get('/auth/google-redirect', GooglePassportController, GoogleAuthRedirectController);

router.use('/api/*', MidleWare);
router.get(`/api${MeRoute}`, MeController);

router.get(`/api${GollandResultsRoute}`, GollandResultsController);
router.get(`/api${GetGollandRoute}`, GetGollandController);
router.post(`/api${PostGollandRoute}`, PostGollandController);
router.get(`/api${RecommendationsRoute}`, RecommendationsController);

router.get(`/api${KlimovResultsRoute}`, KlimovResultsController);
router.get(`/api${GetKlimovRoute}`, GetKlimovController);
router.post(`/api${PostKlimovRoute}`, PostKlimovController);

module.exports = router;
