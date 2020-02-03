const { getProfileRecommendations } = require('../../services/testGolland');

const GollandRecommendationsController = async (ctx) => {
  ctx.body = await getProfileRecommendations(ctx.user.id);
};

const GollandRecommendationsRoute = '/gollandRecommendations';

module.exports = {
  GollandRecommendationsController,
  GollandRecommendationsRoute,
};
