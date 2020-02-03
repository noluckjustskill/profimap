const { getProfileRecommendations } = require('../../services/testKlimov');

const KlimovRecommendationsController = async (ctx) => {
  ctx.body = await getProfileRecommendations(ctx.user.id);
};

const KlimovRecommendationsRoute = '/klimovRecommendations';

module.exports = {
  KlimovRecommendationsController,
  KlimovRecommendationsRoute,
};
