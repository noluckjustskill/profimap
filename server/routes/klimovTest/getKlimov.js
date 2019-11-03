const { tasks } = require('../../config/klimov/klimov.json');

const GetKlimovController = async (ctx) => {
  ctx.body = tasks;
};

const GetKlimovRoute = '/getKlimov';

module.exports = {
  GetKlimovController,
  GetKlimovRoute,
};
