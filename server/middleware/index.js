const { UsersModel, AuthUsersModel } = require('../database');
const { get, split, nth } = require('lodash');

const validateUser = async (token) => {
  // TODO: use join
  const authUser = await AuthUsersModel.query().findOne({token});
  const userId = get(authUser, 'user_id');

  if (!userId) return false;

  const user = await UsersModel.query().findById(userId);

  return user;
};

module.exports = async (ctx, next) => {
  try {
    const { authorization } = ctx.headers;
    const auth = nth(split(authorization, ' '), 1); // NUXT put fucking prerfix
    const user = await validateUser(auth);

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
