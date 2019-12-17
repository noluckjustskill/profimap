const { get } = require('lodash');

const UserService = require('../services/user');

const LoginController = async (ctx) => {
  const { email, password } = get(ctx, 'request.body', {});
  const user = await UserService.findUserLocal(email, password);

  if (!user) {
    ctx.status = 401;
    return;
  }

  const token = await UserService.authUser(user.toJSON());

  ctx.body = { token };
};
  
module.exports = {
  LoginController,
};
