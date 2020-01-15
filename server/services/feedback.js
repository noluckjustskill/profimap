const { BadRequestError } = require('http-custom-errors');
const { IncomingWebhook } = require('@slack/webhook');
const { FeedBackModel } = require('../database');
const { badFeedback, feedBackExists } = require('../config/feedback.json');

const SlackHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const SendFeedback = async ({
  userId,
  path = '/',
  rate,
  message = null,
}) => {
  const feedbackOnPathExists = await FeedBackModel.query().findOne({ userId, path });

  if (feedbackOnPathExists) {
    throw new BadRequestError(feedBackExists);
  }

  if (!rate) {
    throw new BadRequestError(badFeedback);
  }

  if (rate < 1 || rate > 5 || (message && message.length > 256)) {
    throw new BadRequestError();
  }

  const stars = new Array(rate).fill(':star:').join('');

  await SlackHook.send({
    text: `*User id:* ${userId}\n*URL:* ${path}\n*Rate:* ${stars}\n*Message:* ${message || '_none_'}`,
  }).catch(err => console.error(err));

  return FeedBackModel.query().insert({
    userId,
    path,
    rate,
    message,
  });
};

const CheckFeedBack = async (userId, path) => {
  return FeedBackModel.query().findOne({ userId, path });
};

module.exports = {
  SendFeedback,
  CheckFeedBack,
};
