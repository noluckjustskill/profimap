const { get } = require('lodash');
const { authUser, validateUser, createTempUser } = require('../services/user');
const { UnauthorizedError } = require('http-custom-errors');
const { notAuthorizedPath } = require('../config/auth.json');

module.exports = async (ctx, next) => {
  try {
    const token = get(ctx, 'headers.authorization', ctx.cookies.get('auth.local'));
    const user = await validateUser(token);

    if (!(user && user.status === 'active') && !notAuthorizedPath.includes(ctx.path)) {
      throw new UnauthorizedError('Not authorized');
    } else if (user && (user.status === 'active' || notAuthorizedPath.includes(ctx.path))) {
      ctx.user = user;
    } else if (notAuthorizedPath.includes(ctx.path)) {
      const newUser = await createTempUser();
      const newToken = await authUser(newUser);

      ctx.user = newUser;
      ctx.cookies.set('newToken', newToken, { maxAge: 24 * 60 * 60 * 1000 });
    }

    await next();
  } catch (err) {
    const status = Number(err.code);
    if (status) {
      ctx.status = status;
      ctx.body = { error: err.message };
    } else {
      ctx.status = 500;
      ctx.app.emit('error', err, ctx);
    }
  }
};
