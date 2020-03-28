const { get } = require('lodash');
const { SendFeedback } = require('../services/feedback');
const { BadRequestError } = require('http-custom-errors');
const { checkRecaptchaToken } = require('../services/googleCaptcha');


const SendFeedBackController = async (ctx) => {
  const { rate, path, message, recaptchaToken } = get(ctx, 'request.body', {});
  
  if (!(await checkRecaptchaToken(recaptchaToken))) {
    throw new BadRequestError('reCaptcha error');
  }
  
  await SendFeedback({ userId: ctx.user.id, path, rate: parseInt(rate), message });

  ctx.body = { message: 'OK' };
};

const SendFeedBackRoute = '/sendFeedback';

module.exports = {
  SendFeedBackController,
  SendFeedBackRoute
};
