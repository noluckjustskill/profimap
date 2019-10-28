const md5 = require('md5');
const { UsersModel, AuthUsersModel } = require('../database');
const { generate } = require('../utils/string');
const { get, split, nth } = require('lodash');

const findUserLocal = async (email, password) => {
  return UsersModel.query().findOne({ email, password: md5(password) });
};

const findOAtuhUser = async (id) => {
  return UsersModel.query().findOne({ externalId: id, password: null });
};

const createOAuthUser = async (id, name, email, picture) => {
  return UsersModel.query().insert({
    externalId: id,
    name,
    email,
    picture,
  });
};

const AuthUser = async (id) => {
  const token = generate(32);
  await AuthUsersModel.query().insert({ userId: id, token });
  
  return token;
};

const validateUser = async (ctx) => {
  const authorization = get(ctx, 'headers.authorization', ctx.cookies.get('auth._token.local'));
  const token = nth(split(decodeURIComponent(authorization), ' '), 1); // NUXT put fucking prerfix

  if (!token) {
    return false;
  }
  
  // TODO: use join
  const authUser = await AuthUsersModel.query().findOne({token});
  const userId = authUser && authUser.userId;

  if (!userId) return false;

  const user = await UsersModel.query().findById(userId);

  return user;
};

module.exports = {
  findUserLocal,
  findOAtuhUser,
  createOAuthUser,
  AuthUser,
  validateUser,
};
