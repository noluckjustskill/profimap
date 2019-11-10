const { getTasks } = require('../../services/testGolland');

const GetGollandController = async (ctx) => {
  ctx.body = await getTasks();
};

const GetGollandRoute = '/getGolland';

module.exports = {
  GetGollandController,
  GetGollandRoute,
};
