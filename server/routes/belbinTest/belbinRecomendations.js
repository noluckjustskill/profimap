const { getProfileRecommendations } = require('../../services/testBelbin');

const BelbinRecommendationsController = async (ctx) => {
  ctx.body = await getProfileRecommendations(ctx.user.id);
};

const BelbinRecommendationsRoute = '/belbinRecommendations';

module.exports = {
  BelbinRecommendationsController,
  BelbinRecommendationsRoute,
};
