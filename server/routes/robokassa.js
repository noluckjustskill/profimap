const { get } = require('lodash');
const { CreatePaymentUrl, HandleResult } = require('../services/robokassa');

const PayController = async(ctx) => {
  if (ctx.user.paid) {
    ctx.redirect('/');
    return;
  }

  const code = get(ctx, 'request.query.code', null);

  try {
    const paymentUrl = await CreatePaymentUrl(ctx.user, code);
    ctx.redirect(paymentUrl);
  } catch (error) {
    logger.log('error', `Payment error: ${JSON.stringify(error)}`);
    ctx.redirect('/failed-pay');
  }
};

const PayRoute = '/pay';

const RequestPayController = async(ctx) => {
  try {
    const invoiceId = await HandleResult(ctx.request);
    ctx.body = `OK${invoiceId}\n`;
  } catch (error) {
    logger.log('error', `Handle result error: ${JSON.stringify(error)}`);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

const RequestPayRoute = '/request';

module.exports = {
  PayController,
  PayRoute,
  RequestPayController,
  RequestPayRoute,
};
