const { CreatePaymentUrl, HandleResult } = require('../services/robokassa');

const PayController = async(ctx) => {
  if (ctx.user.paid) {
    ctx.redirect('/');
    return;
  }

  try {
    const paymentUrl = await CreatePaymentUrl(ctx.user);
    ctx.redirect(paymentUrl);
  } catch (error) {
    console.error('Payment error: ', error);
    ctx.redirect('/api/failed-pay');
  }
};

const PayRoute = '/pay';

const RequestPayController = async(ctx) => {
  try {
    const invoiceId = await HandleResult(ctx.request);
    ctx.body = `OK${invoiceId}\n`;
  } catch (error) {
    console.error('Handle result error: ', error);
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
