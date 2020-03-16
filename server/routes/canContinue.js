const { checkProfileProgress } = require('../services/user');

const CanContinueController = async (ctx) => {
  if (ctx.user.status === 'guest' && await checkProfileProgress(ctx.user) > 0) {
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
