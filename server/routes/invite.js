const { BadRequestError, ConflictError } = require('http-custom-errors');
const { get } = require('lodash');
const md5 = require('md5');
const { authUser, checkUserByEmail, updateUser, createInvation, sendMail } = require('../services/user');
const { generate } = require('../utils/string');
const { badParams, emailIsExists } = require('../config/email.json');

const InviteController = async (ctx) => {
  const { name, email } = get(ctx, 'request.body', {});
  if (!name || !email) {
    throw new BadRequestError(badParams);
  }

  if (await checkUserByEmail(email)) {
    throw new ConflictError(emailIsExists);
  }

  const password = generate(10);
  const code = generate(16);

  const updatedUser = await updateUser(ctx.user.id, { name, email, password: md5(password) });
  await createInvation(ctx.user.id, code);
  await sendMail({ email, name, password, code });

  ctx.body = { token: await authUser(updatedUser) };
  ctx.cookies.set('newToken', null);
};

const InviteRoute = '/invite';

module.exports = {
  InviteController,
  InviteRoute
};
