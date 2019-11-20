const { get } = require('lodash');
const { insertResult } = require('../../services/testGolland');

const PostGollandController = async (ctx) => {
  const result = get(ctx, 'request.body.result', []);
  
  ctx.body = await insertResult(ctx.user.id, result);
};

const PostGollandRoute = '/postGolland';

module.exports = {
  PostGollandController,
  PostGollandRoute,
};
