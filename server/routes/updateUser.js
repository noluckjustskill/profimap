const { get } = require('lodash');
const { updateUser } = require('../services/user');

const UpdateUserController = async (ctx) => {
  const { name, gender, picture, dateOfBirth, password } = get(ctx, 'request.body', {});
  
  await updateUser(ctx.user.id, { name, gender, picture, dateOfBirth, password });

  ctx.body = { message: 'OK' };
};

const UpdateUserRoute = '/updateUser';

module.exports = {
  UpdateUserController,
  UpdateUserRoute
};
