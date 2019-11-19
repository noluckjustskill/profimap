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
    const status = Number(err.code);
    if (status) {
      ctx.status = status;
      ctx.body = err.message;
    } else {
      ctx.status = 500;
    }

    ctx.app.emit('error', err, ctx);
  }
};
