const { get } = require('lodash');
const md5 = require('md5');
const { updateUser } = require('../services/user');

const UpdateUserController = async (ctx) => {
  const { name, gender, picture, dateOfBirth, password, currentPassword } = get(ctx, 'request.body', {});
  
  await updateUser(ctx.user.id, { name, gender, picture, dateOfBirth, password }, password && { password: md5(currentPassword) });

  ctx.body = { message: 'OK' };
};

const UpdateUserRoute = '/updateUser';

module.exports = {
  UpdateUserController,
  UpdateUserRoute
};
