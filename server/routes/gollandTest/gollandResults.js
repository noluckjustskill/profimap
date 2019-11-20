const { getProfileResult } = require('../../services/testGolland');

const GollandResultsController = async (ctx) => {
  ctx.body = await getProfileResult(ctx.user.id);
};

const GollandResultsRoute = '/gollandResults';

module.exports = {
  GollandResultsController,
  GollandResultsRoute,
};
