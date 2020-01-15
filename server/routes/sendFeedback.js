const { get } = require('lodash');
const { SendFeedback } = require('../services/feedback');


const SendFeedBackController = async (ctx) => {
  const { rate, path, message } = get(ctx, 'request.body', {});
  
  await SendFeedback({ userId: ctx.user.id, path, rate: parseInt(rate), message });

  ctx.body = { message: 'OK' };
};

const SendFeedBackRoute = '/sendFeedback';

module.exports = {
  SendFeedBackController,
  SendFeedBackRoute
};
