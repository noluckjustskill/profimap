const MeController = async (ctx) => {
  ctx.body = { me: ctx.user };
};

const MeRoute = '/me';

module.exports = {
  MeController,
  MeRoute,
};
