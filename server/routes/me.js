const { findUserById } = require('../services/user');

const MeController = async (ctx) => {
  ctx.body = { me: await findUserById(ctx.user.id) };
};

const MeRoute = '/me';

module.exports = {
  MeController,
  MeRoute,
};
