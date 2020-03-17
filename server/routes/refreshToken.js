const { refreshToken } = require('../services/user');

const RefreshTokenController = async (ctx) => {
  ctx.body = { token: await refreshToken(ctx.user.id) };
};

const RefreshTokenRoute = '/refresh-token';
  
module.exports = {
  RefreshTokenController,
  RefreshTokenRoute,
};
