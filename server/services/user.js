const md5 = require('md5');
const sgMail = require('@sendgrid/mail');
const { Personalization } = require('@sendgrid/helpers/classes');
const jwt = require('jsonwebtoken');
const { knex } = require('../database');
const { generate } = require('../utils/string');
const { UsersModel, InvitedUsersModel } = require('../database');
const { templateId, emailFrom } = require('../config/email.json');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const findUserLocal = async (email, password) => {
  return UsersModel
    .query()
    .findOne({ email, password: md5(password), status: 'active' })
    .select('id', 'externalId', 'status', 'name', 'email', 'picture');
};

const findOAuthUser = async (externalId, email) => {
  return UsersModel
    .query()
    .findOne((builder) => {
      const build = builder.where({ externalId });
      if (email) {
        build.orWhere({ email });
      }

      return build;
    })
    .select('id', 'externalId', 'status', 'name', 'email', 'picture');
};

const createOAuthUser = async (id, name, email, picture) => {
  return UsersModel.query().insert({
    externalId: id,
    name,
    email,
    picture,
    status: 'active',
  });
};

const createTempUser = async () => {
  const userObj = await UsersModel.query().insert({ status: 'invited' });
  const user = userObj.toJSON();

  delete user.password;

  return user;
};

const updateUser = async (id, userData = {}) => {
  const userObj = await UsersModel.query().updateAndFetchById(id, userData);
  if (!userObj) {
    throw new Error('User not found');
  }

  const user = userObj.toJSON();
  delete user.password;

  return user;
};

const checkUserByEmail = async (email) => {
  const user = await UsersModel.query().findOne({ email });
  return Boolean(user);
};

const inviteUser = async ({ name, email }) => {
  const password = generate(10);
  const code = generate(16);

  const user = await UsersModel.query().insert({
    name,
    email,
    password: md5(password),
    status: 'invited',
  });

  await createInvation(user.id, code);

  return sendMail({ email, name, password, code });
};

const createInvation = async (userId, code) => {
  return InvitedUsersModel.query().insert({
    userId,
    code,
  });
};

const sendMail = async ({ email, name, password, code }) => {
  const link = `${process.env.BROWSER_BASE_URL}/auth/activate?code=${code}`;
    
  const personalization = new Personalization({
    to: email,
    dynamicTemplateData: {
      name,
      password,
      link,
    },
  });

  const msgData = {
    templateId,
    from: emailFrom,
    personalizations: [personalization.toJSON()],
  };
  
  return sgMail.send(msgData);
};

const authUser = async (user) => {
  await UsersModel.query().findById(user.id).patch({ 
    lastLogin: knex.raw('now()'),
  });

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

const validateUser = async (token) => {
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
  findOAuthUser,
  createOAuthUser,
  createTempUser,
  updateUser,
  authUser,
  validateUser,
  checkUserByEmail,
  inviteUser,
  createInvation,
  sendMail,
};
