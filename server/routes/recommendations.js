const { getRecommendations } = require('../services/recommendations');

const RecommendationsController = async (ctx) => {
  ctx.body = await getRecommendations(ctx.user.id);
};
  
const RecommendationsRoute = '/recommendations';
  
module.exports = {
  RecommendationsController,
  RecommendationsRoute
};
