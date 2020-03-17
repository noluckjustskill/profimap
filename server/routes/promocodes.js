const { get } = require('lodash');
const { ActivatePromocode } = require('../services/promocodes');

const ActivatePromocodeController = async (ctx) => {
  if (ctx.user.paid) {
    ctx.body = { error: 'Уже полачено' };
    return;
  }

  const code = get(ctx, 'request.query.code');
  if (!code) {
    ctx.body = { error: 'Не указан промокод' };
    return;
  }

  try {
    await ActivatePromocode(ctx.user.id, code);
  } catch (err) {
    if (typeof err.code === 'number') {
      ctx.body = { error: err.message };
      return;
    } else {
      throw new Error();
    }
  }

  ctx.body = { message: 'OK' };
};

const ActivatePromocodeRoute = '/promocode';

module.exports = {
  ActivatePromocodeController,
  ActivatePromocodeRoute,
};
