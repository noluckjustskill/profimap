const { get } = require('lodash');
const { CheckFeedBack } = require('../services/feedback');


const RouteFeedBackController = async (ctx) => {
  const path = get(ctx, 'request.query.path', '/');
  
  const row = await CheckFeedBack(ctx.user.id, path);

  ctx.body = { exists: Boolean(row) };
};

const RouteFeedBackRoute = '/routeFeedback';

module.exports = {
  RouteFeedBackController,
  RouteFeedBackRoute
};
