const { get } = require('lodash');
const { insertResult } = require('../../services/testKlimov');

const PostKlimovController = async (ctx) => {
  const result = get(ctx, 'request.body.result', []);
  ctx.body = await insertResult(ctx.user.id, result);
};

const PostKlimovRoute = '/postKlimov';

module.exports = {
  PostKlimovController,
  PostKlimovRoute,
};
