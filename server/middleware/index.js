const { validateUser } = require('../services/user');

module.exports = async (ctx, next) => {
  try {
    const user = await validateUser(ctx);

    if (!user) {
      throw new Error('Not authorized');
    }

    delete user.password;
    ctx.user = user;

    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
