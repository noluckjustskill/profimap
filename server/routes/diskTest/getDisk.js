const { getTasks } = require('../../services/testDisk');

const GetDiskController = async (ctx) => {
  ctx.body = await getTasks();
};

const GetDiskRoute = '/getDisk';

module.exports = {
  GetDiskController,
  GetDiskRoute,
};
