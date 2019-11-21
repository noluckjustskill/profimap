const { getProfileResult } = require('../../services/testDisk');

const DiskResultsController = async (ctx) => {
  ctx.body = await getProfileResult(ctx.user.id);
};

const DiskResultsRoute = '/diskResults';

module.exports = {
  DiskResultsController,
  DiskResultsRoute,
};
