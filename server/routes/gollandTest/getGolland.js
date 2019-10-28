const { tasks } = require('../../config/golland.json');

const GetGollandController = async (ctx) => {
  ctx.body = tasks;
};

const GetGollandRoute = '/getGolland';

module.exports = {
  GetGollandController,
  GetGollandRoute,
};
