const { getTasks } = require('../../services/testKlimov');

const GetKlimovController = async (ctx) => {
  ctx.body = await getTasks();
};

const GetKlimovRoute = '/getKlimov';

module.exports = {
  GetKlimovController,
  GetKlimovRoute,
};
