const md5 = require('md5');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const { Personalization } = require('@sendgrid/helpers/classes');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('http-custom-errors');
const { generate } = require('../utils/string');
const {
  knex,
  UsersModel,
  InvitedUsersModel,
  GollandResultsModel,
  KlimovResultsModel,
  BelbinResultsModel,
  DiskResultsModel,
} = require('../database');
const { templateId, emailFrom } = require('../config/email.json');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const validateUser = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    return null;
  }
};

const findUserById = async (id) => {
  return UsersModel
    .query()
    .findById(id)
    .select('id', 'externalId', 'status', 'paid', 'name', 'email', 'picture', 'gender', 'dateOfBirth');
};

const findUserLocal = async (email, password) => {
  return UsersModel
    .query()
    .findOne({ email, password: md5(password), status: 'active' })
    .select('id', 'externalId', 'status', 'paid', 'name', 'email', 'picture', 'gender', 'dateOfBirth');
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
    .select('id', 'externalId', 'status', 'paid', 'name', 'email', 'picture', 'gender', 'dateOfBirth');
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
  const newUser = await UsersModel.query().insert({ status: 'invited' });
  const user = (await UsersModel.query().findById(newUser.id)).toJSON();

  delete user.password;

  return user;
};

const updateOAuthUser = async (token, externalId, name, email, picture) => {
  const user = await validateUser(token);
  if (!user) {
    return createOAuthUser(externalId, name, email, picture);
  }

  return UsersModel.query().updateAndFetchById(user.id, {
    externalId,
    name,
    email,
    picture,
    status: 'active',
  });
};

const updateUser = async (id, userData = {}, findConditions = {}) => {
  if (userData.password) {
    userData.password = md5(userData.password);
  }

  const userObj = await UsersModel.query().findOne({ id, ...findConditions});
  if (!userObj) {
    throw new Error('User not found');
  }

  if (userData.picture && userObj.picture) {
    const fileName = userObj.picture.split('/').pop();
    fs.unlink(`${process.env.STATIC_DIR}/${fileName}`, err => {
      if (err) {
        logger.log('error', `CAN NOT DELETE ${fileName}: ${JSON.stringify(err)}`);
      }
    });
  }

  await UsersModel.query().updateAndFetchById(userObj.id, userData);

  const user = userObj.toJSON();
  delete user.password;

  return user;
};

const checkUserByEmail = async (email) => {
  const user = await UsersModel.query().findOne({ email });
  return Boolean(user);
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

const inviteUser = async ({ name, email, gender, dateOfBirth }) => {
  const password = generate(10);
  const code = generate(16);

  const user = await UsersModel.query().insert({
    name,
    email,
    gender,
    dateOfBirth,
    password: md5(password),
    status: 'invited',
  });

  await createInvation(user.id, code);

  return sendMail({ email, name, password, code });
};

const authUser = async (user) => {
  await UsersModel.query().findById(user.id).patch({ 
    lastLogin: knex.raw('now()'),
  }).catch((err) => logger.log('error', err));

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

const refreshToken = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return authUser(user.toJSON());
};

const checkProfileProgress = async (user) => {
  if (!user || (user.name !== 'guest' && user.status !== 'active')) return 0;
  const allModels = [GollandResultsModel, KlimovResultsModel, BelbinResultsModel, DiskResultsModel];

  return Promise.all(
    allModels.map(model => model.query().where({ userId: user.id }).resultSize())
  ).then(results => results.filter(Boolean).length / allModels.length).catch(() => 0);
};

module.exports = {
  findUserById,
  findUserLocal,
  findOAuthUser,
  createOAuthUser,
  createTempUser,
  updateUser,
  updateOAuthUser,
  authUser,
  refreshToken,
  validateUser,
  checkProfileProgress,
  checkUserByEmail,
  inviteUser,
  createInvation,
  sendMail,
};
