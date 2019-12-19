const { get } = require('lodash');

const UserService = require('../services/user');

const LoginController = async (ctx) => {
  try {
    const { email, password } = get(ctx, 'request.body', {});
    const user = await UserService.findUserLocal(email, password);

    if (!user) {
      ctx.status = 401;
      return;
    }

    const token = await UserService.authUser(user.toJSON());

    ctx.body = { token };
  } catch (err) {
    ctx.status = err.code || 500;
    ctx.body = { error: err.message };  
  }
};
  
module.exports = {
  LoginController,
};
