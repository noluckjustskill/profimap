const { get } = require('lodash');
const { validateUser } = require('../services/user');

const UserIsAuth = async (ctx, next) => {
  const token = get(ctx, 'headers.authorization', ctx.cookies.get('auth.local'));
  const user = await validateUser(token);

  if (user) {
    ctx.redirect('/');
    return;
  }

  next();
};

module.exports = {
  UserIsAuth,
};
