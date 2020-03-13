const { checkProfileProgress } = require('../services/user');

const ProgressCounterController = async (ctx) => {
  ctx.body = { progress: await checkProfileProgress(ctx.user) };
};

const ProgressCounterRoute = '/progress-counter';

module.exports = {
  ProgressCounterController,
  ProgressCounterRoute,
};
