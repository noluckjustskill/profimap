const { refreshToken } = require('../services/user');

const SuccessPayController = async (ctx) => {
  try {
    const token = await refreshToken(ctx.user.id);
    ctx.redirect(`/login?token=${token}`);
  } catch (err) {
    logger.log('error', err);
    ctx.redirect('/');
  }
};

const SuccessPayRoute = '/success-pay';
  
module.exports = {
  SuccessPayController,
  SuccessPayRoute,
};
