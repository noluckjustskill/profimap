const { get } = require('lodash');
const md5 = require('md5');

const { generate } = require('../utils/string');
const { UsersModel, AuthUsersModel } = require('../database');

const LoginController = async (ctx) => {
  const { email, password } = get(ctx, 'request.body', {});
  const user = await UsersModel.query().findOne({ email, password: md5(password) });

  if (!user) {
    ctx.status = 401;
    return;
  }

  const token = generate(32);
  await AuthUsersModel.query().insert({ user_id: user.id, token });

  ctx.body = { token };
};
  
module.exports = {
  LoginController,
};
