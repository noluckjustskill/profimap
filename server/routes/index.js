const Router = require('koa-router');
const morgan = require('koa-morgan');
const MiddleWare = require('../middleware');
const PaidUser = require('../middleware/paid');
const { MeController, MeRoute } = require('./me');
const { InviteController, InviteRoute } = require('./invite');
const { SignupController } = require('./signup');
const { ActivateController } = require('./activate');
const { LoginController } = require('./login');
const { UserIsAuth } = require('../middleware/user');
const {
  GoogleAuthController,
  GoogleAuthRedirectController,
  GooglePassportController
} = require('./google');
const {
  VkontakteAuthController,
  VkontakteAuthRedirectController,
  VkontaktePassportController
} = require('./vkontakte');

const { CanContinueController, CanContinueRoute } = require('./canContinue');
const { SuccessPayController, SuccessPayRoute } = require('./successPay');

const { GollandResultsController, GollandResultsRoute } = require('./gollandTest/gollandResults');
const { GetGollandController, GetGollandRoute } = require('./gollandTest/getGolland');
const { PostGollandController, PostGollandRoute } = require('./gollandTest/postGolland');
const { GollandProfileController, GollandProfileRoute } = require('./gollandTest/gollandProfile');

const { RecommendationsController, RecommendationsRoute } = require('./recommendations');
const { ProfessionController, ProfessionRoute } = require('./profession');
const { UniversitiesController, UniversitiesRoute, CitiesController, CitiesRoute } = require('./universities');

const { KlimovResultsController, KlimovResultsRoute } = require('./klimovTest/klimovResults');
const { GetKlimovController, GetKlimovRoute } = require('./klimovTest/getKlimov');
const { PostKlimovController, PostKlimovRoute } = require('./klimovTest/postKlimov');

const { BelbinResultsController, BelbinResultsRoute } = require('./belbinTest/belbinResults');
const { GetBelbinController, GetBelbinRoute } = require('./belbinTest/getBelbin');
const { PostBelbinController, PostBelbinRoute } = require('./belbinTest/postBelbin');

const { DiskResultsController, DiskResultsRoute } = require('./diskTest/diskResults');
const { GetDiskController, GetDiskRoute } = require('./diskTest/getDisk');
const { PostDiskController, PostDiskRoute } = require('./diskTest/postDisk');

const { SendFeedBackController, SendFeedBackRoute } = require('./sendFeedback');
const { RouteFeedBackController, RouteFeedBackRoute } = require('./routeFeedback');

const { AvatarUploadController, AvatarUploadRoute } = require('./avatarUpload');
const { UpdateUserController, UpdateUserRoute } = require('./updateUser');

const { ProgressCounterController, ProgressCounterRoute } = require('./progressCounter');

const { ImageCacheController } = require('./imagesCache');

const { PayController, PayRoute, RequestPayController, RequestPayRoute } = require('./robokassa');

const router = new Router();
const RequestLogger = morgan(':method :url :status :res[content-length] - :response-time ms');

router.use('/auth/*', RequestLogger);

router.post('/auth/signup', SignupController);
router.post('/auth/login', LoginController);
router.get('/auth/activate', UserIsAuth, ActivateController);

router.get('/auth/google', UserIsAuth, GoogleAuthController);
router.get('/auth/google-redirect', GooglePassportController, GoogleAuthRedirectController);

router.get('/auth/vkontakte', UserIsAuth, VkontakteAuthController);
router.get('/auth/vkontakte-redirect', VkontaktePassportController, VkontakteAuthRedirectController);

router.use('/api/*', RequestLogger, MiddleWare);

router.post('/api/signup', SignupController);
router.get(`/api${MeRoute}`, MeController);

router.post(`/api${InviteRoute}`, InviteController);
router.get(`/api${CanContinueRoute}`, CanContinueController);

router.get(`/api${GollandResultsRoute}`, GollandResultsController);
router.get(`/api${GetGollandRoute}`, GetGollandController);
router.post(`/api${PostGollandRoute}`, PostGollandController);
router.get(`/api${GollandProfileRoute}`, GollandProfileController);

router.get(`/api${RecommendationsRoute}`, PaidUser, RecommendationsController);
router.get(`/api${ProfessionRoute}`, ProfessionController);
router.get(`/api${UniversitiesRoute}`, UniversitiesController);
router.get(`/api${CitiesRoute}`, CitiesController);

router.get(`/api${KlimovResultsRoute}`, KlimovResultsController);
router.get(`/api${GetKlimovRoute}`, GetKlimovController);
router.post(`/api${PostKlimovRoute}`, PostKlimovController);

router.get(`/api${BelbinResultsRoute}`, BelbinResultsController);
router.get(`/api${GetBelbinRoute}`, GetBelbinController);
router.post(`/api${PostBelbinRoute}`, PostBelbinController);

router.get(`/api${DiskResultsRoute}`, DiskResultsController);
router.get(`/api${GetDiskRoute}`, GetDiskController);
router.post(`/api${PostDiskRoute}`, PostDiskController);

router.get(`/api${RouteFeedBackRoute}`, RouteFeedBackController);
router.post(`/api${SendFeedBackRoute}`, SendFeedBackController);

router.post(`/api${AvatarUploadRoute}`, AvatarUploadController);
router.post(`/api${UpdateUserRoute}`, UpdateUserController);

router.get(`/api${ProgressCounterRoute}`, ProgressCounterController);

router.get(`/api${PayRoute}`, PayController);
router.get(`/api${SuccessPayRoute}`, SuccessPayController);

router.post(`/pay${RequestPayRoute}`, RequestLogger, RequestPayController);
router.get(`/cache${process.env.STATIC_URL}/:name`, ImageCacheController);

module.exports = router;
