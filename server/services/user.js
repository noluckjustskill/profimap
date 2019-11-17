const md5 = require('md5');
const { UsersModel } = require('../database');
const jwt = require('jsonwebtoken');
const { get } = require('lodash');

const findUserLocal = async (email, password) => {
  return UsersModel
    .query()
    .findOne({ email, password: md5(password) })
    .select('id', 'externalId', 'name', 'email', 'picture');
};

const findOAtuhUser = async (id) => {
  return UsersModel
    .query()
    .findOne({ externalId: id, password: null })
    .select('id', 'externalId', 'name', 'email', 'picture');
};

const createOAuthUser = async (id, name, email, picture) => {
  return UsersModel.query().insert({
    externalId: id,
    name,
    email,
    picture,
  });
};

const AuthUser = async (user) => {
  const token = jwt.sign(
    user,
    process.env.JWT_SECRET,
    {
      algorithm: 'HS512',
      expiresIn: Number(process.env.JWT_EXPIRED_TIME),
    }
  );
  
  return token;
};

const validateUser = async (ctx) => {
  const token = get(ctx, 'headers.authorization', ctx.cookies.get('auth.local'));

  if (!token) {
    return false;
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports = {
  findUserLocal,
  findOAtuhUser,
  createOAuthUser,
  AuthUser,
  validateUser,
};
