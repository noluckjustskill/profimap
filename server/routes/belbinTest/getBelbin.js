const { getTasks } = require('../../services/testBelbin');

const GetBelbinController = async (ctx) => {
  ctx.body = await getTasks();
};

const GetBelbinRoute = '/getBelbin';

module.exports = {
  GetBelbinController,
  GetBelbinRoute,
};
