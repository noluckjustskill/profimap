const { get } = require('lodash');
const { insertResult } = require('../../services/testBelbin');

const PostBelbinController = async (ctx) => {
  const result = get(ctx, 'request.body.result', {});
  ctx.body = await insertResult(ctx.user.id, result);
};

const PostBelbinRoute = '/postBelbin';

module.exports = {
  PostBelbinController,
  PostBelbinRoute,
};
