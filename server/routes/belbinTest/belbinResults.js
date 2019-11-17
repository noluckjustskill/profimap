const { getProfileResult } = require('../../services/testBelbin');

const BelbinResultsController = async (ctx) => {
  ctx.body = await getProfileResult(ctx.user.id);
};

const BelbinResultsRoute = '/belbinResults';

module.exports = {
  BelbinResultsController,
  BelbinResultsRoute,
};
