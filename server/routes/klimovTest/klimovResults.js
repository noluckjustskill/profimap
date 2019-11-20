const { getProfileResult } = require('../../services/testKlimov');

const KlimovResultsController = async (ctx) => {
  ctx.body = await getProfileResult(ctx.user.id);
};

const KlimovResultsRoute = '/klimovResults';

module.exports = {
  KlimovResultsController,
  KlimovResultsRoute,
};
