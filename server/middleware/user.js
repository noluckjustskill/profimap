const { get } = require('lodash');
const { validateUser } = require('../services/user');

const UserIsAuth = async (ctx, next) => {
  try {
    const token = get(ctx, 'headers.authorization', ctx.cookies.get('auth.local'));
    const user = await validateUser(token);

    if (user) {
      ctx.redirect('/');
      return;
    }

    await next();
  } catch (err) {
    const status = Number(err.code);
    if (status) {
      ctx.status = status;
      ctx.body = err.message;
    } else {
      ctx.status = 500;
      ctx.app.emit('error', err, ctx);
    }
  }
};

module.exports = {
  UserIsAuth,
};
