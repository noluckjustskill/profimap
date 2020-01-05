const { checkProfileProgress } = require('../services/user');

const CanContinueController = async (ctx) => {
  if (await checkProfileProgress(ctx.user)) {
    ctx.body = { error: 'Can not continue' };
    return;
  }

  ctx.body = { message: 'OK' };
};

const CanContinueRoute = '/can-continue';

module.exports = {
  CanContinueController,
  CanContinueRoute,
};
