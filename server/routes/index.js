const Router = require('koa-router');
const MiddleWare = require('../middleware');
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
const { GollandProfileController, GollandProfileRoute } = require('./gollandTest/gollandProfile');
const { RecommendationsController, RecommendationsRoute } = require('./recommendations');
const { ProfessionController, ProfessionRoute } = require('./profession');

const { KlimovResultsController, KlimovResultsRoute } = require('./klimovTest/klimovResults');
const { GetKlimovController, GetKlimovRoute } = require('./klimovTest/getKlimov');
const { PostKlimovController, PostKlimovRoute } = require('./klimovTest/postKlimov');

const { BelbinResultsController, BelbinResultsRoute } = require('./belbinTest/belbinResults');
const { GetBelbinController, GetBelbinRoute } = require('./belbinTest/getBelbin');
const { PostBelbinController, PostBelbinRoute } = require('./belbinTest/postBelbin');

const { DiskResultsController, DiskResultsRoute } = require('./diskTest/diskResults');
const { GetDiskController, GetDiskRoute } = require('./diskTest/getDisk');
const { PostDiskController, PostDiskRoute } = require('./diskTest/postDisk');

const router = new Router();

router.post('/auth/login', LoginController);
router.get('/auth/google', UserIsAuth, GoogleAuthController);
router.get('/auth/google-redirect', GooglePassportController, GoogleAuthRedirectController);

router.use('/api/*', MiddleWare);
router.get(`/api${MeRoute}`, MeController);

router.get(`/api${GollandResultsRoute}`, GollandResultsController);
router.get(`/api${GetGollandRoute}`, GetGollandController);
router.post(`/api${PostGollandRoute}`, PostGollandController);
router.get(`/api${GollandProfileRoute}`, GollandProfileController);
router.get(`/api${RecommendationsRoute}`, RecommendationsController);
router.get(`/api${ProfessionRoute}`, ProfessionController);

router.get(`/api${KlimovResultsRoute}`, KlimovResultsController);
router.get(`/api${GetKlimovRoute}`, GetKlimovController);
router.post(`/api${PostKlimovRoute}`, PostKlimovController);

router.get(`/api${BelbinResultsRoute}`, BelbinResultsController);
router.get(`/api${GetBelbinRoute}`, GetBelbinController);
router.post(`/api${PostBelbinRoute}`, PostBelbinController);

router.get(`/api${DiskResultsRoute}`, DiskResultsController);
router.get(`/api${GetDiskRoute}`, GetDiskController);
router.post(`/api${PostDiskRoute}`, PostDiskController);

module.exports = router;
