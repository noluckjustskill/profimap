const { validateUser } = require('../services/user');
const { UnauthorizedError } = require('http-custom-errors');

module.exports = async (ctx, next) => {
  try {
    const user = await validateUser(ctx);

    if (!user) {
      throw new UnauthorizedError('Not authorized');
    }

    delete user.password;
    ctx.user = user;

    await next();
  } catch (err) {
    ctx.status = err.code || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
