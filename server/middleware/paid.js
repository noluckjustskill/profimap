const { ForbiddenError } = require('http-custom-errors');

module.exports = async (ctx, next) => {
  const user = ctx.user;
  if (!user || !user.paid) {
    throw new ForbiddenError('Forbidden route');
  }

  await next();
};
