const { getProfileType, getRecommendations } = require('../services/testGolland');

const RecommendationsController = async (ctx) => {
  const profileType = await getProfileType(ctx.user.id);
  const recommendations = [];

  if (profileType) {
    const profileRecommendations = await getRecommendations(profileType.name);
    recommendations.push(...profileRecommendations);
  }

  ctx.body = recommendations;
};

const RecommendationsRoute = '/recommendations';

module.exports = {
  RecommendationsController,
  RecommendationsRoute
};
