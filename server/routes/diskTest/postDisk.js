const { get } = require('lodash');
const { insertResult } = require('../../services/testDisk');

const PostDiskController = async (ctx) => {
  const result = get(ctx, 'request.body.result', []);
  ctx.body = await insertResult(ctx.user.id, result);
};

const PostDiskRoute = '/postDisk';

module.exports = {
  PostDiskController,
  PostDiskRoute,
};
