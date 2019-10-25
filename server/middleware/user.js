const { validateUser } = require('../services/user');

const UserIsAuth = async (ctx, next) => {
  const user = await validateUser(ctx);

  if (user) {
    ctx.redirect('/');
    return;
  }

  next();
};

module.exports = {
  UserIsAuth,
};
